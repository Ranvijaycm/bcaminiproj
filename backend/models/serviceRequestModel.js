import db from "../config/db.js";

// Fetch all pending service requests
export const getPendingRequests = (callback) => {
    const query = `
        SELECT service_request.*, users.name
        FROM service_request
        JOIN users ON users.user_id = service_request.user_id
        WHERE status = 'pending'
        ORDER BY request_date DESC
    `;
    db.query(query, callback);
};

// Approve request
export const approveRequest = (reqId, callback) => {
    const query = `
        UPDATE service_request
        SET status = 'approved'
        WHERE request_id = ?
    `;
    db.query(query, [reqId], callback);
};

// Reject request
export const rejectRequest = (reqId, callback) => {
    const query = `
        UPDATE service_request
        SET status = 'rejected'
        WHERE request_id = ?
    `;
    db.query(query, [reqId], callback);
};
