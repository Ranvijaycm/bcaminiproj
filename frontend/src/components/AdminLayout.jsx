import { Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Toolbar,
  Typography,
  Divider
} from "@mui/material";

// MUI ICONS
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PaymentsIcon from "@mui/icons-material/Payments";
import ReportIcon from "@mui/icons-material/Report";
import LogoutIcon from "@mui/icons-material/Logout";

function AdminLayout() {
  const navigate = useNavigate();

  const menu = [
    { label: "Dashboard", path: "/admin/dashboard", icon: <DashboardIcon /> },
    { label: "Requests", path: "/admin/requests", icon: <AssignmentIcon /> },
    { label: "Payments", path: "/admin/payments", icon: <PaymentsIcon /> },
    { label: "Complaints", path: "/admin/complaints", icon: <ReportIcon /> },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* ==== SIDEBAR ==== */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            background: "#1e1e1e",
            color: "white",
            paddingTop: "20px",
          },
        }}
      >
        {/* ADMIN PANEL TITLE */}
        <Typography
          sx={{
            fontSize: "22px",
            fontWeight: "700",
            textAlign: "center",
            mb: 2,
          }}
        >
          ADMIN PANEL
        </Typography>

        <Divider sx={{ borderColor: "gray", mb: 2 }} />

        <List>
          {menu.map((item) => (
            <ListItemButton
              key={item.path}
              onClick={() => navigate(item.path)}
              sx={{
                mb: 1,
                "&:hover": { background: "#333" },
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}

          {/* LOGOUT BUTTON */}
          <ListItemButton
            onClick={() => {
              localStorage.removeItem("adminToken");
              window.location.href = "/admin-login";
            }}
            sx={{
              mt: 4,
              color: "red",
              "&:hover": { background: "#330000" },
            }}
          >
            <ListItemIcon sx={{ color: "red" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Drawer>

      {/* ==== MAIN CONTENT AREA ==== */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 3,
          ml: "240px",
        }}
      >
        <Toolbar />

        {/* CENTER PAGE TITLES BETTER */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default AdminLayout;
