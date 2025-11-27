import db from "../config/db.js";

/* ===========================================================
   ADD PAYMENT
=========================================================== */
export const addPayment = (user_id, request_id, amount, callback) => {
    const sql = `
        INSERT INTO payments (user_id, request_id, amount, payment_status)
        VALUES (?, ?, ?, 'pending')
    `;
    db.query(sql, [user_id, request_id, amount], callback);
};

/* ===========================================================
   GET LATEST PAYMENT
=========================================================== */
export const getLatestPayment = (user_id, callback) => {
    const sql = `
        SELECT p.*, sr.service_type
        FROM payments p
        JOIN service_request sr ON sr.request_id = p.request_id
        WHERE p.user_id = ?
        ORDER BY p.payment_id DESC
        LIMIT 1
    `;
    db.query(sql, [user_id], callback);
};

/* ===========================================================
   GET FULL PAYMENT HISTORY
=========================================================== */
export const getPaymentHistory = (user_id, callback) => {
    const sql = `
        SELECT p.*, sr.service_type
        FROM payments p
        JOIN service_request sr ON sr.request_id = p.request_id
        WHERE p.user_id = ?
        ORDER BY p.payment_id DESC
    `;
    db.query(sql, [user_id], callback);
};

/* ===========================================================
   ADMIN — PENDING PAYMENTS
=========================================================== */
export const getPendingPayments = (callback) => {
    const sql = `
        SELECT p.*, u.name AS user_name, sr.service_type
        FROM payments p
        JOIN users u ON p.user_id = u.user_id
        JOIN service_request sr ON sr.request_id = p.request_id
        WHERE p.payment_status = 'pending'
        ORDER BY p.payment_id DESC
    `;
    db.query(sql, callback);
};

/* ===========================================================
   ADMIN — VERIFY PAYMENT
=========================================================== */
export const verifyPayment = (payment_id, callback) => {
    const sql = `
        UPDATE payments 
        SET payment_status = 'verified'
        WHERE payment_id = ?
    `;
    db.query(sql, [payment_id], callback);
};

/* ===========================================================
   STUDENT — GET ALL PAYMENTS
=========================================================== */
export const getStudentPayments = (user_id, callback) => {
    const sql = `
        SELECT p.*, sr.service_type
        FROM payments p
        JOIN service_request sr ON sr.request_id = p.request_id
        WHERE p.user_id = ?
        ORDER BY p.payment_id DESC
    `;
    db.query(sql, [user_id], callback);
};
