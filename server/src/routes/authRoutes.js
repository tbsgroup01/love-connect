import express from "express";
import {
  forgetPassword,
  verifyResetOtp,
  resetPassword,
  adminCreate,
  userRegister,
  login,
  getAdminProfile,
  updateAdminProfile,
} from "../controllers/authController.js";
import { protectAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/admin/create", adminCreate);
router.post("/register", userRegister);
router.post("/login", login);
router.post("/forgot-password", forgetPassword);
router.post("/verify-reset-otp", verifyResetOtp);
router.post("/reset-password", resetPassword);
router.get("/admin/profile", protectAdmin, getAdminProfile);
router.put("/admin/profile", protectAdmin, updateAdminProfile);

export default router;

