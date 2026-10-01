import express from "express";
import {
  createBanner,
  deleteBanner,
  getBanners,
  getPublishedBanners,
  updateBanner,
} from "../controllers/bannersController.js";

const router = express.Router();

router.post("/", createBanner);
router.get("/", getBanners);
router.get("/published", getPublishedBanners);
router.put("/:id", updateBanner);
router.delete("/:id", deleteBanner);

export default router;

