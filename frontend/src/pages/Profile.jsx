import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ padding: "40px" }}>
      <Typography variant="h4" sx={{ mb: 3 }}>My Profile</Typography>

      <Card sx={{ borderRadius: "14px", boxShadow: 3 }}>
        <CardContent>
          <Typography><b>Name:</b> {user.name}</Typography>
          <Typography><b>Email:</b> {user.email}</Typography>
          <Typography><b>Phone:</b> {user.phone || "N/A"}</Typography>
          <Typography><b>Room:</b> {user.room || "N/A"}</Typography>

          <Button
            variant="contained"
            color="error"
            sx={{ mt: 3 }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Profile;
