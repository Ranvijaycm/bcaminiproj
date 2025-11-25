import {
    requestRoomHelp,
    getLatestRoomHelp,
    getRoomHelpHistory
} from "../models/roomModel.js";

// CREATE ROOM REQUEST
export const createRoomRequest = (req, res) => {
    const { user_id, details } = req.body;

    if (!user_id || !details) {
        return res.status(400).json({ message: "user_id and details are required" });
    }

    requestRoomHelp(user_id, details, (err) => {
        if (err) return res.status(500).json({ message: "Failed to request room assistance", details: err });

        res.json({ message: "Room assistance request submitted!" });
    });
};

// GET LATEST
export const fetchLatestRoomHelp = (req, res) => {
    const { user_id } = req.params;

    getLatestRoomHelp(user_id, (err, data) => {
        if (err) return res.status(500).json({ message: "Database error" });

        res.json(data.length ? data[0] : { message: "No room request found" });
    });
};

// GET FULL HISTORY
export const fetchRoomHelpHistory = (req, res) => {
    const { user_id } = req.params;

    getRoomHelpHistory(user_id, (err, data) => {
        if (err) return res.status(500).json({ message: "Database error" });

        res.json(data);
    });
};
