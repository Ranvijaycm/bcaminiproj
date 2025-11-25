const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/add', (req, res) => {
  const { user_id, suggestion } = req.body;
  db.query(
    "INSERT INTO suggestions (user_id, suggestion) VALUES (?, ?)",
    [user_id, suggestion],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Suggestion submitted!" });
    }
  );
});

module.exports = router;
