import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import {
  ArrowRight,
  ShieldCheck,
  FileText,
  Bell,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <Box>
      <Container maxWidth="lg">
        <Stack
          spacing={8}
          sx={{
            py: 10,
          }}
        >
          {/* Hero Section */}
          <Stack
            spacing={3}
            alignItems="center"
            textAlign="center"
          >
            <Typography
              variant="h2"
              fontWeight={800}
            >
              M&M Insurance Portal
            </Typography>

            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                maxWidth: 800,
              }}
            >
              Enterprise insurance claims management platform
              designed for fast claim submission, transparent
              tracking, document management and customer support.
            </Typography>

            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button
                component={Link}
                to="/login"
                variant="contained"
                size="large"
                endIcon={<ArrowRight size={18} />}
              >
                Get Started
              </Button>

              <Button
                component={Link}
                to="/app/dashboard"
                variant="outlined"
                size="large"
              >
                Open Portal
              </Button>
            </Stack>
          </Stack>

          {/* Feature Cards Grid */}
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Stack spacing={2} alignItems="center" textAlign="center">
                    <ShieldCheck size={28} />
                    <Typography
                      variant="h6"
                      fontWeight={600}
                    >
                      Secure Claims
                    </Typography>
                    <Typography color="text.secondary">
                      Enterprise-grade claims workflow and
                      policy management.
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Stack spacing={2} alignItems="center" textAlign="center">
                    <FileText size={28} />
                    <Typography
                      variant="h6"
                      fontWeight={600}
                    >
                      Document Uploads
                    </Typography>
                    <Typography color="text.secondary">
                      Upload and manage claim supporting
                      documents easily.
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Stack spacing={2} alignItems="center" textAlign="center">
                    <Bell size={28} />
                    <Typography
                      variant="h6"
                      fontWeight={600}
                    >
                      Live Notifications
                    </Typography>
                    <Typography color="text.secondary">
                      Stay informed about approvals,
                      updates and actions required.
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Stack spacing={2} alignItems="center" textAlign="center">
                    <BarChart3 size={28} />
                    <Typography
                      variant="h6"
                      fontWeight={600}
                    >
                      Analytics
                    </Typography>
                    <Typography color="text.secondary">
                      Monitor claims performance and
                      settlement insights.
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
         
        </Stack>
      </Container>
    </Box>
  );
}