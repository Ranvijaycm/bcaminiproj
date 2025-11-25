import db from "../config/db.js";

// REQUEST ROOM ASSISTANCE
export const requestRoomHelp = (user_id, details, callback) => {
    const query = `
        INSERT INTO service_request (user_id, service_type, details, status)
        VALUES (?, 'room_cleaning', ?, 'pending')
    `;
    db.query(query, [user_id, details], callback);
};

// GET LATEST ROOM HELP REQUEST
export const getLatestRoomHelp = (user_id, callback) => {
    const query = `
        SELECT * FROM service_request
        WHERE user_id = ? AND service_type = 'room_cleaning'
        ORDER BY request_id DESC
        LIMIT 1
    `;
    db.query(query, [user_id], callback);
};

// FULL ROOM HELP HISTORY
export const getRoomHelpHistory = (user_id, callback) => {
    const query = `
        SELECT * FROM service_request
        WHERE user_id = ? AND service_type = 'room_cleaning'
        ORDER BY request_id DESC
    `;
    db.query(query, [user_id], callback);
};
