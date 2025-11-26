import { Box, Card, CardContent, Typography, List, ListItem } from "@mui/material";

function Help() {
  return (
    <Box sx={{ paddingTop: "80px", paddingX: "20px" }}>
      
      <Card sx={{ maxWidth: 800, margin: "auto", boxShadow: 3, borderRadius: "12px" }}>
        <CardContent>
          <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ mb: 3 }}>
            Help & Support
          </Typography>

          <Typography variant="subtitle1" sx={{ opacity: 0.7, mb: 3, textAlign: "center" }}>
            Learn how to use the MyNest app effectively.
          </Typography>

          <List sx={{ mt: 2 }}>
            <ListItem>
              ➤ <strong style={{ marginLeft: "8px" }}>Signup:</strong> Create your account using name, email & password.
            </ListItem>

            <ListItem>
              ➤ <strong style={{ marginLeft: "8px" }}>Login:</strong> Use your registered email & password to access the dashboard.
            </ListItem>

            <ListItem>
              ➤ <strong style={{ marginLeft: "8px" }}>Tiffin Service:</strong> View meal plans and request services.
            </ListItem>

            <ListItem>
              ➤ <strong style={{ marginLeft: "8px" }}>Complaints:</strong> Submit any issues for admin review.
            </ListItem>

            <ListItem>
              ➤ <strong style={{ marginLeft: "8px" }}>Payment Status:</strong> Track your tiffin or service payments.
            </ListItem>

            <ListItem>
              ➤ <strong style={{ marginLeft: "8px" }}>Suggestions:</strong> Share ideas to improve MyNest.
            </ListItem>

            <ListItem>
              ➤ <strong style={{ marginLeft: "8px" }}>Logout:</strong> Safely exit your account anytime.
            </ListItem>
          </List>

          <Typography
            variant="body2"
            sx={{ textAlign: "center", marginTop: "20px", opacity: 0.6 }}
          >
            For further support, contact admin office.
          </Typography>

        </CardContent>
      </Card>
    </Box>
  );
}

export default Help;
