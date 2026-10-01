import { Activities } from "../models/index.js";

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

    if (!["admin", "user"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    if (!["LOGIN", "LOGOUT"].includes(action)) {
      return res.status(400).json({
        message: "Invalid action",
      });
    }

    const activity = await Activities.create({
      user_id: user_id || null,
      admin_id: admin_id || null,
      role,
      action,
      loginAt: loginAt || null,
      logoutAt: logoutAt || null,
      ipAddress: ipAddress || req.ip,
      userAgent: userAgent || req.get("User-Agent"),
    });

    return res.status(201).json({
      message: "Activity created successfully",
      activity,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getActivities = async (req, res) => {
  try {
    const activities = await Activities.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      message: "Activities fetched successfully",
      activities,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
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
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
