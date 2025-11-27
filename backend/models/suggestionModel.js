import db from "../config/db.js";

export const createSuggestion = (userId, suggestion, callback) => {
  const query = "INSERT INTO suggestions (user_id, suggestion) VALUES (?, ?)";
  db.query(query, [userId, suggestion], callback);
};

export const getSuggestionsByUser = (userId, callback) => {
  const query = `
    SELECT id, suggestion, created_at 
    FROM suggestions 
    WHERE user_id = ? 
    ORDER BY created_at DESC
  `;
  db.query(query, [userId], callback);
};
