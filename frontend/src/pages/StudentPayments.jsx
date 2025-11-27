    import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Card, CardContent, Chip } from "@mui/material";

function StudentPayments() {
  const [payments, setPayments] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchPayments = async () => {
    const res = await axios.get(`http://localhost:5000/api/payment/student/${user.id}`);
    setPayments(res.data);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <Box sx={{ padding: "30px" }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        My Payments
      </Typography>

      {payments.length === 0 ? (
        <Typography sx={{ opacity: 0.6 }}>No payments found</Typography>
      ) : (
        payments.map((p) => (
          <Card
            key={p.payment_id}
            sx={{ mb: 2, borderRadius: "14px", boxShadow: 2 }}
          >
            <CardContent>
              <Typography>
                <b>Service:</b> {p.service_type}
              </Typography>
              <Typography>
                <b>Amount:</b> ₹{p.amount}
              </Typography>

              <Typography>
                <b>Status:</b>{" "}
                <Chip
                  label={p.payment_status}
                  color={p.payment_status === "verified" ? "success" : "warning"}
                  size="small"
                />
              </Typography>

              <Typography sx={{ mt: 1, fontSize: "12px", opacity: 0.7 }}>
                {new Date(p.payment_date).toLocaleString()}
              </Typography>

              {p.screenshot && (
                <img
                  src={`http://localhost:5000/uploads/${p.screenshot}`}
                  alt="Payment"
                  style={{
                    width: "120px",
                    marginTop: "10px",
                    borderRadius: "10px",
                    border: "1px solid #ddd",
                  }}
                />
              )}
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}

export default StudentPayments;
