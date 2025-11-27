import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Tabs,
  Tab
} from "@mui/material";

function AdminRequests() {
  const [tab, setTab] = useState(0);
  const [pending, setPending] = useState([]);
  const [history, setHistory] = useState([]);

  // FETCH PENDING
  const fetchPending = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/requests/pending");
    setPending(res.data);
  };

  // FETCH HISTORY
  const fetchHistory = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/requests/history");
    setHistory(res.data);
  };

  const handleStatus = async (id, status) => {
    await axios.post("http://localhost:5000/api/admin/requests/update", {
      request_id: id,
      status
    });

    fetchPending();
    fetchHistory();
  };

  useEffect(() => {
    fetchPending();
    fetchHistory();
  }, []);

  return (
    <Box sx={{ padding: "30px" }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Service Requests
      </Typography>

      <Tabs value={tab} onChange={(e, t) => setTab(t)} sx={{ mb: 3 }}>
        <Tab label="Pending Requests" />
        <Tab label="Request History" />
      </Tabs>

      {/* PENDING */}
      {tab === 0 && (
        <Grid container spacing={3}>
          {pending.length === 0 && (
            <Typography sx={{ ml: 2, opacity: 0.6 }}>No pending requests</Typography>
          )}

          {pending.map((req) => (
            <Grid item xs={12} md={6} key={req.request_id}>
              <Card sx={{ borderRadius: "14px", boxShadow: 3 }}>
                <CardContent>
                  <Typography><b>User:</b> {req.user_name}</Typography>
                  <Typography><b>Service:</b> {req.service_type}</Typography>
                  <Typography><b>Details:</b> {req.details || "No details"}</Typography>

                  <Typography sx={{ opacity: 0.6, fontSize: "12px", mt: 1 }}>
                    {new Date(req.request_date).toLocaleString()}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                    <Button
                      variant="contained"
                      color="success"
                      fullWidth
                      onClick={() => handleStatus(req.request_id, "approved")}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      fullWidth
                      onClick={() => handleStatus(req.request_id, "rejected")}
                    >
                      Reject
                    </Button>
                  </Box>
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
            <Typography sx={{ ml: 2, opacity: 0.6 }}>No previous requests</Typography>
          )}

          {history.map((req) => (
            <Grid item xs={12} md={6} key={req.request_id}>
              <Card sx={{ borderRadius: "14px", boxShadow: 3 }}>
                <CardContent>
                  <Typography><b>User:</b> {req.user_name}</Typography>
                  <Typography><b>Service:</b> {req.service_type}</Typography>
                  <Typography><b>Status:</b> {req.status}</Typography>
                  <Typography><b>Details:</b> {req.details || "No details"}</Typography>

                  <Typography sx={{ opacity: 0.6, fontSize: "12px", mt: 1 }}>
                    {new Date(req.request_date).toLocaleString()}
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

export default AdminRequests;
