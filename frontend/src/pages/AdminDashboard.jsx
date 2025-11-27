import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PaymentIcon from "@mui/icons-material/Payment";
import ReportIcon from "@mui/icons-material/Report";

function AdminDashboard() {
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/dashboard");
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // 🟦 Dashboard Stat Card Component
  const StatCard = ({ title, value, color, icon, route }) => (
    <Card
      onClick={() => (window.location.href = route)}
      sx={{
        borderRadius: "18px",
        boxShadow: 4,
        cursor: "pointer",
        transition: "0.25s",
        p: 1,
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 8,
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            sx={{
              bgcolor: color,
              color: "white",
              width: 48,
              height: 48,
              borderRadius: "12px",
              "&:hover": { bgcolor: color },
            }}
          >
            {icon}
          </IconButton>

          <Box>
            <Typography sx={{ fontSize: "15px", opacity: 0.8 }}>
              {title}
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                fontSize: "28px",
                fontWeight: "bold",
                color: color,
              }}
            >
              {value}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ paddingTop: "40px", paddingX: "25px" }}>
      {/* 🔷 Top Title */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "800",
            letterSpacing: "1px",
            color: "#1e293b",
          }}
        >
          Admin Dashboard
        </Typography>
      </Box>

      {!stats ? (
        <Typography sx={{ textAlign: "center" }}>Loading...</Typography>
      ) : (
        <Grid container spacing={3}>
          {/* USERS */}
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Students"
              value={stats.students}
              color="#1565c0"
              icon={<PeopleIcon />}
              route="/admin/users"
            />
          </Grid>

          {/* REQUESTS */}
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Pending Requests"
              value={stats.service_requests}
              color="#f57c00"
              icon={<AssignmentIcon />}
              route="/admin/requests"
            />
          </Grid>

          {/* PAYMENTS */}
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Pending Payments"
              value={stats.payments}
              color="#2e7d32"
              icon={<PaymentIcon />}
              route="/admin/payments"
            />
          </Grid>

          {/* COMPLAINTS */}
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Complaints"
              value={stats.complaints}
              color="#c62828"
              icon={<ReportIcon />}
              route="/admin/complaints"
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default AdminDashboard;
