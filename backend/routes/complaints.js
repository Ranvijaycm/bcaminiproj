// backend/routes/complaints.js
import express from "express";
import {
  addComplaint,
  getUserComplaints,
} from "../controllers/complaintController.js";

const router = express.Router();

// Add a complaint
router.post("/", addComplaint);

// Get all complaints for a specific user
router.get("/user/:userId", getUserComplaints);

export default router;
