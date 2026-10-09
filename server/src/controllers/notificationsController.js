import { Notifications, Users, Profiles } from "../models/index.js";

const VALID_FILTERS = ["all", "unread", "read"];
const VALID_TYPES = ["like", "report", "match", "system", "message"];

const getRecipientCondition = (req) => {
  const isAdmin = req.user?.role === "admin" || Boolean(req.admin);

  if (isAdmin) {
    const admin = req.admin || req.user;
    return {
      recipient_type: "admin",
      admin_id: admin.admin_id || admin.id,
    };
  }

  return {
    recipient_type: "user",
    user_id: req.user.id,
  };
};

export const getNotifications = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      filter = "all",
      type,
    } = req.query;

    if (filter && !VALID_FILTERS.includes(filter)) {
      return res.status(400).json({
        success: false,
        message: `Invalid filter '${filter}'. Allowed values: ${VALID_FILTERS.join(", ")}`,
      });
    }

    if (type && !VALID_TYPES.includes(type)) {
      return res.status(400).json({
        success: false,
        message: `Invalid type '${type}'. Allowed values: ${VALID_TYPES.join(", ")}`,
      });
    }

    const baseRecipientWhere = getRecipientCondition(req);
    const where = { ...baseRecipientWhere };

    if (filter === "unread") {
      where.is_read = false;
    } else if (filter === "read") {
      where.is_read = true;
    }

    if (type) {
      where.type = type;
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 20));
    const offset = (pageNum - 1) * limitNum;

    const [{ count, rows: notifications }, unreadCount] = await Promise.all([
      Notifications.findAndCountAll({
        where,
        include: [
          {
            model: Users,
            as: "sender",
            attributes: ["id", "name", "email"],
            include: [
              {
                model: Profiles,
                as: "profile",
                attributes: ["id", "full_name", "profile_picture", "city"],
                required: false,
              },
            ],
            required: false,
          },
        ],
        order: [["createdAt", "DESC"]],
        limit: limitNum,
        offset,
      }),
      Notifications.count({
        where: {
          ...baseRecipientWhere,
          is_read: false,
        },
      }),
    ]);

    return res.status(200).json({
      success: true,
      message: "Notifications fetched successfully",
      notifications,
      total: count,
      unreadCount,
      page: pageNum,
      totalPages: Math.ceil(count / limitNum) || 1,
    });
  } catch (error) {
    console.error("Get notifications error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
      error: error.message,
    });
  }
};

export const getUnreadCount = async (req, res) => {
  try {
    const baseRecipientWhere = getRecipientCondition(req);

    const count = await Notifications.count({
      where: {
        ...baseRecipientWhere,
        is_read: false,
      },
    });

    return res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    console.error("Get unread count error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get unread notification count",
      error: error.message,
    });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const baseRecipientWhere = getRecipientCondition(req);

    const notification = await Notifications.findOne({
      where: {
        id,
        ...baseRecipientWhere,
      },
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    if (!notification.is_read) {
      await notification.update({ is_read: true });
    }

    return res.status(200).json({
      success: true,
      message: "Notification marked as read",
      notification,
    });
  } catch (error) {
    console.error("Mark notification as read error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to mark notification as read",
      error: error.message,
    });
  }
};

export const markAllAsRead = async (req, res) => {
  try {
    const baseRecipientWhere = getRecipientCondition(req);

    const [updatedCount] = await Notifications.update(
      { is_read: true },
      {
        where: {
          ...baseRecipientWhere,
          is_read: false,
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: "All notifications marked as read",
      updatedCount,
    });
  } catch (error) {
    console.error("Mark all notifications as read error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to mark all notifications as read",
      error: error.message,
    });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const baseRecipientWhere = getRecipientCondition(req);

    const deletedCount = await Notifications.destroy({
      where: {
        id,
        ...baseRecipientWhere,
      },
    });

    if (!deletedCount) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    console.error("Delete notification error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete notification",
      error: error.message,
    });
  }
};

export const clearAllNotifications = async (req, res) => {
  try {
    const baseRecipientWhere = getRecipientCondition(req);

    const deletedCount = await Notifications.destroy({
      where: baseRecipientWhere,
    });

    return res.status(200).json({
      success: true,
      message: "All notifications cleared successfully",
      deletedCount,
    });
  } catch (error) {
    console.error("Clear all notifications error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to clear notifications",
      error: error.message,
    });
  }
};

export default {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearAllNotifications,
};
