import { useState, useEffect, ReactNode } from "react";
import {
  useGetNotifications,
  useReadNotification,
  useDeleteNotification,
} from "@/hook/api/notification/use-notification";
import { Notification } from "../../../../type/entity/notificaton";
import { ActivityIndicator, StyleSheet, FlatList } from "react-native";
import { Text, View } from "@/component/ui";
import { NoRecord } from "@/component/common/no-record";
import NotificationCard from "@/component/notification/notification-card";
import { BottomSheet, BottomSheetContent } from "@/component/ui/bottom-sheet";
import NotificationBottomSheet from "@/component/notification/notification-bottom-sheet";
import {
  HomeScreen,
  HomeScreenTitle,
} from "@/component/screen/main/home-screen";

export default function Page() {
  return (
    <HomeScreen
      title={<HomeScreenTitle>Notifications</HomeScreenTitle>}
      canBack
    >
      <PageContent />
    </HomeScreen>
  );
}

export function PageContent() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  const { query: notificationsQuery } = useGetNotifications();
  const { mutation: readMutation } = useReadNotification();
  const { mutation: deleteMutation } = useDeleteNotification();

  useEffect(() => {
    if (notificationsQuery.data) {
      const data = notificationsQuery.data;
      if (data && data.data) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setNotifications(data.data);
      }
    }
  }, [notificationsQuery.data]);

  const handleRead = async (notificationId: string) => {
    try {
      await readMutation.mutateAsync({ notificationId });
      setNotifications(
        notifications.map((n) =>
          n.id === notificationId
            ? { ...n, readed_at: new Date().toISOString() }
            : n,
        ),
      );
    } catch (error) {
      console.error("Failed to mark read", error);
    }
  };

  const handleDelete = async (notificationId: string) => {
    try {
      await deleteMutation.mutateAsync({ notificationId });
      setNotifications(notifications.filter((n) => n.id !== notificationId));
      setSelectedNotification(null);
    } catch (error) {
      console.error("Failed to delete notification", error);
    }
  };

  if (notificationsQuery.isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (notifications.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <NoRecord message="No notifications yet" />
        <Text size="sm" variant="muted">
          No notifications yet
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notificationsQuery.data?.data || []}
        keyExtractor={(n) => n.id}
        renderItem={({ item: notification }) => (
          <View style={{ marginBottom: 8 }}>
            <NotificationCard
              notification={notification}
              onPress={() => {
                setSelectedNotification(notification);
                if (!notification.readed_at) {
                  handleRead(notification.id);
                }
              }}
            />
          </View>
        )}
      />
      <BottomSheet
        open={!!selectedNotification}
        onOpenChange={() => setSelectedNotification(null)}
      >
        <BottomSheetContent>
          {selectedNotification && (
            <NotificationBottomSheet
              notification={selectedNotification}
              onDelete={() => handleDelete(selectedNotification.id)}
            />
          )}
        </BottomSheetContent>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
});
