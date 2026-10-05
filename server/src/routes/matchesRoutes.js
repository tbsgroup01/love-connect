import express from "express"
import { getAllMatches, getUserMatches, deleteMatch } from "../controllers/matchesController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"

const router = express.Router();

router.get("/user-matches", authMiddleware, getUserMatches);
router.get("/my-matches", authMiddleware, getUserMatches);
router.get("/user/:user_id", authMiddleware, getUserMatches);
router.get("/", authMiddleware, getAllMatches);
router.delete("/delete/:id", authMiddleware, deleteMatch);
router.delete("/:id", authMiddleware, deleteMatch);

export default router;