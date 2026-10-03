import { Activities, Users, Admin } from "../models/index.js";

export const createActivity = async (req, res) => {
  try {
    const {
      user_id,
      admin_id,
      role,
      action,
      loginAt,
      logoutAt,
      ipAddress,
      userAgent,
    } = req.body;

    if (
      !role ||
      !action ||
      (role === "user" && !user_id) ||
      (role === "admin" && !admin_id)
    ) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }

    const normalizedRole = role.toLowerCase();
    if (!["admin", "user"].includes(normalizedRole)) {
      return res.status(400).json({
        message: "Invalid role. Must be 'admin' or 'user'",
      });
    }

    const normalizedAction = action.toUpperCase();
    if (!["LOGIN", "LOGOUT"].includes(normalizedAction)) {
      return res.status(400).json({
        message: "Invalid action. Must be 'LOGIN' or 'LOGOUT'",
      });
    }

    const clientIp =
      ipAddress ||
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.socket.remoteAddress ||
      req.ip ||
      "127.0.0.1";

    const clientUserAgent = userAgent || req.get("User-Agent") || "Unknown Device";

    const activity = await Activities.create({
      user_id: normalizedRole === "user" ? user_id : null,
      admin_id: normalizedRole === "admin" ? admin_id : null,
      role: normalizedRole,
      action: normalizedAction,
      loginAt:
        normalizedAction === "LOGIN"
          ? loginAt || new Date()
          : loginAt || null,
      logoutAt:
        normalizedAction === "LOGOUT"
          ? logoutAt || new Date()
          : logoutAt || null,
      ipAddress: clientIp,
      userAgent: clientUserAgent,
    });

    return res.status(201).json({
      message: "Activity created successfully",
      activity,
    });
  } catch (error) {
    console.error("Error creating activity:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getActivities = async (req, res) => {
  try {
    const activities = await Activities.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Users,
          as: "user",
          attributes: ["id", "name", "email", "profile_image", "role"],
          required: false,
        },
        {
          model: Admin,
          as: "admin",
          attributes: ["id", "name", "email", "role"],
          required: false,
        },
      ],
    });

    return res.status(200).json({
      message: "Activities fetched successfully",
      activities,
    });
  } catch (error) {
    console.error("Error fetching activities:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteActivity = async (req, res) => {
  try {
    const activity = await Activities.findByPk(req.params.id);

    if (!activity) {
      return res.status(404).json({
        message: "Activity not found",
      });
    }

    await activity.destroy();

    return res.status(200).json({
      message: "Activity deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting activity:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

