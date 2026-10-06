import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import {
  uploadProfile,
  uploadFavicon,
  uploadLogo,
} from "../controllers/uploadController.js";

const router = express.Router();

const handleUpload = (field) => (req, res, next) => {
  upload.any()(req, res, (err) => {
    if (err) {
      console.error(`Upload error for [${field}]:`, err.message);
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          message: "File size is too large. Maximum allowed size is 25MB.",
        });
      }
      return res.status(400).json({
        success: false,
        message: err.message || "Failed to process uploaded file.",
      });
    }
    if (req.files && req.files.length > 0) {
      req.file = req.files.find((f) => f.fieldname === field) || req.files[0];
    }
    next();
  });
};

router.post("/profile", handleUpload("profile"), uploadProfile);
router.post("/favicon", handleUpload("favicon"), uploadFavicon);
router.post("/logo", handleUpload("logo"), uploadLogo);

export default router;