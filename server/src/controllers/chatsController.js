import { Op } from "sequelize";
import {
  Conversation,
  Messages,
  Matches,
  Users,
  Profiles,
} from "../models/index.js";
import { getIO } from "../config/socket.js";

export const getUserConversations = async (req, res) => {
  try {
    const userId = req.user.id;

    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: [
          { user_one_id: userId },
          { user_two_id: userId },
        ],
      },
      include: [
        {
          model: Users,
          as: "userOne",
          attributes: ["id", "name", "email", "age", "gender", "profile_image"],
          include: [
            {
              model: Profiles,
              as: "profile",
              attributes: ["id", "full_name", "gender", "city", "profile_picture"],
            },
          ],
        },
        {
          model: Users,
          as: "userTwo",
          attributes: ["id", "name", "email", "age", "gender", "profile_image"],
          include: [
            {
              model: Profiles,
              as: "profile",
              attributes: ["id", "full_name", "gender", "city", "profile_picture"],
            },
          ],
        },
        {
          model: Messages,
          as: "messages",
          limit: 1,
          order: [["createdAt", "DESC"]],
        },
        {
          model: Matches,
          as: "match",
          attributes: ["id", "matched_at"],
        },
      ],
      order: [
        ["lastMessageAt", "DESC"],
        ["updatedAt", "DESC"],
      ],
    });

    return res.status(200).json({
      success: true,
      conversations,
    });
  } catch (error) {
    console.error("Get user conversations error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getOrCreateConversation = async (req, res) => {
  try {
    const userId = req.user.id;
    const { match_id } = req.body;

    if (!match_id) {
      return res.status(400).json({
        message: "Match ID is required",
      });
    }

    const match = await Matches.findByPk(match_id);

    if (!match) {
      return res.status(404).json({
        message: "Match not found",
      });
    }

    const isParticipant =
      Number(match.user_one_id) === Number(userId) ||
      Number(match.user_two_id) === Number(userId);

    if (!isParticipant) {
      return res.status(403).json({
        message: "You are not part of this match",
      });
    }

    let conversation = await Conversation.findOne({
      where: {
        match_id,
      },
      include: [
        {
          model: Users,
          as: "userOne",
          attributes: ["id", "name", "email", "age", "gender", "profile_image"],
        },
        {
          model: Users,
          as: "userTwo",
          attributes: ["id", "name", "email", "age", "gender", "profile_image"],
        },
      ],
    });

    if (!conversation) {
      conversation = await Conversation.create({
        match_id,
        user_one_id: match.user_one_id,
        user_two_id: match.user_two_id,
      });

      conversation = await Conversation.findByPk(conversation.id, {
        include: [
          {
            model: Users,
            as: "userOne",
            attributes: ["id", "name", "email", "age", "gender", "profile_image"],
          },
          {
            model: Users,
            as: "userTwo",
            attributes: ["id", "name", "email", "age", "gender", "profile_image"],
          },
        ],
      });
    }

    return res.status(200).json({
      message: "Conversation ready",
      conversation,
    });
  } catch (error) {
    console.error("Get or create conversation error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const userId = req.user.id;
    const { conversation_id } = req.params;

    const conversation = await Conversation.findByPk(
      conversation_id
    );

    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found",
      });
    }

    const isParticipant =
      Number(conversation.user_one_id) === Number(userId) ||
      Number(conversation.user_two_id) === Number(userId);

    if (!isParticipant) {
      return res.status(403).json({
        message: "You are not part of this conversation",
      });
    }

    const messages = await Messages.findAll({
      where: {
        conversation_id,
      },
      include: [
        {
          model: Users,
          as: "sender",
          attributes: ["id", "name", "profile_image"],
        },
      ],
      order: [["createdAt", "ASC"]],
    });

    return res.status(200).json({
      messages,
    });
  } catch (error) {
    console.error("Get messages error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const userId = req.user.id;
    const { conversation_id, content, message, messageType = "text" } = req.body;
    const textContent = (content || message || "").trim();

    if (!conversation_id) {
      return res.status(400).json({
        message: "Conversation ID is required",
      });
    }

    if (!textContent) {
      return res.status(400).json({
        message: "Message content cannot be empty",
      });
    }

    const conversation = await Conversation.findByPk(conversation_id);

    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found",
      });
    }

    const isParticipant =
      Number(conversation.user_one_id) === Number(userId) ||
      Number(conversation.user_two_id) === Number(userId);

    if (!isParticipant) {
      return res.status(403).json({
        message: "You are not part of this conversation",
      });
    }

    const newMessage = await Messages.create({
      conversation_id,
      sender_id: userId,
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

    try {
      const io = getIO();
      if (io) {
        io.to(`conversation_${conversation_id}`).emit(
          "new_message",
          messageWithSender || newMessage
        );
      }
    } catch (socketErr) {
      console.warn("Socket broadcast error:", socketErr);
    }

    return res.status(201).json({
      message: "Message sent",
      data: messageWithSender || newMessage,
    });
  } catch (error) {
    console.error("Send message error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const markMessagesAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    const { conversation_id } = req.params;

    const conversation = await Conversation.findByPk(
      conversation_id
    );

    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found",
      });
    }

    const isParticipant =
      Number(conversation.user_one_id) === Number(userId) ||
      Number(conversation.user_two_id) === Number(userId);

    if (!isParticipant) {
      return res.status(403).json({
        message: "You are not part of this conversation",
      });
    }

    await Messages.update(
      {
        readAt: new Date(),
      },
      {
        where: {
          conversation_id,
          sender_id: {
            [Op.ne]: userId,
          },
          readAt: null,
        },
      }
    );

    return res.status(200).json({
      message: "Messages marked as read",
    });
  } catch (error) {
    console.error("Mark messages as read error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};