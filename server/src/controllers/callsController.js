import { Calls, Users, Profiles, Conversation } from "../models/index.js";
import { Op } from "sequelize";

export const createCall = async (req, res) => {
  try {
    const { receiver_id, call_type, conversation_id } = req.body;
    const caller_id = req.user.id;
    if (!receiver_id || !call_type) {
      return res.status(400).json({
        success: false,
        message: "Receiver ID and call type are required",
      });
    }
    if (!["voice", "video"].includes(call_type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid call type. Must be 'voice' or 'video'",
      });
    }
    if (Number(caller_id) === Number(receiver_id)) {
      return res.status(400).json({
        success: false,
        message: "You cannot call yourself",
      });
    }
    const receiver = await Users.findByPk(receiver_id, {
      include: [
        {
          model: Profiles,
          as: "profile",
          attributes: ["id", "full_name", "profile_picture", "gender", "city"],
          required: false,
        },
      ],
    });
    if (!receiver) {
      return res.status(404).json({
        success: false,
        message: "Receiver not found",
      });
    }
    let convId = conversation_id ? Number(conversation_id) : null;
    if (!convId) {
      const conv = await Conversation.findOne({
        where: {
          [Op.or]: [
            { user_one_id: caller_id, user_two_id: receiver_id },
            { user_one_id: receiver_id, user_two_id: caller_id },
          ],
        },
      });
      if (conv) {
        convId = conv.id;
      }
    }

    const call = await Calls.create({
      conversation_id: convId,
      caller_id,
      receiver_id,
      call_type,
      status: "missed",
      started_at: new Date(),
      duration: 0,
    });

    const callWithDetails = await Calls.findByPk(call.id, {
      include: [
        {
          model: Users,
          as: "caller",
          attributes: ["id", "name", "email"],
          include: [
            {
              model: Profiles,
              as: "profile",
              attributes: ["id", "full_name", "profile_picture"],
              required: false,
            },
          ],
        },
        {
          model: Users,
          as: "receiver",
          attributes: ["id", "name", "email"],
          include: [
            {
              model: Profiles,
              as: "profile",
              attributes: ["id", "full_name", "profile_picture"],
              required: false,
            },
          ],
        },
      ],
    });

    return res.status(201).json({
      success: true,
      message: "Call created successfully",
      call: callWithDetails || call,
    });
  } catch (error) {
    console.error("Create call error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create call",
      error: error.message,
    });
  }
};

export const acceptCall = async (req, res) => {
  try {
    const { call_id } = req.body;
    const userId = req.user.id;
    if (!call_id) {
      return res.status(400).json({
        success: false,
        message: "call_id is required",
      });
    }
    const call = await Calls.findByPk(call_id);
    if (!call) {
      return res.status(404).json({
        success: false,
        message: "Call not found",
      });
    }
    if (Number(call.receiver_id) !== Number(userId)) {
      return res.status(403).json({
        success: false,
        message: "Only the call receiver can accept this call",
      });
    }

    call.status = "accepted";
    call.started_at = new Date();
    await call.save();

    return res.status(200).json({
      success: true,
      message: "Call accepted",
      call,
    });
  } catch (error) {
    console.error("Accept call error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to accept call",
      error: error.message,
    });
  }
};

export const rejectCall = async (req, res) => {
  try {
    const { call_id } = req.body;
    const userId = req.user.id;

    if (!call_id) {
      return res.status(400).json({
        success: false,
        message: "call_id is required",
      });
    }

    const call = await Calls.findByPk(call_id);

    if (!call) {
      return res.status(404).json({
        success: false,
        message: "Call not found",
      });
    }

    if (
      Number(call.receiver_id) !== Number(userId) &&
      Number(call.caller_id) !== Number(userId)
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to reject this call",
      });
    }

    call.status = "rejected";
    call.ended_at = new Date();
    call.duration = 0;
    await call.save();

    return res.status(200).json({
      success: true,
      message: "Call rejected",
      call,
    });
  } catch (error) {
    console.error("Reject call error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to reject call",
      error: error.message,
    });
  }
};

export const endCall = async (req, res) => {
  try {
    const { call_id } = req.body;
    const userId = req.user.id;

    if (!call_id) {
      return res.status(400).json({
        success: false,
        message: "call_id is required",
      });
    }

    const call = await Calls.findByPk(call_id);

    if (!call) {
      return res.status(404).json({
        success: false,
        message: "Call not found",
      });
    }

    if (
      Number(call.receiver_id) !== Number(userId) &&
      Number(call.caller_id) !== Number(userId)
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to end this call",
      });
    }

    const endedAt = new Date();
    let duration = 0;

    if (call.status === "accepted" || call.status === "ongoing") {
      duration = call.started_at
        ? Math.max(0, Math.floor((endedAt.getTime() - new Date(call.started_at).getTime()) / 1000))
        : 0;
      call.status = "completed";
    } else if (call.status === "missed") {
      call.status = "missed";
      duration = 0;
    } else {
      call.status = "completed";
    }

    call.ended_at = endedAt;
    call.duration = duration;
    await call.save();

    return res.status(200).json({
      success: true,
      message: "Call ended successfully",
      call,
    });
  } catch (error) {
    console.error("End call error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to end call",
      error: error.message,
    });
  }
};

export const getAllCalls = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 50 } = req.query;

    const where = {};
    if (status && status !== "All") {
      if (status.toLowerCase() === "declined" || status.toLowerCase() === "rejected") {
        where.status = "rejected";
      } else {
        where.status = status.toLowerCase();
      }
    }

    const offset = (Number(page) - 1) * Number(limit);

    const { count, rows: calls } = await Calls.findAndCountAll({
      where,
      include: [
        {
          model: Users,
          as: "caller",
          attributes: ["id", "name", "email"],
          include: [
            {
              model: Profiles,
              as: "profile",
              attributes: ["id", "full_name", "date_of_birth", "city", "profile_picture"],
              required: false,
            },
          ],
        },
        {
          model: Users,
          as: "receiver",
          attributes: ["id", "name", "email"],
          include: [
            {
              model: Profiles,
              as: "profile",
              attributes: ["id", "full_name", "date_of_birth", "city", "profile_picture"],
              required: false,
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: Number(limit),
      offset: Number(offset),
    });
    const allCalls = await Calls.findAll({
      attributes: ["id", "caller_id", "receiver_id", "status", "duration"],
    });

    const totalCalls = allCalls.length;
    const totalDurationSeconds = allCalls.reduce((acc, c) => acc + (Number(c.duration) || 0), 0);
    const completedCalls = allCalls.filter((c) => c.status === "completed").length;
    const missedCalls = allCalls.filter((c) => c.status === "missed").length;
    const rejectedCalls = allCalls.filter((c) => c.status === "rejected").length;

    const uniqueUserSet = new Set();
    allCalls.forEach((c) => {
      if (c.caller_id) uniqueUserSet.add(c.caller_id);
      if (c.receiver_id) uniqueUserSet.add(c.receiver_id);
    });

    const avgDurationSeconds =
      completedCalls > 0 ? Math.round(totalDurationSeconds / completedCalls) : 0;

    return res.status(200).json({
      success: true,
      message: "Calls fetched successfully",
      total: count,
      page: Number(page),
      totalPages: Math.ceil(count / Number(limit)),
      stats: {
        totalCalls,
        totalDurationSeconds,
        uniqueUsers: uniqueUserSet.size,
        avgDurationSeconds,
        completedCalls,
        missedCalls,
        rejectedCalls,
      },
      calls,
    });
  } catch (error) {
    console.error("Get all calls error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch calls",
      error: error.message,
    });
  }
};

export const getUserCalls = async (req, res) => {
  try {
    const userId = req.user.id;

    const calls = await Calls.findAll({
      where: {
        [Op.or]: [{ caller_id: userId }, { receiver_id: userId }],
      },
      include: [
        {
          model: Users,
          as: "caller",
          attributes: ["id", "name", "email"],
          include: [
            {
              model: Profiles,
              as: "profile",
              attributes: ["id", "full_name", "profile_picture"],
              required: false,
            },
          ],
        },
        {
          model: Users,
          as: "receiver",
          attributes: ["id", "name", "email"],
          include: [
            {
              model: Profiles,
              as: "profile",
              attributes: ["id", "full_name", "profile_picture"],
              required: false,
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: 50,
    });

    return res.status(200).json({
      success: true,
      calls,
    });
  } catch (error) {
    console.error("Get user calls error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user calls",
      error: error.message,
    });
  }
};

export const deleteCall = async (req, res) => {
  try {
    const { id } = req.params;

    const call = await Calls.findByPk(id);
    if (!call) {
      return res.status(404).json({
        success: false,
        message: "Call not found",
      });
    }

    await call.destroy();

    return res.status(200).json({
      success: true,
      message: "Call log deleted successfully",
    });
  } catch (error) {
    console.error("Delete call error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete call",
      error: error.message,
    });
  }
};

export const deleteBulkCalls = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Array of call IDs is required",
      });
    }

    await Calls.destroy({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Selected call logs deleted successfully",
    });
  } catch (error) {
    console.error("Bulk delete calls error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete calls",
      error: error.message,
    });
  }
};
