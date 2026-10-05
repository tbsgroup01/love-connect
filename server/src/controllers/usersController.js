import { Users, Profiles, Subscriptions, Plans, Likes, Matches } from "../models/index.js";
import { Op } from "sequelize";

export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["active", "inactive", "suspended"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user status. Allowed values: active, inactive, suspended",
      });
    }
    const user = await Users.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.status = status;
    await user.save();

    return res.status(200).json({
      success: true,
      message: `User status updated to ${status} successfully`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("Failed to update user status:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update user status",
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findByPk(id, {
      attributes: { exclude: ["password", "reset_otp", "reset_otp_expires"] },
      include: [
        {
          model: Profiles,
          as: "profile",
          required: false,
        },
        {
          model: Subscriptions,
          as: "subscriptions",
          required: false,
          include: [
            {
              model: Plans,
              as: "plan",
              required: false,
            },
          ],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const likesReceivedCount = await Likes.count({ where: { receiver_id: id } });
    const matchesCount = await Matches.count({
      where: {
        [Op.or]: [{ user_one_id: id }, { user_two_id: id }],
      },
    });

    const userResponse = user.toJSON();
    if (userResponse.profile && typeof userResponse.profile.partner_preferences === "string") {
      try {
        userResponse.profile.partner_preferences = JSON.parse(userResponse.profile.partner_preferences);
      } catch (e) {}
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user: userResponse,
      stats: {
        likesReceived: likesReceivedCount,
        matches: matchesCount,
      },
    });
  } catch (error) {
    console.error("Error in getUserById:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      age,
      gender,
      interest,
      profile_image,
      city,
      state,
      country,
      about_me,
      date_of_birth,
      education,
      profession,
      height,
      lifestyle,
      partner_preferences,
      cover_photo,
    } = req.body;

    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update Users table fields
    if (name !== undefined) user.name = name;
    if (age !== undefined) user.age = age ? Number(age) : null;
    if (gender !== undefined && ["male", "female", "other"].includes(gender.toLowerCase())) {
      user.gender = gender.toLowerCase();
    }
    if (interest !== undefined) {
      user.interest = typeof interest === "object" ? JSON.stringify(interest) : String(interest);
    }
    if (profile_image !== undefined) user.profile_image = profile_image;
    await user.save();

    // Check or create Profile
    let profile = await Profiles.findOne({ where: { user_id: id } });

    let existingPreferences = {};
    if (profile && profile.partner_preferences) {
      if (typeof profile.partner_preferences === "object") {
        existingPreferences = profile.partner_preferences;
      } else if (typeof profile.partner_preferences === "string") {
        try {
          existingPreferences = JSON.parse(profile.partner_preferences);
        } catch (e) {
          existingPreferences = {};
        }
      }
    }

    const mergedPreferences = {
      ...existingPreferences,
      ...(partner_preferences || {}),
      ...(education !== undefined ? { education } : {}),
      ...(profession !== undefined ? { profession } : {}),
      ...(height !== undefined ? { height } : {}),
      ...(lifestyle !== undefined ? { lifestyle } : {}),
      ...(cover_photo !== undefined ? { cover_photo } : {}),
    };

    if (!profile) {
      profile = await Profiles.create({
        user_id: id,
        full_name: name || user.name,
        gender: gender ? (gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase()) : "Other",
        date_of_birth: date_of_birth || new Date(Date.now() - (Number(age) || 24) * 365.25 * 24 * 60 * 60 * 1000),
        country: country || "India",
        state: state || "Delhi",
        city: city || "Noida",
        profile_picture: profile_image || user.profile_image || null,
        about_me: about_me || "",
        partner_preferences: mergedPreferences,
      });
    } else {
      if (name !== undefined) profile.full_name = name;
      if (gender !== undefined) {
        const formattedGender = gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
        if (["Male", "Female", "Other"].includes(formattedGender)) {
          profile.gender = formattedGender;
        }
      }
      if (date_of_birth !== undefined) profile.date_of_birth = date_of_birth;
      if (country !== undefined) profile.country = country;
      if (state !== undefined) profile.state = state;
      if (city !== undefined) profile.city = city;
      if (profile_image !== undefined) profile.profile_picture = profile_image;
      if (about_me !== undefined) profile.about_me = about_me;
      profile.partner_preferences = mergedPreferences;
      await profile.save();
    }

    const updatedUser = await Users.findByPk(id, {
      attributes: { exclude: ["password", "reset_otp", "reset_otp_expires"] },
      include: [
        { model: Profiles, as: "profile" },
        {
          model: Subscriptions,
          as: "subscriptions",
          include: [{ model: Plans, as: "plan" }],
        },
      ],
    });

    const likesReceivedCount = await Likes.count({ where: { receiver_id: id } });
    const matchesCount = await Matches.count({
      where: {
        [Op.or]: [{ user_one_id: id }, { user_two_id: id }],
      },
    });

    const userResponse = updatedUser.toJSON();
    if (userResponse.profile && typeof userResponse.profile.partner_preferences === "string") {
      try {
        userResponse.profile.partner_preferences = JSON.parse(userResponse.profile.partner_preferences);
      } catch (e) {}
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: userResponse,
      stats: {
        likesReceived: likesReceivedCount,
        matches: matchesCount,
      },
    });
  } catch (error) {
    console.error("Error in updateUserProfile:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: { exclude: ["password", "reset_otp", "reset_otp_expires"] },
      include: [
        {
          model: Profiles,
          as: "profile",
          required: false,
        },
        {
          model: Subscriptions,
          as: "subscriptions",
          required: false,
          include: [
            {
              model: Plans,
              as: "plan",
              required: false,
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await user.destroy();
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteUser:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

