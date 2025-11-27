import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, CardContent, Typography, Button, Grid } from "@mui/material";

function Tiffin() {
  const [providers, setProviders] = useState([]);
  const [status, setStatus] = useState("");
  const [currentSub, setCurrentSub] = useState(null);

  const userId = localStorage.getItem("userId");

  // Fetch all tiffin providers
  const fetchProviders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tiffin/providers");
      setProviders(res.data);
    } catch (err) {
      console.error(err);
      setStatus("Failed to load tiffin plans.");
    }
  };

  // Fetch current subscription
  const fetchCurrentSubscription = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/tiffin/my/${userId}`
      );
      setCurrentSub(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Subscribe user to a plan
  const handleSubscribe = async (tiffin_id) => {
    try {
      const res = await axios.post("http://localhost:5000/api/tiffin/subscribe", {
        user_id: userId,
        tiffin_id,
      });

      setStatus(res.data.message);

      // Refresh subscription
      fetchCurrentSubscription();
    } catch (err) {
      console.error(err);
      setStatus("Subscription failed.");
    }
  };

  useEffect(() => {
    fetchProviders();
    fetchCurrentSubscription();
  }, []);

  return (
    <Box sx={{ paddingTop: "80px", paddingX: "25px" }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        Tiffin Service Plans
      </Typography>

      {status && (
        <Typography sx={{ mb: 2, color: "green", fontWeight: "bold" }}>
          {status}
        </Typography>
      )}

      {/* ⭐ CURRENT SUBSCRIPTION ⭐ */}
      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
        My Current Tiffin Subscription
      </Typography>

      {currentSub && currentSub.request_id ? (
        <Button
          variant="outlined"
          fullWidth
          sx={{
            borderRadius: "14px",
            padding: "15px",
            justifyContent: "flex-start",
            textAlign: "left",
            borderWidth: "2px",
            maxWidth: 600,
            mb: 3
          }}
        >
          <Box>
            <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
              {currentSub.provider_name}
            </Typography>

            <Typography sx={{ opacity: 0.7 }}>
              Meal Type: {currentSub.meal_type.replace("_", " ")}
            </Typography>

            <Typography sx={{ opacity: 0.7 }}>
              Price: ₹{currentSub.price}
            </Typography>

            <Typography sx={{ fontWeight: "bold", mt: 1 }}>
              Status: {currentSub.status}
            </Typography>

            <Typography sx={{ fontSize: "12px", opacity: 0.6 }}>
              {new Date(currentSub.request_date).toLocaleString()}
            </Typography>
          </Box>
        </Button>
      ) : (
        <Typography sx={{ opacity: 0.7 }}>No active subscription.</Typography>
      )}

      {/* ⭐ AVAILABLE PLANS ⭐ */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {providers.map((p) => (
          <Grid item xs={12} sm={6} md={3} key={p.tiffin_id}>
            <Card sx={{ borderRadius: "14px", boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {p.provider_name}
                </Typography>

                <Typography sx={{ opacity: 0.7 }}>{p.description}</Typography>

                <Typography sx={{ mt: 1, fontWeight: "bold" }}>
                  ₹{p.price}
                </Typography>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => handleSubscribe(p.tiffin_id)}
                >
                  Subscribe
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Tiffin;
