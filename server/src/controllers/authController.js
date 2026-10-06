import { Users, Admin, Activities, Profiles } from "../models/index.js";
import { ensureFreeStarterSubscription } from "./subscriptionsController.js";
import { calculateCompletion } from "./usersController.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Op } from "sequelize";
import { sendEmail } from "../utils/sendEmail.js";

const userRegister = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await Users.findOne({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const existingPhone = await Users.findOne({
      where: { phone },
    });

    if (existingPhone) {
      return res.status(400).json({
        message: "Phone number already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await Users.create({
      name: name.trim(),
      email: normalizedEmail,
      phone,
      password: hashedPassword,
    });

    if (!user.user_id) {
      user.user_id = user.id;
      await user.save();
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: "user",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    // Record initial login activity automatically
    try {
      const clientIp =
        req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
        req.socket.remoteAddress ||
        req.ip ||
        "127.0.0.1";
      const userAgent = req.get("User-Agent") || "Unknown Device";

      await Activities.create({
        user_id: user.id,
        admin_id: null,
        role: "user",
        action: "LOGIN",
        loginAt: new Date(),
        ipAddress: clientIp,
        userAgent,
      });
    } catch (actError) {
      console.error("Failed to record register activity:", actError);
    }

    // Automatically activate Free Starter plan for new user
    try {
      await ensureFreeStarterSubscription(user.id);
    } catch (subError) {
      console.error("Failed to activate default Free Starter subscription:", subError);
    }

    const { password: removedPassword, ...userData } = user.toJSON();
    userData.profile_completion = calculateCompletion(userData);

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: { ...userData, role: "user" },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
const adminCreate = async (req, res) => {
  try {
    const { admin_id, name, email, phone, password } = req.body;

    if (!admin_id || !name || !email || !phone || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingAdmin = await Admin.findOne({
      where: { email },
    });

    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin email already exists",
      });
    }

    const existingPhone = await Admin.findOne({
      where: { phone },
    });

    if (existingPhone) {
      return res.status(400).json({
        message: "Admin phone already exists",
      });
    }

    const existingAdminId = await Admin.findOne({
      where: { admin_id },
    });

    if (existingAdminId) {
      return res.status(400).json({
        message: "Admin ID already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await Admin.create({
      admin_id,
      name,
      email,
      phone,
      password: hashedPassword,
      role: "admin",
      status: "active",
    });

    const { password: removedPassword, ...adminData } = admin.toJSON();

    return res.status(201).json({
      message: "Admin created successfully",
      admin: adminData,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email/Phone and password are required",
      });
    }
    const identifier = email.trim();
    let user = await Users.findOne({
      where: {
        [Op.or]: [
          { email: identifier.toLowerCase() },
          { phone: identifier },
        ],
      },
    });
    let role = "user";

    if (!user) {
      const admin = await Admin.findOne({
        where: {
          [Op.or]: [
            { email: identifier.toLowerCase() },
            { phone: identifier },
          ],
        },
      });
      if (admin) {
        user = admin;
        role = "admin";
      }
    }

    if (!user) {
      return res.status(401).json({
        message: "Invalid email/phone or password",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email/phone or password",
      });
    }

    // Block deactivated or suspended accounts from logging in
    if (role === "user") {
      if (user.status === "suspended") {
        return res.status(403).json({
          success: false,
          code: "ACCOUNT_SUSPENDED",
          message: "Your account has been suspended. Please contact admin.",
        });
      }
      if (user.status === "inactive") {
        return res.status(403).json({
          success: false,
          code: "ACCOUNT_DEACTIVATED",
          message: "Your account has been deactivated. Please contact admin.",
        });
      }
    } else if (role === "admin" && user.status && user.status !== "active") {
      return res.status(403).json({
        success: false,
        code: "ACCOUNT_INACTIVE",
        message: "Your admin account is inactive. Please contact system administrator.",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    // Record login activity automatically
    try {
      const clientIp =
        req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
        req.socket.remoteAddress ||
        req.ip ||
        "127.0.0.1";
      const userAgent = req.get("User-Agent") || "Unknown Device";

      await Activities.create({
        user_id: role === "user" ? user.id : null,
        admin_id: role === "admin" ? user.id : null,
        role,
        action: "LOGIN",
        loginAt: new Date(),
        ipAddress: clientIp,
        userAgent,
      });
    } catch (actError) {
      console.error("Failed to record login activity:", actError);
    }

    const { password: removedPassword, ...userData } = user.toJSON();
    if (role === "user") {
      try {
        const profile = await Profiles.findOne({ where: { user_id: user.id } });
        if (profile) {
          userData.profile = profile.toJSON();
          userData.profile_image = profile.profile_picture || null;
        }
      } catch (profErr) {
        console.error("Failed to load profile on login:", profErr);
      }
      userData.profile_completion = calculateCompletion(userData);
    }

    return res.status(200).json({
      message: "Login successful",
      token,
      user: { ...userData, role },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
const forgetPassword = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.status(200).json({
        success: true,
        message: "If an account exists, an OTP will be sent",
      });
    }

    const otp = crypto.randomInt(100000, 1000000).toString();

    user.reset_otp = await bcrypt.hash(otp, 10);
    user.reset_otp_expires = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    let emailSent = false;
    let emailErrorMessage = "";
    try {
      await sendEmail({
        to: user.email,
        subject: "LoveConnect Password Reset OTP",
        text: `Your password reset OTP is ${otp}. It expires in 5 minutes.`,
        html: `<p>Your LoveConnect password reset OTP is:</p>
               <h2>${otp}</h2>
               <p>This OTP expires in 5 minutes. Do not share it with anyone.</p>`,
      });
      emailSent = true;
    } catch (_) {}

    return res.status(200).json({
      success: true,
      message: "If an account exists, a 6-digit OTP has been sent to your email.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to process password reset request",
    });
  }
};
const verifyResetOtp = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const otp = req.body.otp?.trim();

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const user = await Users.findOne({ where: { email } });

    if (!user || !user.reset_otp || !user.reset_otp_expires) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    if (new Date() > new Date(user.reset_otp_expires)) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    const isOtpValid = await bcrypt.compare(otp, user.reset_otp);

    if (!isOtpValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("Verify OTP error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to verify OTP",
    });
  }
};
const resetPassword = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const otp = req.body.otp?.trim();
    const password = req.body.password;

    if (!email || !otp || !password) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP and new password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const user = await Users.findOne({ where: { email } });

    if (!user || !user.reset_otp || !user.reset_otp_expires) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    if (new Date() > new Date(user.reset_otp_expires)) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    const isOtpValid = await bcrypt.compare(otp, user.reset_otp);

    if (!isOtpValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    user.password = await bcrypt.hash(password, 10);
    user.reset_otp = null;
    user.reset_otp_expires = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to reset password",
    });
  }
};

const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.admin.id, {
      attributes: { exclude: ["password"] },
    });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    return res.status(200).json({
      success: true,
      admin,
    });
  } catch (error) {
    console.error("Get admin profile error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.admin.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const { name, email, phone, profile_image, password } = req.body;

    if (name) admin.name = name.trim();
    if (email) {
      const normalizedEmail = email.trim().toLowerCase();
      const existing = await Admin.findOne({
        where: {
          email: normalizedEmail,
          id: { [Op.ne]: admin.id },
        },
      });
      if (existing) {
        return res.status(400).json({ message: "Email already in use by another admin" });
      }
      admin.email = normalizedEmail;
    }
    if (phone) {
      const trimmedPhone = phone.trim();
      const existingPhone = await Admin.findOne({
        where: {
          phone: trimmedPhone,
          id: { [Op.ne]: admin.id },
        },
      });
      if (existingPhone) {
        return res.status(400).json({ message: "Phone number already in use by another admin" });
      }
      admin.phone = trimmedPhone;
    }
    if (profile_image !== undefined) {
      admin.profile_image = profile_image;
    }

    if (password && password.trim().length >= 6) {
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password.trim(), salt);
    }

    await admin.save();

    const { password: _, ...adminData } = admin.toJSON();

    return res.status(200).json({
      success: true,
      message: "Admin profile updated successfully",
      admin: adminData,
    });
  } catch (error) {
    console.error("Update admin profile error:", error);
    return res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};

export {
  userRegister,
  adminCreate,
  login,
  forgetPassword,
  verifyResetOtp,
  resetPassword,
  getAdminProfile,
  updateAdminProfile,
};

