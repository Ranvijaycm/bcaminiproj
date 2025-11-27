import express from "express";
import {
  adminLogin,

  // USERS
  getUsersAdmin,

  // REQUESTS
  getAllServiceRequests,
  getPendingRequests,
  getRequestHistory,
  changeServiceStatus,

  // PAYMENTS
  getPendingPayments,
  getPaymentHistory,
  verifyPaymentAdmin,

  // REPORTS
  getReportsAdmin,
  getPendingComplaints,
  updateReportAdmin
} from "../controllers/adminController.js";

const router = express.Router();

/* ===========================================================
   ADMIN LOGIN
=========================================================== */
router.post("/login", adminLogin);

/* ===========================================================
   USERS
=========================================================== */
router.get("/users", getUsersAdmin);

/* ===========================================================
   SERVICE REQUESTS
=========================================================== */
router.get("/requests/all", getAllServiceRequests);
router.get("/requests/pending", getPendingRequests);
router.get("/requests/history", getRequestHistory);
router.post("/requests/update", changeServiceStatus);

/* ===========================================================
   PAYMENTS
=========================================================== */
router.get("/payments/pending", getPendingPayments);
router.get("/payments/history", getPaymentHistory);
router.post("/payments/verify", verifyPaymentAdmin);

/* ===========================================================
   REPORTS / COMPLAINTS
=========================================================== */
router.get("/reports", getReportsAdmin);
router.get("/reports/pending", getPendingComplaints);
router.post("/reports/update", updateReportAdmin);

export default router;
