import { Drawer, Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const drawerWidth = 200;

export default function Sidebar() {
  const navigate = useNavigate();

  // TEMP — replace with backend user data later
  const username = "Ranvijay";

  const [showTollFree, setShowTollFree] = useState(false);

  const [dateTime, setDateTime] = useState({ date: "", time: "" });

  // Live Date & Time
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const date = now.toLocaleDateString("en-IN");
      const time = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setDateTime({ date, time });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Logout function
  function handleLogout() {
    // later: clear tokens, cookies, backend session
    navigate("/login");
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          paddingTop: "40px",
          paddingLeft: "12px",
          backgroundColor: "#fafafa",
        },
      }}
    >
      {/* TOP SECTION */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* DYNAMIC USERNAME */}
        <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
          {username}
        </Typography>

        {/* HELP */}
        <Typography
          component={Link}
          to="/help"
          sx={{
            fontSize: "16px",
            textDecoration: "none",
            color: "black",
            cursor: "pointer",
          }}
        >
          HELP
        </Typography>

        {/* TOLL FREE */}
        <Typography
          onClick={() => setShowTollFree(!showTollFree)}
          sx={{
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          TOLLFREE
        </Typography>

        {/* TOLL FREE NUMBER */}
        {showTollFree && (
          <Typography
            sx={{
              fontSize: "14px",
              opacity: 0.8,
              paddingLeft: "10px",
            }}
          >
            1234567890
          </Typography>
        )}

        {/* SUGGESTIONS */}
        <Typography
          component={Link}
          to="/suggestions"
          sx={{
            fontSize: "16px",
            textDecoration: "none",
            color: "black",
            cursor: "pointer",
          }}
        >
          SUGGESTIONS
        </Typography>
      </Box>

      {/* SPACE FLEX */}
      <Box sx={{ flexGrow: 1 }} />

      {/* BOTTOM SECTION: DATE + TIME + LOGOUT */}
      <Box
        sx={{
          paddingBottom: "20px",
          textAlign: "center",
          width: "100%",
        }}
      >
        <Typography sx={{ fontSize: "15px" }}>{dateTime.date}</Typography>
        <Typography sx={{ fontSize: "15px", mb: 2 }}>{dateTime.time}</Typography>

        <Button
          onClick={handleLogout}
          variant="text"
          sx={{
            color: "black",
            fontSize: "15px",
            textTransform: "none",
          }}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
}
