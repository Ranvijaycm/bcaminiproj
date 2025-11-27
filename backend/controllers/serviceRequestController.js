import {
    getPendingRequests,
    approveRequest,
    rejectRequest
} from "../models/serviceRequestModel.js";

export const fetchPendingRequests = (req, res) => {
    getPendingRequests((err, data) => {
        if (err) return res.status(500).json({ message: "Database error", details: err });
        res.json(data);
    });
};

export const approveRequestController = (req, res) => {
    approveRequest(req.params.id, (err) => {
        if (err) return res.status(500).json({ message: "Approval failed", details: err });
        res.json({ message: "Request approved successfully!" });
    });
};

export const rejectRequestController = (req, res) => {
    rejectRequest(req.params.id, (err) => {
        if (err) return res.status(500).json({ message: "Rejection failed", details: err });
        res.json({ message: "Request rejected successfully!" });
    });
};
