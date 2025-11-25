import { Box, Typography, Button, Stack, Card, CardContent } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";

function Home() {
  return (
    <Box
      sx={{
        paddingTop: "80px", // so text doesn't hide behind navbar
        width: "100%",
        textAlign: "center",
      }}
    >
      {/* HEADER */}
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
        Welcome to MyNest
      </Typography>

      <Typography variant="subtitle1" sx={{ mb: 5, opacity: 0.8 }}>
        Your daily essentials – all in one place.
      </Typography>

      {/* MAIN GRID */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-start",
          width: "100%",
          paddingX: "40px",
          marginTop: "40px",
        }}
      >
        {/* SERVICES */}
        <Box sx={{ width: "30%" }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
            SERVICES
          </Typography>

          <Stack spacing={2} alignItems="center">
            <Button
              variant="contained"
              startIcon={<RestaurantIcon />}
              sx={{
                width: "200px",
                background: "#4D8EFF",
                ":hover": { background: "#2C6BE0" },
              }}
            >
              Tiffin Service
            </Button>

            <Button
              variant="contained"
              startIcon={<ReportProblemIcon />}
              sx={{
                width: "200px",
                background: "#FFA93A",
                ":hover": { background: "#FF8F00" },
              }}
            >
              Complaints
            </Button>

            <Button
              variant="contained"
              startIcon={<MiscellaneousServicesIcon />}
              sx={{
                width: "200px",
                background: "#9C6BFF",
                ":hover": { background: "#7A47E6" },
              }}
            >
              Request Services
            </Button>
          </Stack>
        </Box>

        {/* PAYMENTS */}
        <Box sx={{ width: "30%" }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
            PAYMENTS
          </Typography>

          <Card
            sx={{
              padding: "20px",
              borderRadius: "12px",
              boxShadow: 3,
              textAlign: "center",
            }}
          >
            <Typography variant="subtitle1">Status of latest payment</Typography>

            <Typography
              sx={{ mt: 1, fontWeight: "bold", color: "red", fontSize: "20px" }}
            >
              PENDING ⏳
            </Typography>
          </Card>
        </Box>

        {/* MY COMPLAINTS */}
        <Box sx={{ width: "30%" }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
            MY COMPLAINTS
          </Typography>

          <Card
            sx={{
              padding: "20px",
              borderRadius: "12px",
              boxShadow: 3,
              textAlign: "center",
            }}
          >
            <Typography>No complaints submitted yet</Typography>
          </Card>
        </Box>
      </Box>

      {/* BIG LOGO BACKGROUND */}
      <Box
        component="img"
        src="/mynest_bg.png"
        alt="MyNest Logo"
        sx={{
          width: "500px",
          opacity: 0.15,
          margin: "50px auto 0",
          display: "block",
        }}
      />
    </Box>
  );
}

export default Home;
