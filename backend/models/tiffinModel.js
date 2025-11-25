import db from "../config/db.js";

// Get all tiffin providers
export const getAllTiffinProviders = (callback) => {
    const query = "SELECT * FROM tiffin_service";
    db.query(query, callback);
};

// Subscribe to a tiffin service
export const subscribeTiffin = (user_id, tiffin_id, callback) => {
    const query = `
        INSERT INTO service_request (user_id, tiffin_id, service_type, status)
        VALUES (?, ?, 'tiffin', 'pending')
    `;
    db.query(query, [user_id, tiffin_id], callback);
};

// Get user's latest tiffin subscription
export const getMyTiffinSubscription = (user_id, callback) => {
    const query = `
        SELECT * FROM service_request 
        WHERE user_id = ? AND service_type = 'tiffin'
        ORDER BY request_id DESC LIMIT 1
    `;
    db.query(query, [user_id], callback);
};
