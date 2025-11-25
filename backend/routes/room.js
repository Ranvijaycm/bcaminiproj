import express from "express";
import {
  createRoomRequest,
  fetchLatestRoomHelp,
  fetchRoomHelpHistory
} from "../controllers/roomController.js";

const router = express.Router();

// Submit Room Request
router.post("/request", createRoomRequest);

// Get Latest Status
router.get("/latest/:user_id", fetchLatestRoomHelp);

// Full History
router.get("/history/:user_id", fetchRoomHelpHistory);

export default router;
