import express from "express";
import {
  fetchTiffinProviders,
  subscribeToTiffin,
  fetchMySubscription
} from "../controllers/tiffinController.js";

const router = express.Router();

// GET ALL PROVIDERS
router.get("/providers", fetchTiffinProviders);

// SUBSCRIBE
router.post("/subscribe", subscribeToTiffin);

// GET MY SUBSCRIPTION
router.get("/my/:user_id", fetchMySubscription);

export default router;
