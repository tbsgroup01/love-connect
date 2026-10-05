import express from "express";
import { likeUser, getAllLikes, removeLike } from "../controllers/likesController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/like/:receiver_id", authMiddleware, likeUser);
router.delete("/like/:receiver_id", authMiddleware, removeLike);
router.get("/", authMiddleware, getAllLikes);

export default router;