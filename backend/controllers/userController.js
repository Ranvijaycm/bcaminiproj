import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail, getAllUsers } from "../models/userModel.js";

const JWT_SECRET = "MYNEST_SECRET_KEY"; // You can move this to .env later

// REGISTER USER
export const registerUser = (req, res) => {
    const { name, email, password, phone, address, role } = req.body;

    // 1. Check empty fields
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password are required" });
    }

    // 2. Check if email already exists
    findUserByEmail(email, (err, existingUser) => {
        if (err) return res.status(500).json({ message: "Database error" });

        if (existingUser.length > 0) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // 3. Hash password
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return res.status(500).json({ message: "Error hashing password" });

            // 4. Save user
            const newUser = {
                name,
                email,
                password: hashedPassword,
                phone,
                address,
                role: role || "student"
            };

            createUser(newUser, (err, result) => {
                if (err) return res.status(500).json({ message: "Failed to create user" });

                return res.status(201).json({ message: "User registered successfully" });
            });
        });
    });
};


// LOGIN USER
export const loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ message: "Email and password required" });

    findUserByEmail(email, (err, users) => {
        if (err) return res.status(500).json({ message: "Database error" });

        if (users.length === 0)
            return res.status(400).json({ message: "User not found" });

        const user = users[0];

        // Compare passwords
        bcrypt.compare(password, user.password, (err, match) => {
            if (!match) return res.status(400).json({ message: "Incorrect password" });

            // Generate JWT Token
            const token = jwt.sign(
                { id: user.id, role: user.role },
                JWT_SECRET,
                { expiresIn: "7d" }
            );

            return res.json({
                message: "Login successful",
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        });
    });
};


// GET ALL USERS
export const fetchAllUsers = (req, res) => {
    getAllUsers((err, users) => {
        if (err) return res.status(500).json({ message: "Database error" });

        return res.json(users);
    });
};
