import { Drawer, Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const drawerWidth = 200;

export default function Sidebar() {
  const navigate = useNavigate();

  // TEMP username — later replace with backend data
  const username = "Student User";

  const [showToll, setShowToll] = useState(false);
  const [dateTime, setDateTime] = useState({ date: "", time: "" });

  // Live date + time
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setDateTime({
        date: now.toLocaleDateString("en-IN"),
        time: now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function handleLogout() {
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
          paddingTop: "70px",
          paddingLeft: "12px",
        },
      }}
    >
      {/* TOP SECTION */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
          {username}
        </Typography>

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

        <Typography
          sx={{ fontSize: "16px", cursor: "pointer" }}
          onClick={() => setShowToll(!showToll)}
        >
          TOLLFREE
        </Typography>

        {showToll && (
          <Typography sx={{ fontSize: "14px", paddingLeft: "10px" }}>
            1234567890
          </Typography>
        )}

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

      {/* SPACER */}
      <Box sx={{ flexGrow: 1 }} />

      {/* BOTTOM SECTION */}
      <Box sx={{ textAlign: "center", paddingBottom: "20px" }}>
        <Typography sx={{ fontSize: "15px" }}>{dateTime.date}</Typography>
        <Typography sx={{ fontSize: "15px", marginBottom: "12px" }}>
          {dateTime.time}
        </Typography>

        <Button
          sx={{
            textTransform: "none",
            color: "black",
            fontSize: "15px",
          }}
          onClick={handleLogout}
        >
          Logout ☰
        </Button>
      </Box>
    </Drawer>
  );
}
