import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  Grid
} from "@mui/material";

function AdminPayments() {
  const [tab, setTab] = useState(0);
  const [pending, setPending] = useState([]);
  const [history, setHistory] = useState([]);

  const loadPending = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/payments/pending");
    setPending(res.data);
  };

  const loadHistory = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/payments/history");
    setHistory(res.data);
  };

  const verifyPayment = async (payment_id) => {
    await axios.post("http://localhost:5000/api/admin/payments/verify", { payment_id });
    loadPending();
    loadHistory();
  };

  useEffect(() => {
    loadPending();
    loadHistory();
  }, []);

  return (
    <Box sx={{ padding: "30px" }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Payments Management
      </Typography>

      <Tabs value={tab} onChange={(e, t) => setTab(t)} sx={{ mb: 3 }}>
        <Tab label="Pending Payments" />
        <Tab label="Payment History" />
      </Tabs>

      {/* PENDING */}
      {tab === 0 && (
        <Grid container spacing={3}>
          {pending.length === 0 && (
            <Typography sx={{ ml: 2, opacity: 0.6 }}>No pending payments</Typography>
          )}

          {pending.map((p) => (
            <Grid item xs={12} md={6} key={p.payment_id}>
              <Card sx={{ borderRadius: "14px", boxShadow: 3 }}>
                <CardContent>
                  <Typography><b>User:</b> {p.user_name}</Typography>
                  <Typography><b>Service:</b> {p.service_type}</Typography>
                  <Typography><b>Amount:</b> ₹{p.amount}</Typography>

                  <Typography sx={{ opacity: 0.6, fontSize: "12px", mt: 1 }}>
                    {new Date(p.payment_date).toLocaleString()}
                  </Typography>

                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => verifyPayment(p.payment_id)}
                  >
                    Verify Payment
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* HISTORY */}
      {tab === 1 && (
        <Grid container spacing={3}>
          {history.length === 0 && (
            <Typography sx={{ ml: 2, opacity: 0.6 }}>No payment history</Typography>
          )}

          {history.map((p) => (
            <Grid item xs={12} md={6} key={p.payment_id}>
              <Card sx={{ borderRadius: "14px", boxShadow: 3 }}>
                <CardContent>
                  <Typography><b>User:</b> {p.user_name}</Typography>
                  <Typography><b>Service:</b> {p.service_type}</Typography>
                  <Typography><b>Amount:</b> ₹{p.amount}</Typography>
                  <Typography><b>Status:</b> Verified</Typography>

                  <Typography sx={{ opacity: 0.6, fontSize: "12px", mt: 1 }}>
                    {new Date(p.payment_date).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default AdminPayments;
