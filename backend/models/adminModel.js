import db from "../config/db.js";

// FETCH ALL USERS
export const fetchAllUsersAdmin = (callback) => {
    db.query("SELECT * FROM users", callback);
};

// FETCH ALL SERVICE REQUESTS
export const fetchAllRequests = (callback) => {
    const query = `
        SELECT sr.*, u.name AS user_name
        FROM service_request sr
        JOIN users u ON sr.user_id = u.user_id
        ORDER BY sr.request_id DESC
    `;
    db.query(query, callback);
};

// UPDATE SERVICE REQUEST STATUS
export const updateServiceStatus = (request_id, status, callback) => {
    const query = `
        UPDATE service_request SET status = ?
        WHERE request_id = ?
    `;
    db.query(query, [status, request_id], callback);
};

// FETCH ALL PAYMENTS
export const fetchAllPayments = (callback) => {
    const query = `
        SELECT p.*, u.name AS user_name 
        FROM payments p
        JOIN users u ON p.user_id = u.user_id
        ORDER BY payment_id DESC
    `;
    db.query(query, callback);
};

// VERIFY PAYMENT
export const verifyPayment = (payment_id, callback) => {
    const query = `
        UPDATE payments SET payment_status = 'verified'
        WHERE payment_id = ?
    `;
    db.query(query, [payment_id], callback);
};

// FETCH COMPLAINTS
export const fetchAllReports = (callback) => {
    const query = `
        SELECT r.*, u.name AS user_name
        FROM reports r
        JOIN users u ON r.user_id = u.user_id
        ORDER BY report_id DESC
    `;
    db.query(query, callback);
};

// UPDATE COMPLAINT STATUS
export const updateReportStatus = (report_id, status, callback) => {
    const query = `
        UPDATE reports SET status = ?
        WHERE report_id = ?
    `;
    db.query(query, [status, report_id], callback);
};
