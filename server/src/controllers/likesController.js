import { Likes, Matches, Users } from "../models/index.js";


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
      return res.status(409).json({
        message: "You already liked this user",
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
          user_one_id: sender_id,
          user_two_id: receiver_id,
        },
      });

      const reverseMatch = await Matches.findOne({
        where: {
          user_one_id: receiver_id,
          user_two_id: sender_id,
        },
      });

      if (!existingMatch && !reverseMatch) {
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

export const getAllLikes = async (req, res) => {
  try {
    const likes = await Likes.findAll({
      include: [
        {
          model: Users,
          as: "sender",
        },
        {
          model: Users,
          as: "receiver",
        },
      ],
    });
    return res.status(200).json({
      message: "Likes fetched successfully",
      likes,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}