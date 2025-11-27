// backend/models/complaintModel.js
import db from "../config/db.js";

export const createComplaint = (userId, subject, description, callback) => {
  const query = `
    INSERT INTO reports (user_id, subject, description, report_type)
    VALUES (?, ?, ?, 'complaint')
  `;

  db.query(query, [userId, subject, description], callback);
};

export const getComplaintsByUser = (userId, callback) => {
  const query = `
    SELECT report_id, subject, description, status, created_at
    FROM reports
    WHERE user_id = ? AND report_type = 'complaint'
    ORDER BY created_at DESC
  `;

  db.query(query, [userId], callback);
};
