import db from "../config/db.js";

/* ===========================================================
   USERS
=========================================================== */

// FETCH ALL USERS
export const fetchAllUsersAdmin = (callback) => {
    db.query("SELECT * FROM users ORDER BY user_id DESC", callback);
};

/* ===========================================================
   SERVICE REQUESTS
=========================================================== */

// FETCH ALL REQUESTS
export const fetchAllRequests = (callback) => {
    const query = `
        SELECT sr.*, u.name AS user_name
        FROM service_request sr
        JOIN users u ON sr.user_id = u.user_id
        ORDER BY sr.request_id DESC
    `;
    db.query(query, callback);
};

// FETCH ONLY PENDING REQUESTS
export const fetchPendingRequests = (callback) => {
    const query = `
        SELECT sr.*, u.name AS user_name
        FROM service_request sr
        JOIN users u ON sr.user_id = u.user_id
        WHERE sr.status = 'pending'
        ORDER BY sr.request_id DESC
    `;
    db.query(query, callback);
};

// FETCH REQUEST HISTORY
export const fetchRequestHistory = (callback) => {
    const query = `
        SELECT sr.*, u.name AS user_name
        FROM service_request sr
        JOIN users u ON sr.user_id = u.user_id
        WHERE sr.status != 'pending'
        ORDER BY sr.request_id DESC
    `;
    db.query(query, callback);
};

// UPDATE SERVICE REQUEST STATUS (approve / reject)
export const updateServiceStatus = (request_id, status, callback) => {
    const query = `
        UPDATE service_request 
        SET status = ?
        WHERE request_id = ?
    `;
    db.query(query, [status, request_id], callback);
};

/* ===========================================================
   PAYMENTS
=========================================================== */

// FETCH ONLY PENDING PAYMENTS
export const fetchPendingPayments = (callback) => {
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

// FETCH PAYMENT HISTORY
export const fetchPaymentHistory = (callback) => {
    const sql = `
        SELECT p.*, u.name AS user_name, sr.service_type
        FROM payments p
        JOIN users u ON p.user_id = u.user_id
        JOIN service_request sr ON sr.request_id = p.request_id
        WHERE p.payment_status != 'pending'
        ORDER BY p.payment_id DESC
    `;
    db.query(sql, callback);
};

// VERIFY PAYMENT
export const verifyPayment = (payment_id, callback) => {
    const sql = `
        UPDATE payments 
        SET payment_status = 'verified'
        WHERE payment_id = ?
    `;
    db.query(sql, [payment_id], callback);
};

/* ===========================================================
   REPORTS / COMPLAINTS
=========================================================== */

// FETCH ALL REPORTS
export const fetchAllReports = (callback) => {
    const sql = `
        SELECT r.*, u.name AS user_name 
        FROM reports r
        JOIN users u ON r.user_id = u.user_id
        ORDER BY r.report_id DESC
    `;
    db.query(sql, callback);
};

// FETCH ONLY PENDING COMPLAINTS
export const fetchPendingComplaints = (callback) => {
    const sql = `
        SELECT r.*, u.name AS user_name
        FROM reports r
        JOIN users u ON r.user_id = u.user_id
        WHERE r.status = 'pending'
        ORDER BY r.report_id DESC
    `;
    db.query(sql, callback);
};

// ADMIN REPLY TO COMPLAINT
export const addAdminReply = (report_id, reply, callback) => {
    const sql = `
        UPDATE reports
        SET admin_reply = ?, status = 'reviewed'
        WHERE report_id = ?
    `;
    db.query(sql, [reply, report_id], callback);
};


// UPDATE REPORT STATUS
export const updateReportStatus = (report_id, status, callback) => {
    const sql = `
        UPDATE reports 
        SET status = ?
        WHERE report_id = ?
    `;
    db.query(sql, [status, report_id], callback);
};
