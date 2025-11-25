import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.post("/add", (req, res) => {
  const { user_id, suggestion } = req.body;

  db.query(
    "INSERT INTO suggestions (user_id, suggestion) VALUES (?, ?)",
    [user_id, suggestion],
    (err) => {
      if (err) {
        return res.status(500).json({ error: "Database error", details: err });
      }
      res.json({ message: "Suggestion submitted successfully!" });
    }
  );
});

export default router;
