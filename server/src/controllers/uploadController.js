import Users from "../models/usersModel.js";
import Profiles from "../models/profilesModel.js";

export const uploadProfile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Profile image is required",
      });
    }

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    const userId = req.body.userId || req.body.user_id;

    if (userId) {
      try {
        const user = await Users.findByPk(userId);
        if (user) {
          user.profile_image = fileUrl;
          await user.save();
        }

        const profile = await Profiles.findOne({ where: { user_id: userId } });
        if (profile) {
          profile.profile_picture = fileUrl;
          await profile.save();
        }
      } catch (dbErr) {
        console.error("DB update error in uploadProfile:", dbErr);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Profile image uploaded and connected with database successfully",
      file: req.file.filename,
      path: fileUrl,
      url: fileUrl,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Profile image upload failed",
      error: error.message,
    });
  }
};

export const uploadFavicon = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Favicon is required",
      });
    }

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    return res.status(200).json({
      message: "Favicon uploaded successfully",
      file: req.file.filename,
      path: fileUrl,
      url: fileUrl,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Favicon upload failed",
      error: error.message,
    });
  }
};

export const uploadLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Sidebar logo is required",
      });
    }

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    return res.status(200).json({
      message: "Sidebar logo uploaded successfully",
      file: req.file.filename,
      path: fileUrl,
      url: fileUrl,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Sidebar logo upload failed",
      error: error.message,
    });
  }
};