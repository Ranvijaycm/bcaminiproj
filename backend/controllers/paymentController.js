import {
    addPayment,
    getLatestPayment,
    getPaymentHistory
} from "../models/paymentModel.js";

// ADD PAYMENT
export const createPayment = (req, res) => {
    const { user_id, request_id, amount } = req.body;

    if (!user_id || !request_id || !amount) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    addPayment(user_id, request_id, amount, (err) => {
        if (err) {
            return res.status(500).json({ message: "Failed to add payment", details: err });
        }
        res.json({ message: "Payment recorded successfully!" });
    });
};

// GET LATEST PAYMENT
export const fetchLatestPayment = (req, res) => {
    const { user_id } = req.params;

    getLatestPayment(user_id, (err, data) => {
        if (err) return res.status(500).json({ message: "Database error" });

        res.json(data.length ? data[0] : { message: "No payment found" });
    });
};

// GET PAYMENT HISTORY
export const fetchPaymentHistory = (req, res) => {
    const { user_id } = req.params;

    getPaymentHistory(user_id, (err, data) => {
        if (err) return res.status(500).json({ message: "Database error" });

        res.json(data);
    });
};
