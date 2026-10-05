import { Op } from "sequelize";
import { Matches, Users, Profiles, Conversation } from "../models/index.js";

export const getAllMatches = async (req, res) => {
  try {
    const matches = await Matches.findAll({
      include: [
        {
          model: Users,
          as: "userOne",
          attributes: ["id", "name", "email", "phone", "age", "gender", "interest", "profile_image", "status"],
          include: [
            {
              model: Profiles,
              as: "profile",
              attributes: ["id", "full_name", "gender", "date_of_birth", "country", "state", "city", "profile_picture", "about_me", "partner_preferences"],
            },
          ],
        },
        {
          model: Users,
          as: "userTwo",
          attributes: ["id", "name", "email", "phone", "age", "gender", "interest", "profile_image", "status"],
          include: [
            {
              model: Profiles,
              as: "profile",
              attributes: ["id", "full_name", "gender", "date_of_birth", "country", "state", "city", "profile_picture", "about_me", "partner_preferences"],
            },
          ],
        },
        {
          model: Conversation,
          as: "conversation",
          required: false,
        },
      ],
      order: [["matched_at", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      message: "Matches fetched successfully",
      matches,
    });
  } catch (error) {
    console.error("Get all matches error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch matches",
      error: error.message,
    });
  }
};

export const getUserMatches = async (req, res) => {
  try {
    const user_id = req.user?.id || req.params?.user_id;

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const matches = await Matches.findAll({
      where: {
        [Op.or]: [
          { user_one_id: user_id },
          { user_two_id: user_id },
        ],
      },
      include: [
        {
          model: Users,
          as: "userOne",
          attributes: ["id", "name", "email", "phone", "age", "gender", "interest", "profile_image", "status"],
          include: [
            {
              model: Profiles,
              as: "profile",
              attributes: ["id", "full_name", "gender", "date_of_birth", "country", "state", "city", "profile_picture", "about_me", "partner_preferences"],
            },
          ],
        },
        {
          model: Users,
          as: "userTwo",
          attributes: ["id", "name", "email", "phone", "age", "gender", "interest", "profile_image", "status"],
          include: [
            {
              model: Profiles,
              as: "profile",
              attributes: ["id", "full_name", "gender", "date_of_birth", "country", "state", "city", "profile_picture", "about_me", "partner_preferences"],
            },
          ],
        },
        {
          model: Conversation,
          as: "conversation",
          required: false,
        },
      ],
      order: [["matched_at", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      message: "User matches fetched successfully",
      matches,
      count: matches.length,
    });
  } catch (error) {
    console.error("Get user matches error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user matches",
      error: error.message,
    });
  }
};

export const deleteMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Matches.findByPk(id);
    if (!match) {
      return res.status(404).json({
        message: "Match not found",
      });
    }
    await match.destroy();
    return res.status(200).json({
      message: "Match deleted successfully",
    });
  } catch (error) {
    console.error("Delete match error:", error);
    return res.status(500).json({
      message: "Failed to delete match",
      error: error.message,
    });
  }
};