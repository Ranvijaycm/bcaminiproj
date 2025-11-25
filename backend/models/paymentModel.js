import db from "../config/db.js";

// ADD PAYMENT (cash)
export const addPayment = (user_id, request_id, amount, callback) => {
    const query = `
        INSERT INTO payments (user_id, request_id, amount, payment_mode, payment_status)
        VALUES (?, ?, ?, 'cash', 'pending')
    `;
    db.query(query, [user_id, request_id, amount], callback);
};

// GET LATEST PAYMENT
export const getLatestPayment = (user_id, callback) => {
    const query = `
        SELECT * FROM payments
        WHERE user_id = ?
        ORDER BY payment_id DESC
        LIMIT 1
    `;
    db.query(query, [user_id], callback);
};

// GET ALL PAYMENTS FOR USER
export const getPaymentHistory = (user_id, callback) => {
    const query = `
        SELECT * FROM payments
        WHERE user_id = ?
        ORDER BY payment_id DESC
    `;
    db.query(query, [user_id], callback);
};
