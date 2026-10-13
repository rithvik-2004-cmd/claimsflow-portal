import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowRight, Shield } from "lucide-react";

const policies = [
  {
    id: "POL-100234",
    name: "Motor Insurance",
    status: "Active",
  },
  {
    id: "POL-882341",
    name: "Health Insurance",
    status: "Active",
  },
  {
    id: "POL-562122",
    name: "Property Insurance",
    status: "Active",
  },
];

const steps = [
  "Select Policy",
  "Incident Details",
  "Review & Submit",
];

export default function NewClaimPage() {
  const [selectedPolicy, setSelectedPolicy] =
    useState(null);

  return (
    <Stack
      spacing={4}
      sx={{
        maxWidth: 1200,
        mx: "auto",
        width: "100%",
      }}
    >
      <Stack spacing={1}>
        <Typography
          variant="h4"
          fontWeight={700}
        >
          New Claim
        </Typography>

        <Typography color="text.secondary">
          Create a new insurance claim by selecting an
          active policy and providing incident details.
        </Typography>
      </Stack>

      <Card
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 4,
        }}
      >
        <CardContent sx={{ py: 4 }}>
          <Stepper 
            activeStep={0}
            alternativeLabel
            sx={{
            '& .MuiStepLabel-label': {
                mt: 1,
                textAlign: 'center',
            },
            }}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>

      <Card
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 4,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={4}>
            <Stack spacing={1}>
              <Typography
                variant="h5"
                fontWeight={700}
              >
                Select Policy & Claim Type
              </Typography>

              <Typography color="text.secondary">
                Choose the policy under which you wish to
                raise a claim.
              </Typography>
            </Stack>

            <Grid container spacing={3}>
              {policies.map((policy) => (
                <Grid
                  item
                  xs={12}
                  md={4}
                  key={policy.id}
                >
                  <Card
                    onClick={() =>
                      setSelectedPolicy(policy.id)
                    }
                    sx={{
                      cursor: "pointer",
                      border:
                        selectedPolicy === policy.id
                          ? "2px solid #1976d2"
                          : "1px solid #e0e0e0",
                      borderRadius: 3,
                      transition: "0.2s",

                      "&:hover": {
                        transform:
                          "translateY(-4px)",
                        boxShadow: 3,
                      },
                    }}
                  >
                    <CardContent>
                      <Stack spacing={2}>
                        <Shield size={24} />

                        <Typography
                          variant="h6"
                          fontWeight={600}
                        >
                          {policy.name}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {policy.id}
                        </Typography>

                        <Chip
                          label={policy.status}
                          color="success"
                          size="small"
                          sx={{
                            width: "fit-content",
                          }}
                        />
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <TextField
              select
              fullWidth
              label="Claim Type"
              SelectProps={{
                native: true,
              }}
            >
              <option>
                Motor - Accident, theft or damage
              </option>
              <option>
                Health - Hospitalization claim
              </option>
              <option>
                Property - Damage claim
              </option>
            </TextField>

            <Box>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowRight size={18} />}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                }}
              >
                Continue to Incident Details
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}