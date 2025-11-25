import express from "express";
import { registerUser, loginUser, fetchAllUsers } from "../controllers/userController.js";

const router = express.Router();

console.log("Users route file LOADED");

// REGISTER
router.post("/register", registerUser);

// LOGIN
router.post("/login", loginUser);

// GET ALL USERS
router.get("/", fetchAllUsers);

export default router;
