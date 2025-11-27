import express from "express";
import { fetchLatestRequest } from "../controllers/requestController.js";

const router = express.Router();

// Get latest service request
router.get("/latest/:user_id", fetchLatestRequest);

export default router;
