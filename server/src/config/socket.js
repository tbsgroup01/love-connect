import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { Conversation, Messages, Users } from "../models/index.js";

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
      next();
    } catch (error) {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected to socket:", socket.userId);
    socket.join(`user_${socket.userId}`);

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
        const { conversation_id, content, message, messageType = "text" } = data;
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

        const newMessage = await Messages.create({
          conversation_id,
          sender_id: socket.userId,
          content: textContent,
          messageType,
        });

        await conversation.update({ lastMessageAt: new Date() });

        const messageWithSender = await Messages.findByPk(newMessage.id, {
          include: [
            {
              model: Users,
              as: "sender",
              attributes: ["id", "name", "profile_image"],
            },
          ],
        });

        io.to(`conversation_${conversation_id}`).emit(
          "new_message",
          messageWithSender || newMessage
        );
      } catch (error) {
        console.error("Socket send message error:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected from socket:", socket.userId);
    });
  });

  return io;
};

export const getIO = () => {
  return io;
};
