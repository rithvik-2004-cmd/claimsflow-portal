import {
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

const timeline = [
  {
    title: "Claim Submitted",
    status: "Completed",
    date: "10 Oct 2026",
  },
  {
    title: "Documents Verified",
    status: "Completed",
    date: "11 Oct 2026",
  },
  {
    title: "Claim Review",
    status: "In Progress",
    date: "12 Oct 2026",
  },
  {
    title: "Settlement Approval",
    status: "Pending",
    date: "-",
  },
];

export default function ClaimTrackingPage() {
  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4" fontWeight={700}>
          Claim Tracking
        </Typography>

        <Typography color="text.secondary">
          Monitor the progress of your claim from submission to settlement.
        </Typography>
      </Stack>

      <Card>
        <CardContent>
          <Stack spacing={3}>
            {timeline.map((item, index) => (
              <div key={item.title}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack spacing={0.5}>
                    <Typography fontWeight={600}>
                      {item.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {item.date}
                    </Typography>
                  </Stack>

                  <Chip
                    label={item.status}
                    color={
                      item.status === "Completed"
                        ? "success"
                        : item.status === "In Progress"
                        ? "warning"
                        : "default"
                    }
                  />
                </Stack>

                {index !== timeline.length - 1 && (
                  <Divider sx={{ mt: 2 }} />
                )}
              </div>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}