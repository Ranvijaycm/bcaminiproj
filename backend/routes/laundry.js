import express from "express";
import {
  createLaundryRequest,
  fetchLatestLaundry,
  fetchLaundryHistory
} from "../controllers/laundryController.js";

const router = express.Router();

// REQUEST LAUNDRY
router.post("/request", createLaundryRequest);

// GET LATEST STATUS
router.get("/latest/:user_id", fetchLatestLaundry);

// FULL HISTORY
router.get("/history/:user_id", fetchLaundryHistory);

export default router;
