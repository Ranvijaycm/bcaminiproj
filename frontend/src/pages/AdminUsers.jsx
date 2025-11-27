import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/users");
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Box sx={{ padding: "30px" }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        All Students
      </Typography>

      <Grid container spacing={3}>
        {users.map((u) => (
          <Grid item xs={12} md={6} key={u.user_id}>
            <Card sx={{ borderRadius: "14px", boxShadow: 3 }}>
              <CardContent>
                <Typography><b>Name:</b> {u.name}</Typography>
                <Typography><b>Email:</b> {u.email}</Typography>
                <Typography><b>Phone:</b> {u.phone || "N/A"}</Typography>
                <Typography><b>Role:</b> {u.role}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default AdminUsers;
