import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, CardContent, Typography, TextField, Button, Stack } from "@mui/material";

function Suggestion() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const userName = localStorage.getItem("userName") || "User";
  const userId = localStorage.getItem("userId");

  // Fetch suggestions for this user
  async function fetchSuggestions() {
    try {
      const res = await axios.get(`http://localhost:5000/api/suggestions/user/${userId}`);
      setSuggestions(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (userId) fetchSuggestions();
  }, [userId]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!message.trim()) {
      setStatus("Please write a suggestion before submitting.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/suggestions", {
        user_id: userId,
        message,
      });

      setStatus(res.data.message);
      setMessage("");
      fetchSuggestions(); // refresh list
    } catch (err) {
      console.error(err);
      setStatus(err.response?.data?.message || "Failed to submit suggestion");
    }
  }

  return (
    <Box sx={{ paddingTop: "80px", paddingX: "20px" }}>
      {/* FORM CARD */}
      <Card sx={{ maxWidth: 700, margin: "auto", mb: 4, borderRadius: "12px", boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, textAlign: "center" }}>
            Suggestions Box
          </Typography>

          <Typography sx={{ mb: 2, textAlign: "center", opacity: 0.7 }}>
            Share your feedback or ideas. Your username will appear with your suggestion.
          </Typography>

          {status && (
            <Typography
              sx={{
                textAlign: "center",
                mb: 2,
                color: status.toLowerCase().includes("success") ? "green" : "red",
              }}
            >
              {status}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Your suggestion"
              multiline
              rows={4}
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 2, display: "block", ml: "auto", mr: "auto" }}
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* LIST CARD */}
      <Card sx={{ maxWidth: 700, margin: "auto", borderRadius: "12px", boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Your Suggestions
          </Typography>

          {suggestions.length === 0 ? (
            <Typography sx={{ opacity: 0.7 }}>No suggestions submitted yet.</Typography>
          ) : (
            <Stack spacing={2}>
              {suggestions.map((s) => (
                <Box
                  key={s.id}
                  sx={{
                    padding: "10px 12px",
                    borderRadius: "8px",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    {userName}
                  </Typography>
                  <Typography sx={{ mt: 0.5 }}>{s.message}</Typography>
                  <Typography sx={{ mt: 0.5, fontSize: "12px", opacity: 0.7 }}>
                    {new Date(s.created_at).toLocaleString()}
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

export default Suggestion;
