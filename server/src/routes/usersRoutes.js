import express from "express";

import {
  userRegister,
  login,
  forgetPassword,
  verifyResetOtp,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", login);
router.post("/forgot-password", forgetPassword);
router.post("/verify-reset-otp", verifyResetOtp);
router.post("/reset-password", resetPassword);

export default router;
