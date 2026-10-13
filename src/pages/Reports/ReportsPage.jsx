import {
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

const kpis = [
  {
    label: "Total Claims",
    value: "248",
  },
  {
    label: "Approved Claims",
    value: "189",
  },
  {
    label: "Pending Claims",
    value: "41",
  },
  {
    label: "Settlement Amount",
    value: "₹24.8L",
  },
];

export default function ReportsPage() {
  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4" fontWeight={700}>
          Reports & Analytics
        </Typography>

        <Typography color="text.secondary">
          Overview of claims performance and settlement metrics.
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        {kpis.map((item) => (
          <Grid
            item
            xs={12}
            md={3}
            key={item.label}
          >
            <Card>
              <CardContent>
                <Stack spacing={1}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {item.label}
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight={700}
                  >
                    {item.value}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card>
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
          >
            Claims Trend
          </Typography>

          <Typography color="text.secondary">
            Analytics charts and reporting integrations will
            be connected once backend services are available.
          </Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
          >
            Settlement Summary
          </Typography>

          <Typography color="text.secondary">
            Settlement performance metrics, approval ratios
            and claim category breakdowns will appear here.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
}