import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import {
  uploadProfile,
  uploadFavicon,
  uploadLogo,
} from "../controllers/uploadController.js";

const router = express.Router();

router.post("/profile", upload.single("profile"), uploadProfile);
router.post("/favicon", upload.single("favicon"), uploadFavicon);
router.post("/logo", upload.single("logo"), uploadLogo);

export default router;