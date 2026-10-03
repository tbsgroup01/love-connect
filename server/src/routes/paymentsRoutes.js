import express from "express";
import {
  createOrder,
  verifyPayment,
  getTransactions,
  deleteTransaction,
} from "../controllers/paymentsController.js";

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);
router.get("/transactions", getTransactions);
router.delete("/transactions/:id", deleteTransaction);

export default router;