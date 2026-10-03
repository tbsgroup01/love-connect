import express from "express"
import { likeUser, getAllLikes } from "../controllers/likesController.js";
import  authMiddleware  from "../middlewares/authMiddleware.js";
const router = express.Router();


router.post("/like/:receiver_id", authMiddleware, likeUser);
router.get("/", authMiddleware, getAllLikes);


export default router;