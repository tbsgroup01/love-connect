import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import { Transactions, Users, Plans, Subscriptions, Profiles } from "../models/index.js";
import { Op } from "sequelize";

export const createOrder = async (req, res) => {
  try {
    const { amount, plan_id } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        message: "Valid amount is required to create Razorpay order.",
      });
    }

    if (!plan_id) {
      return res.status(400).json({
        message: "Plan ID is required.",
      });
    }

    const plan =
      (await Plans.findOne({ where: { plan_id } })) ||
      (await Plans.findByPk(plan_id));

    if (!plan) {
      return res.status(404).json({
        message: "Plan not found.",
      });
    }

    if (Number(plan.price) !== Number(amount)) {
      return res.status(400).json({
        message: "Payment amount does not match the selected plan.",
      });
    }

    const options = {
      amount: Math.round(Number(plan.price) * 100),
      currency: "INR",
      receipt: `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      notes: {
        plan_id: String(plan.id),
      },
    };

    const order = await razorpay.orders.create(options);

    return res.status(201).json({
      message: "Razorpay order created successfully",
      order,
      key_id: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Create order error:", error);

    return res.status(500).json({
      message: "Failed to create Razorpay order",
      error: error.message,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      user_id,
      plan_id,
      amount,
      payment_method = "UPI / Card",
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        message: "Missing Razorpay payment verification details",
      });
    }

    if (!user_id) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    if (!plan_id) {
      return res.status(400).json({
        message: "Plan ID is required",
      });
    }

    const user = await Users.findByPk(user_id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const targetPlan =
      (await Plans.findOne({ where: { plan_id } })) ||
      (await Plans.findByPk(plan_id));

    if (!targetPlan) {
      return res.status(404).json({
        message: "Plan not found",
      });
    }

    if (Number(targetPlan.price) !== Number(amount)) {
      return res.status(400).json({
        message: "Payment amount does not match the selected plan.",
      });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        message: "Payment verification failed. Invalid signature.",
      });
    }

    const existingTransaction = await Transactions.findOne({
      where: {
        transaction_id: razorpay_payment_id,
      },
    });

    if (existingTransaction) {
      return res.status(400).json({
        message: "Payment has already been processed.",
      });
    }

    const finalPrice = Number(amount);

    const transaction = await Transactions.create({
      user_id,
      plan_id: targetPlan.id,
      amount: finalPrice,
      discount_amount: 0,
      final_amount: finalPrice,
      status: "success",
      transaction_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      payment_method,
      currency: "INR",
      description: `${targetPlan.name} Subscription Purchase via Razorpay`,
    });

    const now = new Date();

    const activeSubscription = await Subscriptions.findOne({
      where: {
        user_id,
        status: "active",
      },
      include: [
        {
          model: Plans,
          as: "plan",
        },
      ],
    });

    let startDate = now;
    let endDate;
    let isUpgrade = false;

    // Only carry forward end_date if previous plan was an active PAID plan
    const isPreviousPaid =
      activeSubscription &&
      Number(activeSubscription.plan?.price) > 0 &&
      Number(activeSubscription.plan?.duration) > 0 &&
      new Date(activeSubscription.end_date) > now;

    if (isPreviousPaid) {
      isUpgrade = true;

      const oldEndDate = new Date(activeSubscription.end_date);

      endDate = new Date(oldEndDate);

      endDate.setDate(
        endDate.getDate() + Number(targetPlan.duration)
      );

      await activeSubscription.update({
        status: "inactive",
      });
    } else {
      endDate = new Date(now);

      endDate.setDate(
        endDate.getDate() + Number(targetPlan.duration)
      );

      if (activeSubscription) {
        await activeSubscription.update({
          status: "inactive",
        });
      }
    }

    const subscription = await Subscriptions.create({
      user_id,
      plan_id: targetPlan.id,
      status: "active",
      start_date: startDate,
      end_date: endDate,
    });

    return res.status(200).json({
      message: isUpgrade
        ? "Payment verified and plan upgraded successfully!"
        : "Payment verified and plan activated successfully!",
      transaction,
      subscription,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    });
  } catch (error) {
    console.error("Payment verification error:", error);

    return res.status(500).json({
      message: "Internal server error during payment verification",
      error: error.message,
    });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const { search, status } = req.query;
    const whereClause = {};

    if (status && status !== "All") {
      whereClause.status = status.toLowerCase();
    }

    if (search && search.trim()) {
      const q = `%${search.trim()}%`;

      whereClause[Op.or] = [
        { transaction_id: { [Op.like]: q } },
        { order_id: { [Op.like]: q } },
        { payment_method: { [Op.like]: q } },
        { description: { [Op.like]: q } },
      ];
    }

    const transactions = await Transactions.findAll({
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

    const total = await Transactions.count({
      where: whereClause,
    });

    return res.status(200).json({
      message: "Transactions fetched successfully",
      transactions,
      total,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);

    return res.status(500).json({
      message: "Internal server error while fetching transactions",
      error: error.message,
    });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transactions.findByPk(id);

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    await transaction.destroy();

    return res.status(200).json({
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting transaction:", error);

    return res.status(500).json({
      message: "Internal server error while deleting transaction",
      error: error.message,
    });
  }
};