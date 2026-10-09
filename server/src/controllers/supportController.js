import { Support } from "../models/index.js";
import { Op } from "sequelize";

export const createSupport = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        message: "All fields (Name, Email, Phone, Message) are required.",
      });
    }

    const support = await Support.create({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      message: message.trim(),
    });

    return res.status(201).json({
      message: "Support query submitted successfully.",
      support,
    });
  } catch (error) {
    console.error("Error creating support query:", error);

    return res.status(500).json({
      message: "Internal server error while submitting support query.",
      error: error.message,
    });
  }
};

export const getSupports = async (req, res) => {
  try {
    const { search } = req.query;
    const whereClause = {};

    if (search && search.trim()) {
      const q = `%${search.trim()}%`;
      whereClause[Op.or] = [
        { name: { [Op.like]: q } },
        { email: { [Op.like]: q } },
        { phone: { [Op.like]: q } },
        { message: { [Op.like]: q } },
      ];
    }

    const supports = await Support.findAll({
      where: whereClause,
      order: [["createdAt", "DESC"]],
    });

    const total = await Support.count({ where: whereClause });

    return res.status(200).json({
      message: "Support messages fetched successfully.",
      supports,
      total,
    });
  } catch (error) {
    console.error("Error fetching support queries:", error);
    return res.status(500).json({
      message: "Internal server error while fetching support queries.",
      error: error.message,
    });
  }
};

export const deleteSupport = async (req, res) => {
  try {
    const id = req.params.id;

    const support = await Support.findByPk(id);

    if (!support) {
      return res.status(404).json({
        message: "Support message not found.",
      });
    }

    await support.destroy();

    return res.status(200).json({
      message: "Support query deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting support query:", error);
    return res.status(500).json({
      message: "Internal server error while deleting support query.",
      error: error.message,
    });
  }
};
