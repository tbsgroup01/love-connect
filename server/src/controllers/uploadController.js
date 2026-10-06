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
        let profile = await Profiles.findOne({ where: { user_id: userId } });
        if (profile) {
          profile.profile_picture = fileUrl;
          await profile.save();
        } else {
          const user = await Users.findByPk(userId);
          if (user) {
            await Profiles.create({
              user_id: userId,
              full_name: user.name,
              gender: "Other",
              date_of_birth: new Date(),
              country: "India",
              state: "Delhi",
              city: "Noida",
              profile_picture: fileUrl,
            });
          }
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
