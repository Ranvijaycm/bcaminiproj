import { AppBar, Toolbar, Typography } from "@mui/material";

function Navbar() {
  return (
    <AppBar position="fixed" sx={{ background: "#1976d2" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          MyNest
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
