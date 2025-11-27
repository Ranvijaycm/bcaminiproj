import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Card, CardContent, TextField, Button } from "@mui/material";

function RoomCleaning() {
  const [roomNo, setRoomNo] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState("");
  const [latest, setLatest] = useState(null);

  const userId = localStorage.getItem("userId");

  // Fetch latest room cleaning record
  const fetchLatest = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/room/latest/${userId}`);
      setLatest(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Submit room cleaning request
  const handleSubmit = async () => {
    if (!roomNo.trim() || !details.trim()) {
      setStatus("Please fill all fields.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/room/request", {
        user_id: userId,
        details: `Room ${roomNo}: ${details}`,
      });

      setStatus(res.data.message);
      setRoomNo("");
      setDetails("");

      fetchLatest(); // Refresh latest request

    } catch (err) {
      console.error(err);
      setStatus("Failed to submit room cleaning request.");
    }
  };

  useEffect(() => {
    fetchLatest();
  }, []);

  return (
    <Box sx={{ paddingTop: "80px", paddingX: "25px" }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Room Cleaning Request
      </Typography>

      {status && (
        <Typography sx={{ mb: 2, color: "green" }}>{status}</Typography>
      )}

      {/* Latest Request Section */}
      <Typography variant="h6" sx={{ mb: 1 }}>
        Latest Request
      </Typography>

      {latest && latest.request_id ? (
        <Card sx={{ maxWidth: 600, padding: 2, borderRadius: "14px", boxShadow: 3, mb: 3 }}>
          <CardContent>
            <Typography><b>Details:</b> {latest.details}</Typography>
            <Typography><b>Status:</b> {latest.status}</Typography>
            <Typography sx={{ fontSize: "12px", opacity: 0.7 }}>
              {new Date(latest.request_date).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography sx={{ opacity: 0.7 }}>No room requests submitted yet.</Typography>
      )}

      {/* Create New Request Form */}
      <Card sx={{ maxWidth: 600, padding: 3, borderRadius: "14px", boxShadow: 3 }}>
        <CardContent>

          <TextField
            label="Room Number"
            fullWidth
            value={roomNo}
            onChange={(e) => setRoomNo(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Cleaning Details"
            multiline
            rows={3}
            fullWidth
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button variant="contained" fullWidth onClick={handleSubmit}>
            Submit Request
          </Button>

        </CardContent>
      </Card>
    </Box>
  );
}

export default RoomCleaning;
