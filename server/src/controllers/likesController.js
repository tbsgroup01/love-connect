import { Likes, Matches, Users, Profiles } from "../models/index.js";
import { Op } from "sequelize";

export const likeUser = async (req, res) => {
  try {
    const sender_id = req.user.id;
    const { receiver_id } = req.params;

    if (sender_id === Number(receiver_id)) {
      return res.status(400).json({
        message: "You cannot like yourself",
      });
    }

    const existingLike = await Likes.findOne({
      where: {
        sender_id,
        receiver_id,
      },
    });

    if (existingLike) {
      return res.status(200).json({
        success: true,
        message: "You already liked this user",
        liked: true,
        alreadyLiked: true,
      });
    }

    await Likes.create({
      sender_id,
      receiver_id,
    });

    const reverseLike = await Likes.findOne({
      where: {
        sender_id: receiver_id,
        receiver_id: sender_id,
      },
    });

    if (reverseLike) {
      const existingMatch = await Matches.findOne({
        where: {
          [Op.or]: [
            { user_one_id: sender_id, user_two_id: receiver_id },
            { user_one_id: receiver_id, user_two_id: sender_id },
          ],
        },
      });

      if (!existingMatch) {
        const match = await Matches.create({
          user_one_id: sender_id,
          user_two_id: receiver_id,
        });

        return res.status(201).json({
          message: "It's a match!",
          liked: true,
          matched: true,
          match,
        });
      }
    }

    return res.status(201).json({
      message: "User liked successfully",
      liked: true,
      matched: false,
    });
  } catch (error) {
    console.error("Like user error:", error);

    return res.status(500).json({
      message: "Failed to like user",
      error: error.message,
    });
  }
};

export const removeLike = async (req, res) => {
  try {
    const sender_id = req.user.id;
    const { receiver_id } = req.params;

    const deleted = await Likes.destroy({
      where: {
        sender_id,
        receiver_id,
      },
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Like not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Like removed successfully",
    });
  } catch (error) {
    console.error("Remove like error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to remove like",
      error: error.message,
    });
  }
};

export const getAllLikes = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { type = "received" } = req.query;

    let whereClause = {};
    if (type === "received") {
      whereClause = { receiver_id: userId };
    } else if (type === "sent") {
      whereClause = { sender_id: userId };
    } else if (type === "all") {
      whereClause = {
        [Op.or]: [{ receiver_id: userId }, { sender_id: userId }],
      };
    }

    const likes = await Likes.findAll({
      where: whereClause,
      include: [
        {
          model: Users,
          as: "sender",
          attributes: { exclude: ["password", "reset_otp", "reset_otp_expires"] },
          include: [
            {
              model: Profiles,
              as: "profile",
            },
          ],
        },
        {
          model: Users,
          as: "receiver",
          attributes: { exclude: ["password", "reset_otp", "reset_otp_expires"] },
          include: [
            {
              model: Profiles,
              as: "profile",
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    // Also get matched user ids to annotate each like
    const userMatches = await Matches.findAll({
      where: {
        [Op.or]: [{ user_one_id: userId }, { user_two_id: userId }],
      },
    });

    const matchedUserIds = new Set(
      userMatches.flatMap((m) => [m.user_one_id, m.user_two_id]).filter((id) => id !== userId)
    );

    // Also check which users in received likes have already been liked back by the current user
    let likedBackUserIds = new Set();
    if (type === "received") {
      const sentLikes = await Likes.findAll({
        where: { sender_id: userId },
        attributes: ["receiver_id"],
      });
      likedBackUserIds = new Set(sentLikes.map((l) => l.receiver_id));
    }

    const formattedLikes = likes.map((like) => {
      const targetUser = type === "received" ? like.sender : like.receiver;
      const targetUserId = type === "received" ? like.sender_id : like.receiver_id;
      return {
        ...like.toJSON(),
        user: targetUser,
        isMatched: matchedUserIds.has(targetUserId),
        hasLikedBack: likedBackUserIds.has(targetUserId),
      };
    });

    // Get counts for both received and sent for convenient tab badges
    const [receivedCount, sentCount] = await Promise.all([
      Likes.count({ where: { receiver_id: userId } }),
      Likes.count({ where: { sender_id: userId } }),
    ]);

    return res.status(200).json({
      success: true,
      message: "Likes fetched successfully",
      likes: formattedLikes,
      count: formattedLikes.length,
      counts: {
        received: receivedCount,
        sent: sentCount,
      },
    });
  } catch (error) {
    console.error("Get all likes error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};