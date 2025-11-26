import db from "../config/db.js";

export const createSuggestion = (userId, message, callback) => {
  const query = "INSERT INTO suggestions (user_id, message) VALUES (?, ?)";
  db.query(query, [userId, message], callback);
};

export const getSuggestionsByUser = (userId, callback) => {
  const query = `
    SELECT id, message, created_at 
    FROM suggestions 
    WHERE user_id = ? 
    ORDER BY created_at DESC
  `;
  db.query(query, [userId], callback);
};
