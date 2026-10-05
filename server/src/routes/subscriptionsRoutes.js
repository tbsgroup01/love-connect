import express from "express";

import {
  getSubscriptions,
  checkActiveSubscription,
  deleteSubscription,
} from "../controllers/subscriptionsController.js";

import { protectAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/", protectAdmin, getSubscriptions);
router.post("/check", checkActiveSubscription);
router.delete("/:id", protectAdmin, deleteSubscription);

export default router;