import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import suggestionRoutes from "./routes/suggestion.js";

app.use('/api/suggestion', require('./routes/suggestion'));

import db from "./config/db.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Default route
app.get("/", (req, res) => {
    res.send("MyNest Backend is Running...");
});

// User Routes
app.use("/api/users", userRoutes);
app.use("/api/suggestion", suggestionRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
