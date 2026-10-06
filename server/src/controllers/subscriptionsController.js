import { Subscriptions, Users, Plans, Profiles } from "../models/index.js";
import { Op } from "sequelize";

export const getSubscriptions = async (req, res) => {
  try {
    const { search, status, userId } = req.query;
    const whereClause = {};

    if (userId) {
      whereClause.user_id = userId;
    }

    if (status && status !== "All") {
      whereClause.status = status.toLowerCase();
    }

    if (search && search.trim()) {
      const q = `%${search.trim()}%`;

      const userIds = await Users.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.like]: q } },
            { email: { [Op.like]: q } },
            { phone: { [Op.like]: q } },
          ],
        },
        attributes: ["id"],
      });

      const userIdsArray = userIds.map((user) => user.id);

      const planIds = await Plans.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.like]: q } },
            { plan_id: { [Op.like]: q } },
            { duration: { [Op.like]: q } },
          ],
        },
        attributes: ["id"],
      });

      const planIdsArray = planIds.map((plan) => plan.id);

      whereClause[Op.or] = [
        { user_id: { [Op.in]: userIdsArray } },
        { plan_id: { [Op.in]: planIdsArray } },
        { status: { [Op.like]: q } },
      ];
    }

    const subscriptions = await Subscriptions.findAll({
      where: whereClause,
      include: [
        {
          model: Users,
          as: "user",
          attributes: ["id", "user_id", "name", "email", "phone"],
          include: [
            {
              model: Profiles,
              as: "profile",
              attributes: ["id", "profile_picture"],
              required: false,
            },
          ],
        },
        {
          model: Plans,
          as: "plan",
          attributes: ["id", "plan_id", "name", "price", "duration"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const total = await Subscriptions.count({
      where: whereClause,
    });

    return res.status(200).json({
      message: "Subscriptions fetched successfully",
      subscriptions,
      total,
    });
  } catch (error) {
    console.error("Error fetching subscriptions:", error);

    return res.status(500).json({
      message: "Internal server error while fetching subscriptions",
      error: error.message,
    });
  }
};

// Helper to ensure every user has an active plan (defaulting to 'Free Starter')
export const ensureFreeStarterSubscription = async (userId) => {
  if (!userId) return null;

  // 1. Check if user already has an active subscription
  let subscription = await Subscriptions.findOne({
    where: {
      user_id: userId,
      status: "active",
    },
    include: [
      {
        model: Plans,
        as: "plan",
        attributes: ["id", "plan_id", "name", "price", "duration", "description"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  if (subscription) {
    if (new Date(subscription.end_date) > new Date()) {
      return subscription;
    }
    // Expired -> mark inactive
    await subscription.update({ status: "inactive" });
  }

  // 2. Find or create Free Starter plan (price 0)
  let freePlan = await Plans.findOne({
    where: {
      [Op.or]: [
        { price: 0 },
        { name: "Free Starter" },
        { plan_id: 100001 },
      ],
    },
  });

  if (!freePlan) {
    freePlan = await Plans.create({
      plan_id: 100001,
      name: "Free Starter",
      price: 0,
      duration: 0,
      description: "10 Daily Likes and 1 Chat conversation",
      status: "active",
    });
  }

  // 3. Create active lifetime subscription for this user
  const foreverDate = new Date();
  foreverDate.setFullYear(foreverDate.getFullYear() + 100);

  const newSub = await Subscriptions.create({
    user_id: userId,
    plan_id: freePlan.id,
    status: "active",
    start_date: new Date(),
    end_date: foreverDate,
  });

  return await Subscriptions.findByPk(newSub.id, {
    include: [
      {
        model: Plans,
        as: "plan",
        attributes: ["id", "plan_id", "name", "price", "duration", "description"],
      },
    ],
  });
};

export const checkActiveSubscription = async (req, res) => {
  try {
    const user_id = req.body?.user_id || req.query?.user_id || req.user?.id;

    if (!user_id) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    const subscription = await ensureFreeStarterSubscription(user_id);

    return res.status(200).json({
      hasActivePlan: true,
      message: "Active plan retrieved successfully.",
      subscription,
    });
  } catch (error) {
    console.error("Error checking subscription:", error);

    return res.status(500).json({
      message: "Internal server error while checking subscription",
      error: error.message,
    });
  }
};

export const deleteSubscription = async (req, res) => {
  try {
    const { id } = req.params;

    const subscription = await Subscriptions.findByPk(id);

    if (!subscription) {
      return res.status(404).json({
        message: "Subscription not found",
      });
    }

    await subscription.destroy();

    return res.status(200).json({
      message: "Subscription deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting subscription:", error);

    return res.status(500).json({
      message: "Internal server error while deleting subscription",
      error: error.message,
    });
  }
};