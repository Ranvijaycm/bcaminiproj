import {
    addPayment,
    getLatestPayment,
    getPaymentHistory,
    verifyPayment,
    getPendingPayments,
    getStudentPayments
} from "../models/paymentModel.js";

/* ===========================================================
   ADD PAYMENT
=========================================================== */
export const createPayment = (req, res) => {
    const { user_id, request_id, amount } = req.body;

    if (!user_id || !request_id || !amount) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    addPayment(user_id, request_id, amount, (err) => {
        if (err)
            return res.status(500).json({ message: "Failed to add payment", details: err });

        res.json({ message: "Payment recorded successfully!" });
    });
};

/* ===========================================================
   GET LATEST PAYMENT (Student)
=========================================================== */
export const fetchLatestPayment = (req, res) => {
    const { user_id } = req.params;

    getLatestPayment(user_id, (err, data) => {
        if (err) return res.status(500).json({ message: "Database error" });

        res.json(data.length ? data[0] : []);
    });
};

/* ===========================================================
   GET FULL PAYMENT HISTORY (Student)
=========================================================== */
export const fetchPaymentHistory = (req, res) => {
    const { user_id } = req.params;

    getPaymentHistory(user_id, (err, data) => {
        if (err) return res.status(500).json({ message: "Database error" });

        res.json(data);
    });
};

/* ===========================================================
   ADMIN — GET PENDING PAYMENTS
=========================================================== */
export const fetchPendingPayments = (req, res) => {
    getPendingPayments((err, data) => {
        if (err)
            return res.status(500).json({ message: "Database error", details: err });

        res.json(data);
    });
};

/* ===========================================================
   ADMIN — VERIFY A PAYMENT
=========================================================== */
export const verifyPaymentController = (req, res) => {
    const { payment_id } = req.params;

    verifyPayment(payment_id, (err) => {
        if (err)
            return res.status(500).json({ message: "Verification failed", details: err });

        res.json({ message: "Payment verified successfully!" });
    });
};

/* ===========================================================
   STUDENT — GET ALL PAYMENTS LIST
=========================================================== */
export const getStudentPaymentsController = (req, res) => {
    const user_id = req.params.user_id;

    getStudentPayments(user_id, (err, data) => {
        if (err)
            return res.status(500).json({ message: "Database error", details: err });

        res.json(data);
    });
};
