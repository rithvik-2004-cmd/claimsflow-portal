import {
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Button,
} from "@mui/material";
import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  Info,
} from "lucide-react";

const getConfig = (type) => {
  switch (type) {
    case "ACTION_REQUIRED":
      return {
        color: "warning",
        icon: <AlertTriangle size={16} />,
      };

    case "APPROVED":
      return {
        color: "success",
        icon: <CheckCircle2 size={16} />,
      };

    default:
      return {
        color: "info",
        icon: <Info size={16} />,
      };
  }
};

const NotificationCard = ({
  notification,
  onMarkRead,
}) => {
  const config = getConfig(notification.type);

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        bgcolor: notification.read
          ? "background.paper"
          : "rgba(25,118,210,0.04)",
        transition: "all 0.2s ease",

        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 3,
        },
      }}
    >
      <CardContent
      sx={{
        py: 2.5,
        px: 3,
      }}>
        <Stack spacing={1.5}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Stack spacing={0.75}>
              <Stack direction="row" spacing={1}>
                <Bell size={18} />

                <Typography
                  variant="h6"
                  fontWeight={notification.read ? 600 : 700}
                >
                  {notification.title}
                </Typography>
              </Stack>

              <Chip
                size="small"
                color={config.color}
                icon={config.icon}
                label={notification.type.replaceAll("_", " ")}
                sx={{ width: "fit-content" }}
              />
            </Stack>

            {!notification.read && (
              <Button
                size="small"
                variant="outlined"
                onClick={() =>
                  onMarkRead(notification.id)
                }
              >
                Mark Read
              </Button>
            )}
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
                lineHeight: 1.6,
            }}
            >
            {notification.message}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
