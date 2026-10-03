import { Op } from "sequelize";
import { Matches, Users } from "../models/index.js";

export const getAllMatches = async (req, res) => {
  try {
    const matches = await Matches.findAll({
      order: [["matched_at", "DESC"]],
    });

    return res.status(200).json({
      message: "Matches fetched successfully",
      matches,
    });
  } catch (error) {
    console.error("Get all matches error:", error);

    return res.status(500).json({
      message: "Failed to fetch matches",
      error: error.message,
    });
  }
};

export const getUserMatches = async (req, res) => {
  try {
    const user_id = req.user.id;

    const matches = await Matches.findAll({
      where: {
        [Op.or]: [
          {
            user_one_id: user_id,
          },
          {
            user_two_id: user_id,
          },
        ],
      },
      order: [["matched_at", "DESC"]],
    });
    return res.status(200).json({
      message: "User matches fetched successfully",
      matches,
    });
  } catch (error) {
    console.error("Get user matches error:", error);
    return res.status(500).json({
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