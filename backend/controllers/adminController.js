import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
    fetchAllUsersAdmin,
    fetchAllRequests,
    fetchPendingRequests,
    fetchRequestHistory,
    updateServiceStatus,

    fetchPendingPayments,
    fetchPaymentHistory,
    verifyPayment,

    fetchAllReports,
    fetchPendingComplaints,
    addAdminReply,
    updateReportStatus
} from "../models/adminModel.js";

import { findUserByEmail } from "../models/userModel.js";

const JWT_SECRET = process.env.JWT_SECRET || "MYNEST_SECRET_KEY";

/* ===========================================================
   ADMIN LOGIN
=========================================================== */
export const adminLogin = (req, res) => {
    const { email, password } = req.body;

    findUserByEmail(email, (err, users) => {
        if (err) return res.status(500).json({ message: "Database error" });

        if (users.length === 0)
            return res.status(400).json({ message: "Admin not found" });

        const admin = users[0];

        if (admin.role !== "admin")
            return res.status(403).json({ message: "Not an admin account" });

        bcrypt.compare(password, admin.password, (err, match) => {
            if (!match)
                return res.status(400).json({ message: "Incorrect password" });

            const token = jwt.sign(
                { id: admin.user_id, role: admin.role },
                JWT_SECRET,
                { expiresIn: "7d" }
            );

            res.json({
                message: "Admin login successful",
                token,
                admin: {
                    id: admin.user_id,
                    name: admin.name,
                    email: admin.email
                }
            });
        });
    });
};

/* ===========================================================
   USERS
=========================================================== */
export const getUsersAdmin = (req, res) => {
    fetchAllUsersAdmin((err, data) => {
        if (err) return res.status(500).json({ message: "Database error" });
        res.json(data);
    });
};

/* ===========================================================
   REQUESTS
=========================================================== */
export const getAllServiceRequests = (req, res) => {
    fetchAllRequests((err, data) => {
        if (err) return res.status(500).json({ message: "Database error" });
        res.json(data);
    });
};

export const getPendingRequests = (req, res) => {
    fetchPendingRequests((err, data) => {
        if (err) return res.status(500).json({ message: "Database error" });
        res.json(data);
    });
};

export const getRequestHistory = (req, res) => {
    fetchRequestHistory((err, data) => {
        if (err) return res.status(500).json({ message: "Database error" });
        res.json(data);
    });
};

export const changeServiceStatus = (req, res) => {
    const { request_id, status } = req.body;

    updateServiceStatus(request_id, status, (err) => {
        if (err) return res.status(500).json({ message: "Failed to update status" });
        res.json({ message: "Status updated successfully!" });
    });
};

/* ===========================================================
   PAYMENTS
=========================================================== */
export const getPendingPayments = (req, res) => {
    fetchPendingPayments((err, data) => {
        if (err) return res.status(500).json({ message: "Database error" });
        res.json(data);
    });
};

export const getPaymentHistory = (req, res) => {
    fetchPaymentHistory((err, data) => {
        if (err) return res.status(500).json({ message: "Database error" });
        res.json(data);
    });
};

export const verifyPaymentAdmin = (req, res) => {
    const { payment_id } = req.body;

    verifyPayment(payment_id, (err) => {
        if (err) return res.status(500).json({ message: "Failed to verify payment" });
        res.json({ message: "Payment verified!" });
    });
};

/* ===========================================================
   COMPLAINTS / REPORTS
=========================================================== */

// FETCH ALL COMPLAINTS
export const getReportsAdmin = (req, res) => {
    fetchAllReports((err, data) => {
        if (err) return res.status(500).json({ message: "Database error" });
        res.json(data);
    });
};

// FETCH PENDING COMPLAINTS
export const getPendingComplaints = (req, res) => {
    fetchPendingComplaints((err, data) => {
        if (err) return res.status(500).json({ message: "Database error" });
        res.json(data);
    });
};

// UPDATE COMPLAINT STATUS + ADD REPLY
export const updateReportAdmin = (req, res) => {
    const { report_id, status, reply } = req.body;

    if (reply) {
        return addAdminReply(report_id, reply, (err) => {
            if (err) return res.status(500).json({ message: "Failed to reply" });
            res.json({ message: "Reply sent!" });
        });
    }

    updateReportStatus(report_id, status, (err) => {
        if (err) return res.status(500).json({ message: "Failed to update report" });
        res.json({ message: "Report status updated!" });
    });
};
