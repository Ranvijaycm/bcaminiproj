import {
    requestLaundry,
    getLatestLaundry,
    getLaundryHistory
} from "../models/laundryModel.js";

// REQUEST LAUNDRY
export const createLaundryRequest = (req, res) => {
    const { user_id, details } = req.body;

    if (!user_id || !details) {
        return res.status(400).json({ message: "user_id and details are required" });
    }

    requestLaundry(user_id, details, (err) => {
        if (err) return res.status(500).json({ message: "Failed to request laundry", details: err });

        res.json({ message: "Laundry request submitted!" });
    });
};

// GET LATEST STATUS
export const fetchLatestLaundry = (req, res) => {
    const { user_id } = req.params;

    getLatestLaundry(user_id, (err, data) => {
        if (err) return res.status(500).json({ message: "Database error" });

        res.json(data.length ? data[0] : { message: "No laundry request found" });
    });
};

// GET FULL HISTORY
export const fetchLaundryHistory = (req, res) => {
    const { user_id } = req.params;

    getLaundryHistory(user_id, (err, data) => {
        if (err) return res.status(500).json({ message: "Database error" });

        res.json(data);
    });
};
