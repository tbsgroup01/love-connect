import { Subscriptions, Users, Plans } from "../models/index.js";
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
          attributes: ["id", "name", "email", "phone", "profile_image"],
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

export const checkActiveSubscription = async (req, res) => {
  try {
    const user_id = req.body?.user_id || req.query?.user_id || req.user?.id;

    if (!user_id) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    const subscription = await Subscriptions.findOne({
      where: {
        user_id,
        status: "active",
      },
      include: [
        {
          model: Plans,
          as: "plan",
          attributes: ["id", "plan_id", "name", "price", "duration", "description"],
        },
      ],
    });

    if (!subscription) {
      return res.status(200).json({
        hasActivePlan: false,
        message: "You can purchase a plan.",
      });
    }

    if (new Date(subscription.end_date) <= new Date()) {
      await subscription.update({
        status: "inactive",
      });

      return res.status(200).json({
        hasActivePlan: false,
        message:
          "Your previous plan has expired. You can purchase a new plan.",
      });
    }

    return res.status(200).json({
      hasActivePlan: true,
      message:
        "You already have an active plan. You can upgrade by completing the payment.",
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