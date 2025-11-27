import { getLatestRequest } from "../models/requestModel.js";

export const fetchLatestRequest = (req, res) => {
    const { user_id } = req.params;

    getLatestRequest(user_id, (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Database error", details: err });
        }

        if (!data.length) {
            return res.json({ message: "No requests found" });
        }

        res.json(data[0]);
    });
};
