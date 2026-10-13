import {
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

const steps = [
  {
    title: "1. Submit Claim",
    description:
      "Create a new claim and provide incident details.",
  },
  {
    title: "2. Upload Documents",
    description:
      "Attach supporting documents and evidence.",
  },
  {
    title: "3. Verification",
    description:
      "Claims team reviews documents and validates information.",
  },
  {
    title: "4. Assessment",
    description:
      "Claim is assessed according to policy coverage.",
  },
  {
    title: "5. Approval",
    description:
      "Settlement approval decision is communicated.",
  },
  {
    title: "6. Settlement",
    description:
      "Approved amount is transferred to the registered account.",
  },
];

export default function ClaimsProcessGuidePage() {
  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4" fontWeight={700}>
          Claims Process Guide
        </Typography>

        <Typography color="text.secondary">
          Understand the complete claim journey from submission to settlement.
        </Typography>
      </Stack>

      <Card>
        <CardContent>
          <Stack spacing={3}>
            {steps.map((step, index) => (
              <div key={step.title}>
                <Typography
                  variant="h6"
                  fontWeight={600}
                >
                  {step.title}
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {step.description}
                </Typography>

                {index !== steps.length - 1 && (
                  <Divider sx={{ mt: 3 }} />
                )}
              </div>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}