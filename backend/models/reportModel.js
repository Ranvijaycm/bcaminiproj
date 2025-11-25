// backend/models/reportModel.js
import db from "../config/db.js";

// Create new report (complaint OR feedback)
export const createReport = (user_id, subject, description, report_type, callback) => {
    const query = `
        INSERT INTO reports (user_id, subject, description, status, report_type)
        VALUES (?, ?, ?, 'pending', ?)
    `;

    db.query(query, [user_id, subject, description, report_type], callback);
};

// Get all reports submitted by a student
export const getReportsByUser = (user_id, callback) => {
    const query = `
        SELECT * FROM reports
        WHERE user_id = ?
        ORDER BY report_id DESC
    `;
    db.query(query, [user_id], callback);
};

// Admin: Get ALL reports
export const getAllReports = (callback) => {
    db.query("SELECT * FROM reports ORDER BY report_id DESC", callback);
};

// Admin: Update status
export const updateReportStatus = (report_id, status, callback) => {
    db.query(
        "UPDATE reports SET status = ? WHERE report_id = ?",
        [status, report_id],
        callback
    );
};
