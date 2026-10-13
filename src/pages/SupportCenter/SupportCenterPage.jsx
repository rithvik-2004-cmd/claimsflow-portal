import {
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import {
  LifeBuoy,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";

export default function SupportCenterPage() {
  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4" fontWeight={700}>
          Support Center
        </Typography>

        <Typography color="text.secondary">
          Get help with claims, documents, policies and
          account related issues.
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Stack spacing={2}>
                <Phone size={28} />

                <Typography variant="h6">
                  Phone Support
                </Typography>

                <Typography color="text.secondary">
                  +91 1800 123 4567
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Stack spacing={2}>
                <Mail size={28} />

                <Typography variant="h6">
                  Email Support
                </Typography>

                <Typography color="text.secondary">
                  support@M&M Insurance.com
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Stack spacing={2}>
                <MessageSquare size={28} />

                <Typography variant="h6">
                  Live Chat
                </Typography>

                <Typography color="text.secondary">
                  Available 24 × 7
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Stack spacing={3}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <LifeBuoy size={22} />
              <Typography variant="h6">
                Create Support Request
              </Typography>
            </Stack>

            <TextField
              label="Subject"
              fullWidth
            />

            <TextField
              label="Describe your issue"
              multiline
              rows={5}
              fullWidth
            />

            <Button
              variant="contained"
              sx={{
                alignSelf: "flex-start",
              }}
            >
              Submit Request
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}