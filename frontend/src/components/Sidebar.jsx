import { Drawer, Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";


import HomeIcon from "@mui/icons-material/Home";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ChatIcon from "@mui/icons-material/Chat";
import PhoneIcon from "@mui/icons-material/Phone";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 220;

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Dynamic username
  const username = localStorage.getItem("userName") || "Student User";

  const [showToll, setShowToll] = useState(false);
  const [dateTime, setDateTime] = useState({ date: "", time: "" });

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
    localStorage.clear();
    navigate("/login");
  }

  // Highlight active menu item
  const activeStyle = (path) => ({
    backgroundColor: location.pathname === path ? "#e5f1ff" : "transparent",
    borderRadius: "8px",
    padding: "8px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    textDecoration: "none",
    color: "black",
    fontWeight: location.pathname === path ? "600" : "400",
    transition: "0.2s",
  });

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          // paddingTop: "80px",
          paddingLeft: "14px",
          paddingRight: "10px",
        },
      }}
    >
      {/* TOP SECTION */}
      <Box sx={{ display: "flex", flexDirection: "column"}}>

        {/* PROFILE SECTION */}
<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
  
  {/* Avatar using first letter of username */}
  <Avatar
    sx={{
      width: 42,
      height: 42,
      bgcolor: "#1976d2",
      fontSize: "18px",
      fontWeight: 600
    }}
  >
    {username.charAt(0)}
  </Avatar>

  {/* Username + Date + Time */}
  <Box>
    <Typography sx={{ fontSize: "18px", fontWeight: 700 }}>
      {username}
    </Typography>

    <Typography sx={{ fontSize: "11px", opacity: 0.6 }}>
      {dateTime.date}
    </Typography>

    <Typography sx={{ fontSize: "13px", fontWeight: 600, opacity: 0.85 }}>
      {dateTime.time}
    </Typography>
  </Box>

</Box>




        {/* HOME */}
        <Link to="/home" style={activeStyle("/home")}>
          <HomeIcon />
          <span>Home</span>
        </Link>

        {/* HELP */}
        <Link to="/help" style={activeStyle("/help")}>
          <HelpOutlineIcon />
          <span>Help</span>
        </Link>

        {/* TOLLFREE */}
        <Box
          onClick={() => setShowToll(!showToll)}
          sx={activeStyle("toll")}
        >
          <PhoneIcon />
          <span>Tollfree</span>
        </Box>

        {showToll && (
          <Typography sx={{ paddingLeft: "40px", fontSize: "14px" }}>
            1234567890
          </Typography>
        )}

        {/* SUGGESTIONS */}
        <Link to="/suggestions" style={activeStyle("/suggestions")}>
          <ChatIcon />
          <span>Suggestions</span>
        </Link>
      </Box>
      {/* COMPLAINTS */}
<Link to="/complaints" style={activeStyle("/complaints")}>
  <ChatIcon />
  <span>Complaints</span>
</Link>


      {/* SPACER */}
      <Box sx={{ flexGrow: 1 }} />
      {/* LOGOUT BUTTON */}
<Box sx={{ textAlign: "center", paddingBottom: "20px" }}>
  <Button
    onClick={handleLogout}
    sx={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      color: "black",
      textTransform: "none",
      fontSize: "15px",
    }}
  >
    <LogoutIcon />
    Logout
  </Button>
</Box>


      
    </Drawer>
  );
}
