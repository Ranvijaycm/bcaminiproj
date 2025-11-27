import express from "express";

import {
  createPayment,
  fetchLatestPayment,
  fetchPaymentHistory,
  verifyPaymentController,
  fetchPendingPayments,
  getStudentPaymentsController
} from "../controllers/paymentController.js";

const router = express.Router();

/* ===========================================================
   STUDENT ROUTES
=========================================================== */

// Add payment
router.post("/add", createPayment);

// Latest payment (for receipt)
router.get("/latest/:user_id", fetchLatestPayment);

// Student full payment history
router.get("/history/:user_id", fetchPaymentHistory);

// Student all payments (NEW)
router.get("/student/:user_id", getStudentPaymentsController);


/* ===========================================================
   ADMIN ROUTES
=========================================================== */

// Admin pending payments
router.get("/pending", fetchPendingPayments);

// Admin verify payment
router.put("/verify/:payment_id", verifyPaymentController);


export default router;
