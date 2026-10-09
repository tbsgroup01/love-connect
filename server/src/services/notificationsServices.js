import {
  Notifications,
  Users,
  Profiles,
  Admin,
} from "../models/index.js";
import { getIO } from "../config/socket.js";

export const createNotification = async ({
  recipient_type,
  user_id = null,
  admin_id = null,
  sender_id = null,
  type,
  title,
  message,
  reference_id = null,
}) => {
  try {
    if (!recipient_type || !type || !title || !message) {
      throw new Error("Missing required notification fields");
    }

    if (recipient_type === "user" && !user_id) {
      throw new Error("user_id is required when recipient_type is 'user'");
    }

    if (recipient_type === "admin" && !admin_id) {
      throw new Error("admin_id is required when recipient_type is 'admin'");
    }

    const notification = await Notifications.create({
      recipient_type,
      user_id: recipient_type === "user" ? Number(user_id) : null,
      admin_id: recipient_type === "admin" ? Number(admin_id) : null,
      sender_id: sender_id ? Number(sender_id) : null,
      type,
      title,
      message,
      reference_id: reference_id ? Number(reference_id) : null,
      is_read: false,
    });

    const fullNotification = await Notifications.findByPk(notification.id, {
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
    });

    const notificationPayload = fullNotification || notification;

    try {
      const io = getIO();
      if (io) {
        if (recipient_type === "user" && user_id) {
          io.to(`user_${user_id}`).emit("new_notification", notificationPayload);
        } else if (recipient_type === "admin") {
          io.to("admins").emit("new_notification", notificationPayload);
          if (admin_id) {
            io.to(`admin_${admin_id}`).emit("new_notification", notificationPayload);
            io.to(`user_${admin_id}`).emit("new_notification", notificationPayload);
          }
        }
      }
    } catch (socketError) {
      console.warn("Socket.IO notification emit failed:", socketError.message);
    }

    return notificationPayload;
  } catch (error) {
    console.error("Error creating notification:", error);
    throw error;
  }
};

export const notifyLike = async ({ senderId, receiverId, referenceId = null }) => {
  try {
    const sender = await Users.findByPk(senderId, {
      include: [
        {
          model: Profiles,
          as: "profile",
          attributes: ["full_name", "profile_picture"],
          required: false,
        },
      ],
    });

    const senderName = sender?.profile?.full_name || sender?.name || "Someone";

    return await createNotification({
      recipient_type: "user",
      user_id: receiverId,
      sender_id: senderId,
      type: "like",
      title: "New Like!",
      message: `${senderName} liked your profile.`,
      reference_id: referenceId,
    });
  } catch (error) {
    console.error("Failed to send like notification:", error);
  }
};

export const notifyMatch = async ({ userOneId, userTwoId, matchId }) => {
  try {
    const [userOne, userTwo] = await Promise.all([
      Users.findByPk(userOneId, {
        include: [{ model: Profiles, as: "profile", attributes: ["full_name"], required: false }],
      }),
      Users.findByPk(userTwoId, {
        include: [{ model: Profiles, as: "profile", attributes: ["full_name"], required: false }],
      }),
    ]);

    const userOneName = userOne?.profile?.full_name || userOne?.name || "Someone";
    const userTwoName = userTwo?.profile?.full_name || userTwo?.name || "Someone";

    const notifUserOne = createNotification({
      recipient_type: "user",
      user_id: userOneId,
      sender_id: userTwoId,
      type: "match",
      title: "It's a Match! ",
      message: `You and ${userTwoName} liked each other! Start a conversation now.`,
      reference_id: matchId,
    });

    const notifUserTwo = createNotification({
      recipient_type: "user",
      user_id: userTwoId,
      sender_id: userOneId,
      type: "match",
      title: "It's a Match! ",
      message: `You and ${userOneName} liked each other! Start a conversation now.`,
      reference_id: matchId,
    });

    await Promise.allSettled([notifUserOne, notifUserTwo]);
  } catch (error) {
    console.error("Failed to send match notifications:", error);
  }
};

export const notifyReportToAdmins = async ({
  reporterId,
  reportedUserId,
  reportId,
  reason,
}) => {
  try {
    const [reporter, reportedUser, activeAdmins] = await Promise.all([
      Users.findByPk(reporterId, {
        attributes: ["id", "name"],
        include: [{ model: Profiles, as: "profile", attributes: ["full_name"], required: false }],
      }),
      Users.findByPk(reportedUserId, {
        attributes: ["id", "name"],
        include: [{ model: Profiles, as: "profile", attributes: ["full_name"], required: false }],
      }),
      Admin.findAll({
        where: { status: "active" },
        attributes: ["id", "admin_id", "name"],
      }),
    ]);

    const reporterName = reporter?.profile?.full_name || reporter?.name || `User #${reporterId}`;
    const reportedName = reportedUser?.profile?.full_name || reportedUser?.name || `User #${reportedUserId}`;

    const title = "New Report Submitted ";
    const message = `${reporterName} reported ${reportedName} for "${reason}".`;

    const adminNotificationPromises = activeAdmins.map((admin) => {
      const targetAdminId = admin.admin_id || admin.id;
      return createNotification({
        recipient_type: "admin",
        admin_id: targetAdminId,
        sender_id: reporterId,
        type: "report",
        title,
        message,
        reference_id: reportId,
      });
    });

    await Promise.allSettled(adminNotificationPromises);
  } catch (error) {
    console.error("Failed to notify admins about report:", error);
  }
};

export const notifyMessage = async ({ senderId, receiverId, conversationId }) => {
  try {
    const sender = await Users.findByPk(senderId, {
      include: [
        {
          model: Profiles,
          as: "profile",
          attributes: ["full_name", "profile_picture"],
          required: false,
        },
      ],
    });

    const senderName = sender?.profile?.full_name || sender?.name || "Someone";

    return await createNotification({
      recipient_type: "user",
      user_id: receiverId,
      sender_id: senderId,
      type: "message",
      title: "New Message 💬",
      message: `You have a new message from ${senderName}.`,
      reference_id: conversationId,
    });
  } catch (error) {
    console.error("Failed to send message notification:", error);
  }
};

export default {
  createNotification,
  notifyLike,
  notifyMatch,
  notifyReportToAdmins,
  notifyMessage,
};
