import express from "express";
import {
  createSupport,
  getSupports,
  deleteSupport,
} from "../controllers/supportController.js";

const router = express.Router();

router.post("/", createSupport);
router.get("/", getSupports);
router.delete("/:id", deleteSupport);

export default router;
