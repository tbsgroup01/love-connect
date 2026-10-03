import express from "express";
import {
  createFaq,
  deleteFaq,
  getFaqs,
  getFaqById,
  updateFaq,
  seedFaqs,
} from "../controllers/faqsController.js";

const router = express.Router();

router.post("/seed", seedFaqs);
router.post("/", createFaq);
router.get("/", getFaqs);
router.get("/:id", getFaqById);
router.put("/:id", updateFaq);
router.delete("/:id", deleteFaq);

export default router;

