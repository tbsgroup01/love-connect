import { Settings } from "../models/index.js";

export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({
        brandName: "LoveConnect",
        location: "Noida, Uttar Pradesh",
        supportMobile: "98xxxxxxxx",
        supportEmail: "youremail@gmail.com",
        smtpHost: "smtp.gmail.com",
        smtpPort: 465,
        smtpSecurity: "SSL",
        smtpUsername: "deytaloffice@gmail.com",
        fromDisplayName: "LoveConnect",
        fromEmail: "deytaloffice@gmail.com",
        replyToEmail: "deytaloffice@gmail.com",
        razorpayKeyId: "rzp_live_89023489jfksl23",
      });
    }
    return res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error("Get settings error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      await settings.update(req.body);
    }
    return res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      settings,
    });
  } catch (error) {
    console.error("Update settings error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
