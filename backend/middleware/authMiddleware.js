import jwt from "jsonwebtoken";

const JWT_SECRET = "MYNEST_SECRET_KEY"; // move to .env later

// Verify Token Middleware
export const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token)
        return res.status(401).json({ message: "Access denied. No token provided." });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err)
            return res.status(401).json({ message: "Invalid or expired token" });

        req.user = decoded; // id + role stored here
        next();
    });
};

// Allow only admin users
export const requireAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
    }
    next();
};
