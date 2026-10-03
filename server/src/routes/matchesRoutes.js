import express from "express"
import { getAllMatches, getUserMatches, deleteMatch } from "../controllers/matchesController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"

const router = express.Router();

router.get("/", authMiddleware, getAllMatches);
router.get("/user/:user_id", authMiddleware, getUserMatches);
router.delete("/delete/:id", authMiddleware, deleteMatch);

export default router;