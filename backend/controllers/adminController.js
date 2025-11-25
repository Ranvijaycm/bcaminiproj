import {
    fetchAllUsersAdmin,
    fetchAllRequests,
    updateServiceStatus,
    fetchAllPayments,
    verifyPayment,
    fetchAllReports,
    updateReportStatus
} from "../models/adminModel.js";

// GET ALL USERS
export const getUsersAdmin = (req, res) => {
    fetchAllUsersAdmin((err, data) => {
        if (err) return res.status(500).json({ message: "Database error" });
        res.json(data);
    });
};

// GET ALL SERVICE REQUESTS
export const getAllServiceRequests = (req, res) => {
    fetchAllRequests((err, data) => {
        if (err) return res.status(500).json({ message: "Database error" });
        res.json(data);
    });
};

// UPDATE SERVICE REQUEST STATUS
export const changeServiceStatus = (req, res) => {
    const { request_id, status } = req.body;

    updateServiceStatus(request_id, status, (err) => {
        if (err) return res.status(500).json({ message: "Failed to update status" });
        res.json({ message: "Status updated successfully!" });
    });
};

// GET ALL PAYMENTS
export const getAllPayments = (req, res) => {
    fetchAllPayments((err, data) => {
        if (err) return res.status(500).json({ message: "Database error" });
        res.json(data);
    });
};

// VERIFY PAYMENT
export const verifyPaymentAdmin = (req, res) => {
    const { payment_id } = req.body;

    verifyPayment(payment_id, (err) => {
        if (err) return res.status(500).json({ message: "Failed to verify payment" });
        res.json({ message: "Payment verified!" });
    });
};

// GET ALL REPORTS
export const getReportsAdmin = (req, res) => {
    fetchAllReports((err, data) => {
        if (err) return res.status(500).json({ message: "Database error" });
        res.json(data);
    });
};

// UPDATE REPORT STATUS
export const updateReportAdmin = (req, res) => {
    const { report_id, status } = req.body;

    updateReportStatus(report_id, status, (err) => {
        if (err) return res.status(500).json({ message: "Failed to update report status" });
        res.json({ message: "Report status updated successfully!" });
    });
};
