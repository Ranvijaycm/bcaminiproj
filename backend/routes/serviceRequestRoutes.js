import express from "express";
import {
    fetchPendingRequests,
    approveRequestController,
    rejectRequestController
} from "../controllers/serviceRequestController.js";

const router = express.Router();

router.get("/pending", fetchPendingRequests);
router.put("/approve/:id", approveRequestController);
router.put("/reject/:id", rejectRequestController);

export default router;
