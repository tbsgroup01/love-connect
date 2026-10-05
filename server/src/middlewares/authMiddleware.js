import jwt from "jsonwebtoken";
import { Admin, Users } from "../models/index.js";

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

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication required. Please login.",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role === "admin") {
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
      req.user = admin;
      req.admin = admin;
      return next();
    }

    const user = await Users.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "User account not found.",
      });
    }

    if (user.status && user.status !== "active") {
      const statusText = user.status === "suspended" ? "suspended" : "deactivated";
      return res.status(403).json({
        success: false,
        code: user.status === "suspended" ? "ACCOUNT_SUSPENDED" : "ACCOUNT_DEACTIVATED",
        accountStatus: user.status,
        message: `Your account has been ${statusText}. Please contact admin.`,
      });
    }

    req.user = user;
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

    console.error("Auth middleware error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const protect = authMiddleware;
export default authMiddleware;
