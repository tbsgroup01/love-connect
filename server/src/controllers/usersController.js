import { Users, Profiles, Subscriptions, Plans, Likes, Matches } from "../models/index.js";
import { ensureFreeStarterSubscription } from "./subscriptionsController.js";
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

export const calculateCompletion = (userObj) => {
  if (!userObj) return 0;
  const profile = userObj.profile || {};
  let prefs = profile.partner_preferences || userObj.partner_preferences || {};
  if (typeof prefs === "string") {
    try {
      prefs = JSON.parse(prefs);
    } catch (_) {
      prefs = {};
    }
  }

  let totalScore = 0;

  // 1. Photo (15%)
  const photo = userObj.profile_image || profile.profile_picture || userObj.avatar;
  if (photo && typeof photo === "string" && photo.trim().length > 0) totalScore += 15;

  // 2. Basic Info (20% total - 5% each)
  const name = userObj.name || profile.full_name;
  if (name && typeof name === "string" && name.trim().length > 0) totalScore += 5;

  const gender = userObj.gender || profile.gender;
  if (gender && typeof gender === "string" && gender.trim().length > 0) totalScore += 5;

  const dobOrAge = userObj.age || userObj.date_of_birth || profile.date_of_birth;
  if (dobOrAge) totalScore += 5;

  const location = profile.city || userObj.city || profile.state || userObj.location;
  if (location && typeof location === "string" && location.trim().length > 0) totalScore += 5;

  // 3. Bio (15%)
  const about = userObj.about_me || profile.about_me;
  if (about && typeof about === "string" && about.trim().length >= 3) totalScore += 15;

  // 4. Profession (10%)
  const profession = userObj.profession || prefs.profession || prefs.profession_details?.title;
  if (profession && typeof profession === "string" && profession.trim().length > 0) totalScore += 10;

  // 5. Education (10%)
  const education = userObj.education || prefs.education || prefs.education_details?.degree || prefs.education_details?.institution;
  if (education && typeof education === "string" && education.trim().length > 0) totalScore += 10;

  // 6. Interests (10%)
  let interestsArr = userObj.interests || userObj.interest || prefs.interests || prefs.interest || [];
  if (typeof interestsArr === "string") {
    try {
      interestsArr = JSON.parse(interestsArr);
    } catch (_) {
      interestsArr = [];
    }
  }
  if (Array.isArray(interestsArr) && interestsArr.length > 0) totalScore += 10;

  // 7. Lifestyle (10%)
  const lifestyle = (prefs.lifestyle && typeof prefs.lifestyle === "object") ? prefs.lifestyle : (userObj.lifestyle && typeof userObj.lifestyle === "object" ? userObj.lifestyle : {});
  const hasLifestyle = Boolean(
    lifestyle.diet ||
    lifestyle.drinking ||
    lifestyle.smoking ||
    lifestyle.workout ||
    lifestyle.pets ||
    prefs.diet ||
    prefs.drinking ||
    prefs.smoking ||
    prefs.workout ||
    prefs.pets ||
    userObj.diet ||
    userObj.drinking ||
    userObj.smoking ||
    userObj.workout ||
    userObj.pets
  );
  if (hasLifestyle) {
    totalScore += 10;
  }

  // 8. Relationship Preference (10%)
  const relationshipPref = userObj.relationship_preference || prefs.relationship_preference;
  if (relationshipPref && typeof relationshipPref === "string" && relationshipPref.trim().length > 0) {
    totalScore += 10;
  }

  return Math.min(100, Math.max(0, Math.round(totalScore)));
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

    const hasActiveSub = user.subscriptions?.some(
      (s) => s.status === "active" && (!s.end_date || new Date(s.end_date) > new Date())
    );

    if (!hasActiveSub) {
      try {
        await ensureFreeStarterSubscription(id);
        await user.reload({
          include: [
            { model: Profiles, as: "profile", required: false },
            {
              model: Subscriptions,
              as: "subscriptions",
              required: false,
              include: [{ model: Plans, as: "plan", required: false }],
            },
          ],
        });
      } catch (err) {
        console.error("Auto-assign Free Starter error:", err);
      }
    }

    const likesReceivedCount = await Likes.count({ where: { receiver_id: id } });
    const matchesCount = await Matches.count({
      where: {
        [Op.or]: [{ user_one_id: id }, { user_two_id: id }],
      },
    });

    const userResponse = user.toJSON();
    if (userResponse.profile) {
      userResponse.profile_image = userResponse.profile.profile_picture || null;
      userResponse.gender = userResponse.profile.gender || "Other";
      userResponse.about_me = userResponse.profile.about_me || "";
      if (typeof userResponse.profile.partner_preferences === "string") {
        try {
          userResponse.profile.partner_preferences = JSON.parse(userResponse.profile.partner_preferences);
        } catch (e) {}
      }
      const prefs = userResponse.profile.partner_preferences || {};
      userResponse.cover_photo = prefs.cover_photo || null;
      userResponse.interests = prefs.interests || prefs.interest || [];
      userResponse.interest = prefs.interests || prefs.interest || [];
      userResponse.education = prefs.education || "";
      userResponse.profession = prefs.profession || "";
      userResponse.height = prefs.height || "";
      userResponse.lifestyle = prefs.lifestyle || {};
      userResponse.relationship_preference = prefs.relationship_preference || "Relationship";
      if (userResponse.profile.date_of_birth) {
        const dob = new Date(userResponse.profile.date_of_birth);
        if (!isNaN(dob.getTime())) {
          const diffMs = Date.now() - dob.getTime();
          userResponse.age = Math.abs(new Date(diffMs).getUTCFullYear() - 1970);
        }
      }
    }

    userResponse.profile_completion = calculateCompletion(userResponse);

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
      interests,
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
      relationship_preference,
    } = req.body;

    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update Users table fields
    if (name !== undefined) {
      user.name = name;
      await user.save();
    }

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

    const activeInterests = interest !== undefined ? interest : (interests !== undefined ? interests : undefined);

    const mergedPreferences = {
      ...existingPreferences,
      ...(partner_preferences || {}),
      ...(activeInterests !== undefined ? { interest: activeInterests, interests: activeInterests } : {}),
      ...(education !== undefined ? { education } : {}),
      ...(profession !== undefined ? { profession } : {}),
      ...(height !== undefined ? { height } : {}),
      ...(lifestyle !== undefined ? {
          ...((existingPreferences && existingPreferences.lifestyle) || {}),
          ...lifestyle,
        } : {}),
      ...(cover_photo !== undefined ? { cover_photo } : {}),
      ...(relationship_preference !== undefined ? { relationship_preference } : {}),
    };

    let resolvedDob = undefined;
    if (date_of_birth !== undefined && date_of_birth !== null && date_of_birth !== "") {
      resolvedDob = new Date(date_of_birth);
    } else if (age !== undefined && age !== null && age !== "") {
      resolvedDob = new Date(Date.now() - Number(age) * 365.25 * 24 * 60 * 60 * 1000);
    }

    let formattedGender = undefined;
    if (gender !== undefined && gender !== null) {
      const g = String(gender).trim().toLowerCase();
      if (g === "male" || g === "man") formattedGender = "Male";
      else if (g === "female" || g === "woman") formattedGender = "Female";
      else formattedGender = "Other";
    }

    if (!profile) {
      profile = await Profiles.create({
        user_id: id,
        full_name: name || user.name,
        gender: formattedGender || "Other",
        date_of_birth: resolvedDob || new Date(Date.now() - 24 * 365.25 * 24 * 60 * 60 * 1000),
        country: country || "India",
        state: state || "Delhi",
        city: city || "Noida",
        profile_picture: profile_image !== undefined ? profile_image : null,
        about_me: about_me !== undefined ? about_me : "",
        partner_preferences: mergedPreferences,
      });
    } else {
      if (name !== undefined) profile.full_name = name;
      if (formattedGender !== undefined) profile.gender = formattedGender;
      if (resolvedDob !== undefined) profile.date_of_birth = resolvedDob;
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
    if (userResponse.profile) {
      userResponse.profile_image = userResponse.profile.profile_picture || null;
      userResponse.gender = userResponse.profile.gender || "Other";
      userResponse.about_me = userResponse.profile.about_me || "";
      if (typeof userResponse.profile.partner_preferences === "string") {
        try {
          userResponse.profile.partner_preferences = JSON.parse(userResponse.profile.partner_preferences);
        } catch (e) {}
      }
      const prefs = userResponse.profile.partner_preferences || {};
      userResponse.cover_photo = prefs.cover_photo || null;
      userResponse.interests = prefs.interests || prefs.interest || [];
      userResponse.interest = prefs.interests || prefs.interest || [];
      userResponse.education = prefs.education || "";
      userResponse.profession = prefs.profession || "";
      userResponse.height = prefs.height || "";
      userResponse.lifestyle = prefs.lifestyle || {};
      userResponse.relationship_preference = prefs.relationship_preference || "Relationship";
      if (userResponse.profile.date_of_birth) {
        const dob = new Date(userResponse.profile.date_of_birth);
        if (!isNaN(dob.getTime())) {
          const diffMs = Date.now() - dob.getTime();
          userResponse.age = Math.abs(new Date(diffMs).getUTCFullYear() - 1970);
        }
      }
    }

    userResponse.profile_completion = calculateCompletion(userResponse);

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

    const usersResponse = users.map((u) => {
      const json = u.toJSON();
      if (json.profile) {
        json.profile_image = json.profile.profile_picture || null;
      }
      json.profile_completion = calculateCompletion(json);
      return json;
    });

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users: usersResponse,
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

