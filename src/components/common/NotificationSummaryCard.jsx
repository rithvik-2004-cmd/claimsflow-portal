import {
  Card,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";

const NotificationSummaryCard = ({
  label,
  value,
  color,
}) => {
  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Stack spacing={1}>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {label}
          </Typography>

          <Typography
            variant="h3"
            fontWeight={700}
            color={color}
          >
            {value}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default NotificationSummaryCard;