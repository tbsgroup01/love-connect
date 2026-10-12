import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import {
  Conversation,
  Messages,
  Users,
  Profiles,
} from "../models/index.js";
import { validateUserChatPermission } from "../controllers/chatsController.js";
import { notifyMessage } from "../services/notificationsServices.js";

let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) {
        return next(new Error("Authentication required"));
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      socket.role = decoded.role || "user";
      next();
    } catch (error) {
      next(new Error("Invalid token"));
    }
  });
  io.on("connection", (socket) => {
    console.log("User connected to socket:", socket.userId);
    socket.join(`user_${socket.userId}`);
    if (socket.role === "admin") {
      socket.join(`admin_${socket.userId}`);
      socket.join("admins");
    }
    socket.on("join_conversation", async (conversationId) => {
      try {
        const conversation = await Conversation.findByPk(conversationId);
        if (!conversation) {
          return;
        }
        const isParticipant =
          Number(conversation.user_one_id) === Number(socket.userId) ||
          Number(conversation.user_two_id) === Number(socket.userId);
        if (!isParticipant) {
          return; 
        }
        socket.join(`conversation_${conversationId}`);
      } catch (error) {
        console.error("Join conversation error:", error);
      }
    });
    socket.on("send_message", async (data) => {
      try {
        const {
          conversation_id,
          content,
          message,
          messageType = "text",
        } = data;
        const textContent = (content || message || "").trim();
        if (!conversation_id || !textContent) {
          return;
        }
        const conversation = await Conversation.findByPk(conversation_id);
        if (!conversation) {
          return;
        }
        const isParticipant =
          Number(conversation.user_one_id) === Number(socket.userId) ||
          Number(conversation.user_two_id) === Number(socket.userId);
        if (!isParticipant) {
          return;
        }
        const permission = await validateUserChatPermission(
          socket.userId,
          conversation_id
        );
        if (!permission.allowed) {
          socket.emit("error_message", {
            message: permission.message,
          });
          return;
        }
        const newMessage = await Messages.create({
          conversation_id,
          sender_id: socket.userId,
          content: textContent,
          messageType,
        });
        await conversation.update({
          lastMessageAt: new Date(),
        });
        const messageWithSender = await Messages.findByPk(newMessage.id, {
          include: [
            {
              model: Users,
              as: "sender",
              attributes: ["id", "user_id", "name"],
              include: [
                {
                  model: Profiles,
                  as: "profile",
                  attributes: ["id", "profile_picture"],
                  required: false,
                },
              ],
            },
          ],
        });

        io.to(`conversation_${conversation_id}`).emit(
          "new_message",
          messageWithSender || newMessage
        );

        const receiverId =
          Number(conversation.user_one_id) === Number(socket.userId)
            ? conversation.user_two_id
            : conversation.user_one_id;

        try {
          await notifyMessage({
            senderId: socket.userId,
            receiverId: Number(receiverId),
            conversationId: conversation.id,
          });
        } catch (notifErr) {
          console.error("Message notification trigger error:", notifErr);
        }
      } catch (error) {
        console.error("Socket send message error:", error);
      }
    });

    socket.on("call-user", (data) => {
      try {
        const {
          call_id,
          caller_id,
          receiver_id,
          call_type,
          room_name,
          caller_name,
          caller_avatar,
        } = data;

        if (
          !call_id ||
          !caller_id ||
          !receiver_id ||
          !call_type
        ) {
          return;
        }

        if (Number(socket.userId) !== Number(caller_id)) {
          return;
        }

        if (!["voice", "video"].includes(call_type)) {
          return;
        }

        io.to(`user_${receiver_id}`).emit("incoming-call", {
          call_id,
          caller_id,
          receiver_id,
          call_type,
          room_name: room_name || `call_room_${call_id}`,
          caller_name,
          caller_avatar,
        });
      } catch (error) {
        console.error("Call user socket error:", error);
      }
    });

    socket.on("cancel-call", (data) => {
      try {
        const { call_id, receiver_id } = data;
        if (!receiver_id) return;
        io.to(`user_${receiver_id}`).emit("call-cancelled", {
          call_id,
        });
      } catch (error) {
        console.error("Cancel call socket error:", error);
      }
    });

    socket.on("accept-call", (data) => {
      try {
        const {
          call_id,
          caller_id,
          receiver_id,
          call_type,
          room_name,
        } = data;

        if (!call_id || !caller_id || !receiver_id) {
          return;
        }

        if (Number(socket.userId) !== Number(receiver_id)) {
          return;
        }

        io.to(`user_${caller_id}`).emit("call-accepted", {
          call_id,
          caller_id,
          receiver_id,
          call_type,
          room_name: room_name || `call_room_${call_id}`,
        });
      } catch (error) {
        console.error("Accept call socket error:", error);
      }
    });

    socket.on("reject-call", (data) => {
      try {
        const {
          call_id,
          caller_id,
          receiver_id,
        } = data;

        if (!call_id || !caller_id || !receiver_id) {
          return;
        }

        if (Number(socket.userId) !== Number(receiver_id)) {
          return;
        }

        io.to(`user_${caller_id}`).emit("call-rejected", {
          call_id,
          caller_id,
          receiver_id,
        });
      } catch (error) {
        console.error("Reject call socket error:", error);
      }
    });

    socket.on("end-call", (data) => {
      try {
        const {
          call_id,
          other_user_id,
        } = data;

        if (!other_user_id) {
          return;
        }

        io.to(`user_${other_user_id}`).emit("call-ended", {
          call_id,
        });
      } catch (error) {
        console.error("End call socket error:", error);
      }
    });

    socket.on("webrtc_offer", (data) => {
      try {
        const { target_user_id, sdp, call_id } = data;
        if (!target_user_id || !sdp) return;
        io.to(`user_${target_user_id}`).emit("webrtc_offer", {
          sender_id: socket.userId,
          sdp,
          call_id,
        });
      } catch (error) {
        console.error("WebRTC offer socket error:", error);
      }
    });

    socket.on("webrtc_answer", (data) => {
      try {
        const { target_user_id, sdp, call_id } = data;
        if (!target_user_id || !sdp) return;
        io.to(`user_${target_user_id}`).emit("webrtc_answer", {
          sender_id: socket.userId,
          sdp,
          call_id,
        });
      } catch (error) {
        console.error("WebRTC answer socket error:", error);
      }
    });

    socket.on("webrtc_ice_candidate", (data) => {
      try {
        const { target_user_id, candidate, call_id } = data;
        if (!target_user_id || !candidate) return;
        io.to(`user_${target_user_id}`).emit("webrtc_ice_candidate", {
          sender_id: socket.userId,
          candidate,
          call_id,
        });
      } catch (error) {
        console.error("WebRTC candidate socket error:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log(
        "User disconnected from socket:",
        socket.userId
      );
    });
  });

  return io;
};

export const getIO = () => {
  return io;
};