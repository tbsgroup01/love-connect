import express from "express";
import {
  createReport,
  getReports,
  getReportById,
  updateReport,
  deleteReport,
  deleteBulkReports,
} from "../controllers/reportsController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createReport);
router.get("/", protect, getReports);
router.delete("/bulk", protect, deleteBulkReports);
router.get("/:id", protect, getReportById);
router.put("/:id", protect, updateReport);
router.put("/:id/status", protect, updateReport);
router.delete("/:id", protect, deleteReport);

export default router;
