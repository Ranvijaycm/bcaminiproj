import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import tiffinRoutes from "./routes/tiffin.js";
import laundryRoutes from "./routes/laundry.js";
import roomRoutes from "./routes/room.js";
import adminRoutes from "./routes/admin.js";
import paymentRoutes from "./routes/payment.js";
import reportRoutes from "./routes/report.js";

import suggestionRoutes from "./routes/suggestion.js";
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
app.use("/api/tiffin", tiffinRoutes);
app.use("/api/laundry", laundryRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/report", reportRoutes);


app.use("/api/suggestion", suggestionRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
