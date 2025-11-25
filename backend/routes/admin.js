import express from "express";
import {
  getUsersAdmin,
  getAllServiceRequests,
  changeServiceStatus,
  getAllPayments,
  verifyPaymentAdmin,
  getReportsAdmin,
  updateReportAdmin
} from "../controllers/adminController.js";

const router = express.Router();

// USERS
router.get("/users", getUsersAdmin);

// SERVICE REQUESTS
router.get("/requests", getAllServiceRequests);
router.post("/request/update", changeServiceStatus);

// PAYMENTS
router.get("/payments", getAllPayments);
router.post("/payments/verify", verifyPaymentAdmin);

// REPORTS
router.get("/reports", getReportsAdmin);
router.post("/reports/update", updateReportAdmin);

export default router;
