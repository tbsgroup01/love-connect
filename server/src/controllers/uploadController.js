export const uploadProfile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Profile image is required",
      });
    }

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    return res.status(200).json({
      message: "Profile image uploaded successfully",
      file: req.file.filename,
      path: fileUrl,
      url: fileUrl,
    });
  } catch (error) {
    return res.status(500).json({
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