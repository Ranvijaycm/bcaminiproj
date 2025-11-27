// backend/controllers/complaintController.js
import {
  createComplaint,
  getComplaintsByUser,
} from "../models/complaintModel.js";

// POST /api/complaints
export const addComplaint = (req, res) => {
  const { user_id, subject, description } = req.body;

  if (!user_id || !subject || !description) {
    return res
      .status(400)
      .json({ message: "User, subject and description are required" });
  }

  createComplaint(user_id, subject, description, (err, result) => {
    if (err) {
      console.error("DB error (addComplaint):", err);
      return res
        .status(500)
        .json({ message: "Database error", error: err });
    }

    return res.status(201).json({
      message: "Complaint submitted successfully",
      complaint_id: result.insertId,
    });
  });
};

// GET /api/complaints/user/:userId
export const getUserComplaints = (req, res) => {
  const { userId } = req.params;

  getComplaintsByUser(userId, (err, rows) => {
    if (err) {
      console.error("DB error (getUserComplaints):", err);
      return res
        .status(500)
        .json({ message: "Database error", error: err });
    }

    return res.json(rows);
  });
};
