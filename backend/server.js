import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/users.js";
import tiffinRoutes from "./routes/tiffin.js";
import laundryRoutes from "./routes/laundry.js";
import roomRoutes from "./routes/room.js";

import adminRoutes from "./routes/admin.js";              // admin login + admin actions
import adminDashboardRoute from "./routes/adminDashboard.js"; // admin dashboard stats

import paymentRoutes from "./routes/payment.js";
import reportRoutes from "./routes/report.js";
import complaintsRoute from "./routes/complaints.js";

import requestRoutes from "./routes/requests.js";         // student service request latest
import suggestionsRoute from "./routes/suggestions.js";

dotenv.config();
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// DEFAULT ROUTE
app.get("/", (req, res) => {
  res.send("MyNest Backend Running...");
});

// ============================
// API ROUTES
// ============================

// USER
app.use("/api/users", userRoutes);

// SERVICES
app.use("/api/tiffin", tiffinRoutes);
app.use("/api/laundry", laundryRoutes);
app.use("/api/room", roomRoutes);

// ADMIN
app.use("/api/admin", adminRoutes);                // /api/admin/login, /api/admin/requests etc.
app.use("/api/admin/dashboard", adminDashboardRoute);   // /api/admin/dashboard → dashboard stats

// PAYMENTS
app.use("/api/payment", paymentRoutes);

// COMPLAINTS & REPORTS
app.use("/api/complaints", complaintsRoute);
app.use("/api/report", reportRoutes);

// SERVICE REQUEST ROUTE (latest request for payments)
app.use("/api/requests", requestRoutes);

// SUGGESTIONS
app.use("/api/suggestions", suggestionsRoute);

// ============================
// START SERVER
// ============================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
