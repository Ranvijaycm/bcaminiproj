import db from "../config/db.js";

// TOTAL STUDENTS
export const totalStudents = (callback) => {
    const q = `SELECT COUNT(*) AS total FROM users WHERE role = 'student'`;
    db.query(q, callback);
};

// PENDING SERVICE REQUESTS
export const pendingRequests = (callback) => {
    const q = `SELECT COUNT(*) AS pending FROM service_request WHERE status = 'pending'`;
    db.query(q, callback);
};

// PENDING PAYMENTS
export const pendingPayments = (callback) => {
    const q = `SELECT COUNT(*) AS pending FROM payments WHERE payment_status = 'pending'`;
    db.query(q, callback);
};

// PENDING COMPLAINTS
export const pendingComplaints = (callback) => {
    const q = `SELECT COUNT(*) AS pending FROM complaints WHERE status = 'pending'`;
    db.query(q, callback);
};


// MAIN DASHBOARD CONTROLLER
export const adminDashboard = (req, res) => {
    totalStudents((err, s1) => {
        if (err) return res.status(500).json({ message: "DB Error" });

        pendingRequests((err, s2) => {
            if (err) return res.status(500).json({ message: "DB Error" });

            pendingPayments((err, s3) => {
                if (err) return res.status(500).json({ message: "DB Error" });

                pendingComplaints((err, s4) => {
                    if (err) return res.status(500).json({ message: "DB Error" });

                    res.json({
                        students: s1[0].total,
                        service_requests: s2[0].pending,
                        payments: s3[0].pending,
                        complaints: s4[0].pending
                    });
                });
            });
        });
    });
};
