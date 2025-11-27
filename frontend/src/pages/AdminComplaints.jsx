import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Tabs,
  Tab,
  TextField,
} from "@mui/material";

function AdminComplaints() {
  const [tab, setTab] = useState(0);
  const [pending, setPending] = useState([]);
  const [history, setHistory] = useState([]);
  const [replyText, setReplyText] = useState({}); // reply per complaint

  // FETCH pending complaints
  const fetchPending = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/reports");
    const pendingData = res.data.filter((c) => c.status === "pending");
    setPending(pendingData);
  };

  // FETCH history complaints
  const fetchHistory = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/reports");
    const historyData = res.data.filter((c) => c.status !== "pending");
    setHistory(historyData);
  };

  useEffect(() => {
    fetchPending();
    fetchHistory();
  }, []);

  // HANDLE sending reply
  const handleReply = async (report_id) => {
    const reply = replyText[report_id];

    if (!reply || reply.trim() === "") {
      alert("Reply cannot be empty!");
      return;
    }

    await axios.post("http://localhost:5000/api/admin/reports/update", {
      report_id,
      reply,
    });

    // Clear reply input only for this complaint
    setReplyText((prev) => ({ ...prev, [report_id]: "" }));

    fetchPending();
    fetchHistory();
  };

  return (
    <Box sx={{ paddingTop: "40px", paddingX: "25px" }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        Complaints Management
      </Typography>

      <Tabs value={tab} onChange={(e, newTab) => setTab(newTab)} sx={{ mb: 3 }}>
        <Tab label="Pending Complaints" />
        <Tab label="Complaint History" />
      </Tabs>

      {/* ================== PENDING SECTION ================== */}
      {tab === 0 && (
        <Grid container spacing={3}>
          {pending.length === 0 && (
            <Typography sx={{ ml: 2, opacity: 0.6 }}>
              No pending complaints
            </Typography>
          )}

          {pending.map((c) => (
            <Grid item xs={12} md={6} key={c.report_id}>
              <Card sx={{ borderRadius: "14px", boxShadow: 3 }}>
                <CardContent>
                  <Typography><b>User:</b> {c.user_name}</Typography>
                  <Typography><b>Complaint:</b> {c.description}</Typography>

                  <Typography sx={{ mt: 1, opacity: 0.6, fontSize: "12px" }}>
                    {new Date(c.date).toLocaleString()}
                  </Typography>

                  {/* Reply Input */}
                  <TextField
                    label="Write reply..."
                    multiline
                    fullWidth
                    rows={2}
                    sx={{ mt: 2 }}
                    value={replyText[c.report_id] || ""}
                    onChange={(e) =>
                      setReplyText({
                        ...replyText,
                        [c.report_id]: e.target.value,
                      })
                    }
                  />

                  <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    fullWidth
                    onClick={() => handleReply(c.report_id)}
                  >
                    Send Reply
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* ================== HISTORY SECTION ================== */}
      {tab === 1 && (
        <Grid container spacing={3}>
          {history.length === 0 && (
            <Typography sx={{ ml: 2, opacity: 0.6 }}>
              No previous complaints
            </Typography>
          )}

          {history.map((c) => (
            <Grid item xs={12} md={6} key={c.report_id}>
              <Card sx={{ borderRadius: "14px", boxShadow: 3 }}>
                <CardContent>
                  <Typography><b>User:</b> {c.user_name}</Typography>
                  <Typography><b>Complaint:</b> {c.description}</Typography>
                  <Typography><b>Status:</b> {c.status}</Typography>

                  {c.admin_reply && (
                    <Typography sx={{ mt: 1 }}>
                      <b>Admin Reply:</b> {c.admin_reply}
                    </Typography>
                  )}

                  <Typography sx={{ opacity: 0.6, fontSize: "12px", mt: 1 }}>
                    {new Date(c.date).toLocaleString()}
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

export default AdminComplaints;
