import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
} from "@mui/material";

function Payments() {
  const [latestPayment, setLatestPayment] = useState(null);
  const [latestRequest, setLatestRequest] = useState(null);
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const userId = localStorage.getItem("userId");

  // ⭐ Fetch latest payment
  const fetchLatestPayment = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/payment/latest/${userId}`
      );
      setLatestPayment(res.data);
    } catch (err) {
      console.error("Latest payment error:", err);
    }
  };

  // ⭐ Fetch latest service request (tiffin/laundry/room)
  const fetchLatestServiceRequest = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/requests/latest/${userId}`
      );
      setLatestRequest(res.data);
    } catch (err) {
      console.error("Latest request fetch error:", err);
    }
  };

  // ⭐ Submit payment
  const handlePayment = async () => {
    if (!amount.trim()) {
      setStatus("❌ Enter payment amount");
      return;
    }

    if (!latestRequest || !latestRequest.request_id) {
      setStatus("❌ No service request found. Cannot make payment.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/payment/add", {
        user_id: userId,
        request_id: latestRequest.request_id,
        amount,
      });

      setStatus("✅ " + res.data.message);
      setAmount("");

      fetchLatestPayment();
    } catch (err) {
      console.error(err);
      setStatus("❌ Payment failed");
    }
  };

  useEffect(() => {
    fetchLatestPayment();
    fetchLatestServiceRequest();
  }, []);

  return (
    <Box sx={{ paddingTop: "80px", paddingX: "25px" }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Payment Section
      </Typography>

      {/* STATUS MESSAGE */}
      {status && (
        <Typography
          sx={{
            mb: 2,
            fontWeight: "bold",
            color: status.includes("❌") ? "red" : "green",
          }}
        >
          {status}
        </Typography>
      )}

      {/* ⭐ Latest Payment */}
      <Typography variant="h6" sx={{ mb: 1 }}>
        Latest Payment
      </Typography>

      {latestPayment && latestPayment.payment_id ? (
        <Card
          sx={{
            maxWidth: 600,
            padding: 2,
            borderRadius: "14px",
            boxShadow: 3,
            mb: 3,
          }}
        >
          <CardContent>
            <Typography>
              <b>Amount:</b> ₹{latestPayment.amount}
            </Typography>
            <Typography>
              <b>Status:</b> {latestPayment.payment_status}
            </Typography>
            <Typography sx={{ fontSize: "12px", opacity: 0.7 }}>
              {new Date(latestPayment.payment_date).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography sx={{ opacity: 0.7 }}>No payments yet.</Typography>
      )}

      {/* ⭐ Linked Service Request */}
      <Typography variant="h6" sx={{ mb: 1 }}>
        Linked Service Request
      </Typography>

      {latestRequest && latestRequest.request_id ? (
        <Card
          sx={{
            maxWidth: 600,
            padding: 2,
            borderRadius: "14px",
            boxShadow: 3,
            mb: 3,
          }}
        >
          <CardContent>
            <Typography>
              <b>Request ID:</b> {latestRequest.request_id}
            </Typography>
            <Typography>
              <b>Service Type:</b> {latestRequest.service_type}
            </Typography>
            <Typography sx={{ fontSize: "12px", opacity: 0.7 }}>
              {new Date(latestRequest.request_date).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography sx={{ opacity: 0.7 }}>No service request found.</Typography>
      )}

      {/* ⭐ Payment Form */}
      <Card
        sx={{
          maxWidth: 600,
          padding: 3,
          borderRadius: "14px",
          boxShadow: 3,
        }}
      >
        <CardContent>
          <TextField
            label="Amount (₹)"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button variant="contained" fullWidth onClick={handlePayment}>
            Pay Now
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Payments;
