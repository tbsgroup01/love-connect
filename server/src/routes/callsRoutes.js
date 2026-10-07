import express from "express";
import {
  createCall,
  acceptCall,
  rejectCall,
  endCall,
  getAllCalls,
  getUserCalls,
  deleteCall,
  deleteBulkCalls,
} from "../controllers/callsController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createCall);
router.post("/accept", protect, acceptCall);
router.post("/reject", protect, rejectCall);
router.post("/end", protect, endCall);
router.get("/all", protect, getAllCalls);
router.get("/my-calls", protect, getUserCalls);
router.delete("/bulk", protect, deleteBulkCalls);
router.delete("/:id", protect, deleteCall);

export default router;