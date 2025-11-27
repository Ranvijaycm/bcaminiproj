import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Stack
} from "@mui/material";

function Laundry() {
  const userId = localStorage.getItem("userId");

  const [clothes, setClothes] = useState("");
  const [notes, setNotes] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  const [latest, setLatest] = useState(null);
  const [history, setHistory] = useState([]);

  // Fetch latest status
  const fetchLatest = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/laundry/latest/${userId}`
      );
      setLatest(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch full history
  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/laundry/history/${userId}`
      );
      setHistory(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLatest();
    fetchHistory();
  }, []);

  // Submit laundry request
  const submitLaundry = async () => {
    if (!clothes.trim()) {
      setStatusMsg("Enter number of clothes!");
      return;
    }

    try {
      const details = `Clothes: ${clothes} | Notes: ${notes}`;

      const res = await axios.post("http://localhost:5000/api/laundry/request", {
        user_id: userId,
        details,
      });

      setStatusMsg(res.data.message);
      setClothes("");
      setNotes("");

      // Refresh both
      fetchLatest();
      fetchHistory();
    } catch (err) {
      console.error(err);
      setStatusMsg("Failed to send request");
    }
  };

  return (
    <Box sx={{ paddingTop: "80px", paddingX: "25px" }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Laundry Request
      </Typography>

      <Card sx={{ maxWidth: 600, padding: 3, borderRadius: "14px", boxShadow: 3 }}>
        <CardContent>
          {statusMsg && (
            <Typography sx={{ mb: 2, fontWeight: "bold", color: "green" }}>
              {statusMsg}
            </Typography>
          )}

          <TextField
            label="Number of Clothes"
            fullWidth
            sx={{ mb: 2 }}
            value={clothes}
            onChange={(e) => setClothes(e.target.value)}
          />

          <TextField
            label="Additional Notes"
            fullWidth
            multiline
            rows={3}
            sx={{ mb: 2 }}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <Button variant="contained" fullWidth onClick={submitLaundry}>
            Submit Request
          </Button>
        </CardContent>
      </Card>

      {/* Latest Status */}
      <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
        Latest Laundry Status
      </Typography>

      {latest && latest.request_id ? (
        <Card sx={{ maxWidth: 600, padding: 2, borderRadius: "14px", boxShadow: 3 }}>
          <CardContent>
            <Typography><b>Details:</b> {latest.details}</Typography>
            <Typography><b>Status:</b> {latest.status}</Typography>
            <Typography sx={{ fontSize: "12px", opacity: 0.7 }}>
              {new Date(latest.request_date).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography>No previous requests found.</Typography>
      )}

      {/* FULL HISTORY */}
      <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
        Laundry History
      </Typography>

      <Stack spacing={2}>
        {history.map((item) => (
          <Card key={item.request_id} sx={{ padding: 2, borderRadius: "14px", boxShadow: 1 }}>
            <Typography><b>Details:</b> {item.details}</Typography>
            <Typography><b>Status:</b> {item.status}</Typography>
            <Typography sx={{ fontSize: "12px", opacity: 0.7 }}>
              {new Date(item.request_date).toLocaleString()}
            </Typography>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}

export default Laundry;
