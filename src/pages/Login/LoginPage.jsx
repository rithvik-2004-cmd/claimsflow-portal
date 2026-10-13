import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          elevation={0}
          sx={{
            width: "100%",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 4,
          }}
        >
          <CardContent sx={{ p: 5 }}>
            <Stack spacing={4}>
              <Stack
                spacing={2}
                alignItems="center"
                textAlign="center"
              >
                <ShieldCheck size={40} />

                <Typography
                  variant="h4"
                  fontWeight={700}
                >
                  Welcome Back
                </Typography>

                <Typography color="text.secondary">
                  Sign in to access the M&M Insurance Portal
                </Typography>
              </Stack>

              <TextField
                fullWidth
                label="Email Address"
                placeholder="john.doe@email.com"
              />

              <TextField
                fullWidth
                type="password"
                label="Password"
              />

              <Button
                component={Link}
                to="/app/dashboard"
                variant="contained"
                size="large"
              >
                Sign In
              </Button>

              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                Demo login for frontend showcase.
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}