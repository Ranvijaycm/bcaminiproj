import express from "express";
import {
  createPayment,
  fetchLatestPayment,
  fetchPaymentHistory
} from "../controllers/paymentController.js";

const router = express.Router();

// Add payment
router.post("/add", createPayment);

// Latest payment
router.get("/latest/:user_id", fetchLatestPayment);

// Full payment history
router.get("/history/:user_id", fetchPaymentHistory);

export default router;
