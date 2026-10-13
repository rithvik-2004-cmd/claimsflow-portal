import notifications from "../mock-data/notifications.json";

let notificationsStore = [...notifications];

const delay = (ms = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const notificationService = {
  async getNotifications() {
    await delay();
    return [...notificationsStore];
  },

  async markAsRead(id) {
    await delay();

    notificationsStore = notificationsStore.map((item) =>
      item.id === id ? { ...item, read: true } : item
    );

    return true;
  },

  async markAllAsRead() {
    await delay();

    notificationsStore = notificationsStore.map((item) => ({
      ...item,
      read: true,
    }));

    return true;
  },

  async getUnreadCount() {
    await delay();

    return notificationsStore.filter(
      (item) => !item.read
    ).length;
  },
};