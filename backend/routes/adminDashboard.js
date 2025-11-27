import express from "express";
import db from "../config/db.js";

const router = express.Router();

// ADMIN DASHBOARD STATS
router.get("/", (req, res) => {
  const statsQuery = `
    SELECT
      (SELECT COUNT(*) FROM users WHERE role = 'student') AS students,
      (SELECT COUNT(*) FROM service_request WHERE status = 'pending') AS service_requests,
      (SELECT COUNT(*) FROM payments WHERE payment_status = 'pending') AS payments,
      (SELECT COUNT(*) FROM reports WHERE status = 'pending') AS complaints
  `;

  db.query(statsQuery, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }

    res.json(data[0]); // return stats
  });
});

export default router;
