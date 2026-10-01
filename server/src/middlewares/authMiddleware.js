import jwt from "jsonwebtoken";
import { Admin } from "../models/index.js";

export const protectAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication required. Please login.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin only.",
      });
    }

    const admin = await Admin.findByPk(decoded.id);

    if (!admin) {
      return res.status(401).json({
        message: "Admin account not found.",
      });
    }

    if (admin.status !== "active") {
      return res.status(403).json({
        message: "Your admin account is inactive.",
      });
    }

    req.admin = admin;

    next();
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return res.status(401).json({
        message: "Invalid or expired token.",
      });
    }

    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
