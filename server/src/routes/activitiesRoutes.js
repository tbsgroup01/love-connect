import express from "express";

import {
  createActivity,
  getActivities,
  deleteActivity,
} from "../controllers/activitiesController.js";

const router = express.Router();

router.post("/", createActivity);
router.get("/", getActivities);
router.delete("/:id", deleteActivity);

export default router;
