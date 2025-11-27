// src/pages/Complaints.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Chip,
} from "@mui/material";

function Complaints() {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [complaints, setComplaints] = useState([]);

  const userName = localStorage.getItem("userName") || "User";
  const userId = localStorage.getItem("userId");

  async function fetchComplaints() {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/complaints/user/${userId}`
      );
      setComplaints(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (userId) fetchComplaints();
  }, [userId]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!subject.trim() || !description.trim()) {
      setStatusMsg("Please fill both subject and description.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/complaints", {
        user_id: userId,
        subject,
        description,
      });

      setStatusMsg(res.data.message || "Complaint submitted successfully");
      setSubject("");
      setDescription("");
      fetchComplaints();
    } catch (err) {
      console.error(err);
      setStatusMsg(
        err.response?.data?.message || "Failed to submit complaint"
      );
    }
  }

  const getStatusColor = (status) => {
    if (!status) return "default";
    const s = status.toLowerCase();
    if (s === "resolved" || s === "reviewed") return "success";
    if (s === "pending") return "warning";
    return "default";
  };

  return (
    <Box sx={{ paddingTop: "80px", paddingX: "20px" }}>
      {/* FORM CARD */}
      <Card
        sx={{
          maxWidth: 750,
          margin: "auto",
          mb: 4,
          borderRadius: "12px",
          boxShadow: 3,
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ mb: 2, textAlign: "center" }}
          >
            Submit a Complaint
          </Typography>

          <Typography
            sx={{ mb: 2, textAlign: "center", opacity: 0.7 }}
          >
            Describe your issue clearly so the admin can resolve it quickly.
          </Typography>

          {statusMsg && (
            <Typography
              sx={{
                textAlign: "center",
                mb: 2,
                color: statusMsg.toLowerCase().includes("success")
                  ? "green"
                  : "red",
              }}
            >
              {statusMsg}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Subject"
              fullWidth
              sx={{ mb: 2 }}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <TextField
              label="Complaint Description"
              multiline
              rows={4}
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 2, display: "block", ml: "auto", mr: "auto" }}
            >
              Submit Complaint
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* LIST CARD */}
      <Card
        sx={{
          maxWidth: 750,
          margin: "auto",
          borderRadius: "12px",
          boxShadow: 2,
        }}
      >
        <CardContent>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Your Complaints
          </Typography>

          {complaints.length === 0 ? (
            <Typography sx={{ opacity: 0.7 }}>
              No complaints submitted yet.
            </Typography>
          ) : (
            <Stack spacing={2}>
              {complaints.map((c) => (
                <Box
                  key={c.report_id}
                  sx={{
                    padding: "10px 12px",
                    borderRadius: "8px",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>
                      {userName}
                    </Typography>
                    <Chip
                      label={c.status || "pending"}
                      size="small"
                      color={getStatusColor(c.status)}
                    />
                  </Box>

                  <Typography sx={{ mt: 0.5, fontWeight: 600 }}>
                    {c.subject}
                  </Typography>

                  <Typography sx={{ mt: 0.5 }}>{c.description}</Typography>

                  <Typography
                    sx={{ mt: 0.5, fontSize: "12px", opacity: 0.7 }}
                  >
                    {new Date(c.created_at).toLocaleString()}
                  </Typography>
                </Box>
              ))}
            </Stack>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default Complaints;
