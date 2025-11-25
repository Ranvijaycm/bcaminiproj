import express from "express";
import { registerUser, loginUser, fetchAllUsers } from "../controllers/userController.js";
console.log("Users route file LOADED"); //temporary test

const router = express.Router();

// REGISTER
router.post("/register", registerUser);

// LOGIN
router.post("/login", loginUser);

// GET ALL USERS
router.get("/", fetchAllUsers);

router.post("/register", (req, res) => {
  console.log("🔥 REGISTER ENDPOINT INSIDE ROUTER REACHED");
  res.send("Router file reached but controller not connected");
});



export default router;
