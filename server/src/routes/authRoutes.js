import express from "express";
import {
  forgetPassword,
  verifyResetOtp,
  resetPassword,
  adminCreate,
  userRegister,
  login,
} from "../controllers/authController.js";

const router = express.Router();
router.post("/admin/create", adminCreate);
router.post("/register", userRegister);
router.post("/login", login);
router.post("/forgot-password", forgetPassword);
router.post("/verify-reset-otp", verifyResetOtp);
router.post("/reset-password", resetPassword);

export default router;
