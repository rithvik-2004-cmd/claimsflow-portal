import {
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  TextField,
  Button,
} from "@mui/material";

export default function ProfilePage() {
  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4" fontWeight={700}>
          Profile
        </Typography>

        <Typography color="text.secondary">
          Manage personal information and account details.
        </Typography>
      </Stack>

      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="First Name"
                defaultValue="John"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Last Name"
                defaultValue="Doe"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                defaultValue="john.doe@email.com"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                defaultValue="+91 9876543210"
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            sx={{ mt: 3 }}
          >
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </Stack>
  );
}