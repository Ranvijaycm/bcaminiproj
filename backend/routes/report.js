// backend/routes/report.js
import express from "express";
import {
    submitReport,
    fetchMyReports,
    fetchAllReports,
    modifyReportStatus
} from "../controllers/reportController.js";

const router = express.Router();

// STUDENT
router.post("/add", submitReport);
router.get("/my/:user_id", fetchMyReports);

// ADMIN
router.get("/all", fetchAllReports);
router.put("/update/:report_id", modifyReportStatus);

export default router;
