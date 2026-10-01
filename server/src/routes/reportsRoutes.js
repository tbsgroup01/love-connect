import express from "express";
import {
  createReport,
  deleteReport,
  getReports,
  getReportById,
  updateReport,
} from "../controllers/reportsController.js";

const router = express.Router();

router.post("/", createReport);
router.get("/", getReports);
router.get("/:id", getReportById);
router.put("/:id", updateReport);
router.delete("/:id", deleteReport);

export default router;

