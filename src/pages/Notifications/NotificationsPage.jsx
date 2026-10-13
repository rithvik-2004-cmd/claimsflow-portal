import { useEffect, useState, useMemo } from "react";
import {
  Box,
  Grid,
  Stack,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import NotificationCard from "../../components/common/NotificationCard";
import NotificationSummaryCard from "../../components/common/NotificationSummaryCard";
import { notificationService } from "../../services/notificationService";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    const data =
      await notificationService.getNotifications();

    setNotifications(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredNotifications = useMemo(() => {
    return notifications.filter(
      (item) =>
        item.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.message
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [notifications, search]);

  const total = notifications.length;
  const unread = notifications.filter(
    (item) => !item.read
  ).length;

  const actionRequired = notifications.filter(
    (item) => item.type === "ACTION_REQUIRED"
  ).length;

  const handleMarkRead = async (id) => {
    await notificationService.markAsRead(id);
    loadData();
  };

  const handleMarkAllRead = async () => {
    await notificationService.markAllAsRead();
    loadData();
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h4" fontWeight={700}>
        Notifications
      </Typography>

        <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
            <NotificationSummaryCard
            label="Total Notifications"
            value={total}
            color="primary.main"
            />
    </Grid>

    <Grid item xs={12} md={4}>
        <NotificationSummaryCard
        label="Unread"
        value={unread}
        color="warning.main"
        />
    </Grid>

    <Grid item xs={12} md={4}>
        <NotificationSummaryCard
        label="Action Required"
        value={actionRequired}
        color="error.main"
        />
    </Grid>
    </Grid>


      <Box>
        <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        >
        <TextField
            fullWidth
            placeholder="Search notifications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />

        <Button
            variant="contained"
            sx={{
            minWidth: 180,
            whiteSpace: "nowrap",
            }}
            onClick={handleMarkAllRead}
        >
            Mark All Read
        </Button>
        </Stack>
      </Box>

      <Stack spacing={2}>
        {filteredNotifications.map((item) => (
          <NotificationCard
            key={item.id}
            notification={item}
            onMarkRead={handleMarkRead}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default NotificationsPage;