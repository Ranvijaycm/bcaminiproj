// src/pages/Home.jsx

import { Box, Grid, Card, CardActionArea, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Icons
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

function Home() {
  const navigate = useNavigate();

  // Card Component Function
  const ServiceCard = ({ title, icon, route }) => (
    <Card
      sx={{
        borderRadius: "14px",
        boxShadow: 3,
        transition: "0.25s",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 6,
          cursor: "pointer",
        },
      }}
      onClick={() => navigate(route)}
    >
      <CardActionArea>
        <CardContent sx={{ textAlign: "center", padding: "28px" }}>
          {icon}
          <Typography variant="h6" sx={{ mt: 1, fontWeight: 600 }}>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );

  return (
    <Box sx={{ paddingTop: "80px", paddingX: "25px" }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Welcome to MyNest Dashboard
      </Typography>

      {/* Dashboard Grid */}
      <Grid container spacing={3}>

        <Grid item xs={12} sm={6} md={3}>
          <ServiceCard
            title="Tiffin Service"
            route="/tiffin"
            icon={<DinnerDiningIcon sx={{ fontSize: 50 }} />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <ServiceCard
            title="Laundry"
            route="/laundry"
            icon={<LocalLaundryServiceIcon sx={{ fontSize: 50 }} />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <ServiceCard
            title="Room Cleaning"
            route="/room"
            icon={<CleaningServicesIcon sx={{ fontSize: 50 }} />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <ServiceCard
            title="Payments"
            route="/payments"
            icon={<MonetizationOnIcon sx={{ fontSize: 50 }} />}
          />
        </Grid>

      </Grid>

      {/* Admin Panel Button */}
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Button
          variant="outlined"
          startIcon={<AdminPanelSettingsIcon />}
          sx={{
            borderRadius: "10px",
            paddingX: "20px",
            paddingY: "8px",
            fontSize: "15px",
            textTransform: "none",
            borderColor: "#000",
            color: "#000",
            "&:hover": {
              borderColor: "#1565c0",
              color: "#1565c0",
            },
          }}
          onClick={() => navigate("/admin-login")}
        >
          Admin Panel
        </Button>
      </Box>

    </Box>
  );
}

export default Home;
