import db from "../config/db.js";

// REQUEST LAUNDRY
export const requestLaundry = (user_id, details, callback) => {
    const query = `
        INSERT INTO service_request (user_id, service_type, details, status)
        VALUES (?, 'laundry', ?, 'pending')
    `;
    db.query(query, [user_id, details], callback);
};

// GET LATEST LAUNDRY REQUEST
export const getLatestLaundry = (user_id, callback) => {
    const query = `
        SELECT * FROM service_request
        WHERE user_id = ? AND service_type = 'laundry'
        ORDER BY request_id DESC
        LIMIT 1
    `;
    db.query(query, [user_id], callback);
};

// FULL LAUNDRY HISTORY
export const getLaundryHistory = (user_id, callback) => {
    const query = `
        SELECT * FROM service_request
        WHERE user_id = ? AND service_type = 'laundry'
        ORDER BY request_id DESC
    `;
    db.query(query, [user_id], callback);
};
