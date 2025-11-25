// backend/controllers/reportController.js
import {
    createReport,
    getReportsByUser,
    getAllReports,
    updateReportStatus
} from "../models/reportModel.js";

// STUDENT: Submit complaint or feedback
export const submitReport = (req, res) => {
    const { user_id, subject, description, report_type } = req.body;

    if (!user_id || !subject || !description || !report_type) {
        return res.status(400).json({
            message: "user_id, subject, description & report_type required"
        });
    }

    if (!["complaint", "feedback"].includes(report_type)) {
        return res.status(400).json({ message: "Invalid report_type" });
    }

    createReport(user_id, subject, description, report_type, (err) => {
        if (err) return res.status(500).json({ message: "Failed to submit", details: err });

        res.json({ message: `${report_type} submitted successfully!` });
    });
};

// STUDENT: View their own reports
export const fetchMyReports = (req, res) => {
    const { user_id } = req.params;

    getReportsByUser(user_id, (err, reports) => {
        if (err) return res.status(500).json({ message: "DB error", details: err });

        res.json(reports);
    });
};

// ADMIN: view all
export const fetchAllReports = (req, res) => {
    getAllReports((err, reports) => {
        if (err) return res.status(500).json({ message: "DB error", details: err });

        res.json(reports);
    });
};

// ADMIN: update report status
export const modifyReportStatus = (req, res) => {
    const { report_id } = req.params;
    const { status } = req.body;

    if (!["pending", "reviewed", "resolved"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
    }

    updateReportStatus(report_id, status, (err) => {
        if (err) return res.status(500).json({ message: "Failed", details: err });

        res.json({ message: "Status updated successfully" });
    });
};
