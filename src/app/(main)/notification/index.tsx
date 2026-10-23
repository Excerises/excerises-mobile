import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import {
  useGetNotifications,
  useReadNotification,
  useDeleteNotification,
} from "@/hook/api/notification/use-notification";
import { Notification } from "../../../../type/entity/notificaton";
import {
  Modal,
  Pressable,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Text, View, Button } from "@/component/ui";
import { NoRecord } from "@/component/common/no-record";

export default function Page() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  const router = useRouter();

  const { query: notificationsQuery } = useGetNotifications();
  const { mutation: readMutation } = useReadNotification();
  const { mutation: deleteMutation } = useDeleteNotification();

  useEffect(() => {
    if (notificationsQuery?.data) {
      const data = notificationsQuery.data;
      if (data && data.data) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setNotifications(
          Array.isArray(data.data)
            ? data.data
            : ([data.data] as Notification[]),
        );
      }
    }
  }, [notificationsQuery?.data]);

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
      setSheetVisible(false);
    } catch (error) {
      console.error("Failed to mark read", error);
    }
  };

  const handleDelete = async (notificationId: string) => {
    try {
      await deleteMutation.mutateAsync({ notificationId });
      setNotifications(notifications.filter((n) => n.id !== notificationId));
      setSheetVisible(false);
    } catch (error) {
      console.error("Failed to delete notification", error);
    }
  };

  const showDetail = (notification: Notification) => {
    setSelectedNotification(notification);
    setSheetVisible(true);
  };

  const closeSheet = () => {
    setSheetVisible(false);
    setSelectedNotification(null);
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
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: "#e0e0e0",
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ padding: 8, borderRadius: 8, backgroundColor: "#f5f5f5" }}
        >
          <Text size="sm" weight="medium" style={{ color: "#3b82f6" }}>
            Kembali
          </Text>
        </TouchableOpacity>
        <Text size="lg" weight="bold">
          Notifikasi
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 16, gap: 12 }}
        showsVerticalScrollIndicator={false}
      >
        {notifications.map((notif) => (
          <Pressable
            key={notif.id}
            onPress={() => showDetail(notif)}
            style={{
              padding: 16,
              borderRadius: 12,
              backgroundColor: "#fff",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text size="md" weight="semibold">
                {notif.title}
              </Text>
              <Text size="sm" variant="muted" style={{ color: "#64748b" }}>
                {notif.created_at
                  ? new Date(notif.created_at).toLocaleDateString()
                  : "-"}
              </Text>
            </View>
            <Text
              size="sm"
              variant="muted"
              numberOfLines={1}
              style={{ color: "#64748b" }}
            >
              {notif.description}
            </Text>
            {notif.readed_at ? null : (
              <TouchableOpacity
                style={{
                  marginTop: 8,
                  padding: 8,
                  backgroundColor: "#fef3c7",
                  borderRadius: 8,
                }}
                onPress={() => handleRead(notif.id)}
              >
                <Text size="xs" weight="medium" variant="primary">
                  Tandai sebagai baca
                </Text>
              </TouchableOpacity>
            )}
          </Pressable>
        ))}
      </ScrollView>

      <Modal
        visible={sheetVisible}
        animationType="slide"
        transparent
        onRequestClose={closeSheet}
      >
        <Pressable
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
          onPress={closeSheet}
        />

        <View
          style={{
            marginHorizontal: 24,
            marginVertical: 24,
            backgroundColor: "#fff",
            borderRadius: 16,
            maxHeight: "80%",
            overflow: "hidden",
          }}
        >
          <View
            style={{
              padding: 16,
              borderBottomWidth: 1,
              borderBottomColor: "#e0e0e0",
            }}
          >
            <Text size="xl" weight="bold" style={{ color: "#1e293b" }}>
              {selectedNotification?.title}
            </Text>
            <Text size="sm" variant="muted" style={{ color: "#64748b" }}>
              {selectedNotification?.created_at
                ? new Date(selectedNotification.created_at).toLocaleDateString()
                : "-"}
            </Text>
          </View>

          <ScrollView
            style={{ flex: 1, padding: 16 }}
            showsVerticalScrollIndicator={false}
          >
            <Text
              size="sm"
              variant="muted"
              numberOfLines={4}
              style={{ color: "#1e293b" }}
            >
              {selectedNotification?.description}
            </Text>
          </ScrollView>

          <View
            style={{
              padding: 16,
              borderTopWidth: 1,
              borderTopColor: "#e0e0e0",
            }}
          >
            <Button
              style={{
                flex: 1,
                backgroundColor: "#ef4444",
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 8,
              }}
              onPress={() => handleDelete(selectedNotification!.id)}
            >
              <Text weight="semibold" size="sm" style={{ color: "white" }}>
                Hapus
              </Text>
            </Button>
            <Button
              style={{
                flex: 1,
                backgroundColor: "#f1f5f9",
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 8,
              }}
              onPress={closeSheet}
            >
              <Text size="sm" weight="medium" style={{ color: "#64748b" }}>
                Tutup
              </Text>
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
