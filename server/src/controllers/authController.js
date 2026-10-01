import { Users, Admin } from "../models/index.js";
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

    const { password: removedPassword, ...userData } = user.toJSON();

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
    const { password: removedPassword, ...userData } = user.toJSON();
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
    await sendEmail({
      to: user.email,
      subject: "LoveConnect Password Reset OTP",
      text: `Your password reset OTP is ${otp}. It expires in 5 minutes.`,
      html: `<p>Your LoveConnect password reset OTP is:</p>
             <h2>${otp}</h2>
             <p>This OTP expires in 5 minutes. Do not share it with anyone.</p>`,
    });

    return res.status(200).json({
      success: true,
      message: "If an account exists, an OTP will be sent",
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
export {
  userRegister,
  adminCreate,
  login,
  forgetPassword,
  verifyResetOtp,
  resetPassword,
};
