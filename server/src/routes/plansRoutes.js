import express from "express";
import {
  createPlan,
  deletePlan,
  getPlans,
  getPlanById,
  updatePlan,
  seedPlans,
} from "../controllers/plansController.js";

const router = express.Router();

router.post("/seed", seedPlans);
router.post("/", createPlan);
router.get("/", getPlans);
router.get("/:id", getPlanById);
router.put("/:id", updatePlan);
router.delete("/:id", deletePlan);

export default router;

