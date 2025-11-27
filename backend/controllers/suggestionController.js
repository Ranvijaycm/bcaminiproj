import { createSuggestion, getSuggestionsByUser } from "../models/suggestionModel.js";

// POST /api/suggestions
export const addSuggestion = (req, res) => {
  const { user_id, message } = req.body;   // message coming from frontend

  if (!user_id || !message) {
    return res.status(400).json({ message: "User and message are required" });
  }

  // Pass `message` as `suggestion` to model
  createSuggestion(user_id, message, (err, result) => {
    if (err) {
      console.error("DB ERROR:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    return res.status(201).json({
      message: "Suggestion submitted successfully",
      suggestion_id: result.insertId,
    });
  });
};

// GET /api/suggestions/user/:userId
export const getUserSuggestions = (req, res) => {
  const { userId } = req.params;

  getSuggestionsByUser(userId, (err, rows) => {
    if (err) {
      console.error("DB ERROR:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    return res.json(rows);
  });
};
