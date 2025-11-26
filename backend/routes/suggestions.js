import express from "express";
import { addSuggestion, getUserSuggestions } from "../controllers/suggestionController.js";

const router = express.Router();

// Add suggestion
router.post("/", addSuggestion);

// Get all suggestions for a specific user
router.get("/user/:userId", getUserSuggestions);

export default router;
