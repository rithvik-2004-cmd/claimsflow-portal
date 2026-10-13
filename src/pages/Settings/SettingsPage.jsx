import {
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

export default function SettingsPage() {
  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4" fontWeight={700}>
          Settings
        </Typography>

        <Typography color="text.secondary">
          Configure application and notification preferences.
        </Typography>
      </Stack>

      <Card>
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
          >
            Notifications
          </Typography>

          <Stack spacing={2}>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Email Notifications"
            />

            <FormControlLabel
              control={<Switch defaultChecked />}
              label="SMS Notifications"
            />

            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Claim Status Updates"
            />
          </Stack>

          <Divider sx={{ my: 3 }} />

          <Typography
            variant="h6"
            gutterBottom
          >
            Accessibility
          </Typography>

          <Stack spacing={2}>
            <FormControlLabel
              control={<Switch />}
              label="High Contrast Mode"
            />

            <FormControlLabel
              control={<Switch />}
              label="Reduced Motion"
            />
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
