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

// ⭐ UPDATED: Get user's latest tiffin subscription WITH provider details
export const getMyTiffinSubscription = (user_id, callback) => {
    const query = `
        SELECT 
            sr.request_id, 
            sr.status, 
            sr.request_date,
            sr.tiffin_id,
            ts.provider_name,
            ts.meal_type,
            ts.price
        FROM service_request sr
        LEFT JOIN tiffin_service ts 
            ON sr.tiffin_id = ts.tiffin_id
        WHERE sr.user_id = ? 
          AND sr.service_type = 'tiffin'
        ORDER BY sr.request_id DESC 
        LIMIT 1
    `;

    db.query(query, [user_id], callback);
};
