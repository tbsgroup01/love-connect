import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import { Transactions, Users, Plans, Subscriptions } from "../models/index.js";
import { Op } from "sequelize";


export const createOrder = async (req, res) => {
  try {
    const { amount, plan_id } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        message: "Valid amount is required to create Razorpay order.",
      });
    }
    const options = {
      amount: Math.round(Number(amount) * 100), 
      currency: "INR",
      receipt: `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      notes: {
        plan_id: plan_id ? String(plan_id) : "",
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

    let targetUserId = user_id;
    if (!targetUserId) {
      const firstUser = await Users.findOne();
      targetUserId = firstUser ? firstUser.id : 1;
    }
    let targetPlan = null;
    if (plan_id) {
      targetPlan =
        (await Plans.findOne({ where: { plan_id: plan_id } })) ||
        (await Plans.findByPk(plan_id));
    }
    if (!targetPlan && amount) {
      targetPlan = await Plans.findOne({
        where: { price: Number(amount) },
      });
    }

    const finalPrice = Math.round(Number(amount || targetPlan?.price || 0));
    const planName = targetPlan ? targetPlan.name : "Premium Access";
    const transaction = await Transactions.create({
      user_id: targetUserId,
      plan_id: targetPlan ? targetPlan.id : 11,
      amount: finalPrice,
      discount_amount: 0,
      final_amount: finalPrice,
      status: "success",
      transaction_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      payment_method: payment_method || "UPI / Card",
      currency: "INR",
      description: `${planName} Subscription Purchase via Razorpay`,
    });
    const durationDays = targetPlan?.duration || 30;
    const startDate = new Date();
    const endDate = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000);

    await Subscriptions.update(
      { status: "inactive" },
      { where: { user_id: targetUserId, status: "active" } }
    );

    const subscription = await Subscriptions.create({
      user_id: targetUserId,
      plan_id: targetPlan ? targetPlan.id : 11,
      status: "active",
      start_date: startDate,
      end_date: endDate,
    });

    return res.status(200).json({
      message: "Payment verified and subscription activated successfully!",
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
    const total = await Transactions.count();
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