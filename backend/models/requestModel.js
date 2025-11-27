import db from "../config/db.js";

// Get latest service request (any type)
export const getLatestRequest = (user_id, callback) => {
    const query = `
        SELECT * FROM service_request
        WHERE user_id = ?
        ORDER BY request_id DESC
        LIMIT 1
    `;
    db.query(query, [user_id], callback);
};
