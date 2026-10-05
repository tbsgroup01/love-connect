import express from "express";

import {
  getUserConversations,
  getOrCreateConversation,
  getMessages,
  sendMessage,
  markMessagesAsRead,
} from "../controllers/chatsController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/conversations", protect, getUserConversations);
router.post("/conversation", protect, getOrCreateConversation);
router.get("/messages/:conversation_id", protect, getMessages);
router.post("/messages", protect, sendMessage);
router.patch("/messages/:conversation_id/read", protect, markMessagesAsRead);

export default router;