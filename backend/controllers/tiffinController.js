import {
    getAllTiffinProviders,
    subscribeTiffin,
    getMyTiffinSubscription
} from "../models/tiffinModel.js";

// GET ALL PROVIDERS
export const fetchTiffinProviders = (req, res) => {
    getAllTiffinProviders((err, data) => {
        if (err) return res.status(500).json({ message: "Database error", details: err });
        res.json(data);
    });
};

// SUBSCRIBE
export const subscribeToTiffin = (req, res) => {
    const { user_id, tiffin_id } = req.body;

    if (!user_id || !tiffin_id) {
        return res.status(400).json({ message: "user_id and tiffin_id required" });
    }

    subscribeTiffin(user_id, tiffin_id, (err, result) => {
        if (err) return res.status(500).json({ message: "Failed to subscribe", details: err });

        res.json({ message: "Tiffin subscription created successfully!" });
    });
};

// GET MY SUBSCRIPTION
export const fetchMySubscription = (req, res) => {
    const { user_id } = req.params;

    getMyTiffinSubscription(user_id, (err, data) => {
        if (err) return res.status(500).json({ message: "Database error", details: err });

        res.json(data.length ? data[0] : { message: "No subscription found" });
    });
};
