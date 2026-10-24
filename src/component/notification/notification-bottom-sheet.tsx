import { Alert, StyleSheet } from "react-native";
import { Notification } from "../../../type/entity/notificaton";
import { formatDate } from "@/utils/common/format";
import { Button, Separator, Text, View } from "../ui";
import { useThemeColor } from "@/hook/use-theme-color";
import { CheckIcon, ClockIcon } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  notification: Notification;
  onMarkAsRead?: () => void;
  onDelete?: () => void;
}

export default function NotificationBottomSheet({
  notification,
  onMarkAsRead,
  onDelete,
}: Props) {
  const isRead = Boolean(notification.readed_at);
  const themeColor = useThemeColor();

  function handleDelete() {
    Alert.alert(
      "Delete Notification",
      "Are you sure you want to delete this notification?",
      [
        {
          text: "Cancel",
        },
        {
          text: "Delete",
          onPress: onDelete,
        },
      ],
    );
  }

  return (
    <SafeAreaView edges={["bottom"]}>
      {!isRead && (
        <View variant="primary" style={[styles.statusBadge]}>
          <Text style={[styles.statusText]}>Unread</Text>
        </View>
      )}

      <Text style={styles.title} size="xl2">
        {notification.title}
      </Text>

      <Text style={styles.description} variant="muted">
        {notification.description}
      </Text>

      <View style={[styles.divider, { backgroundColor: themeColor.border }]} />

      <Text style={styles.sectionTitle}>Information</Text>

      <View
        style={[styles.infoCard, { borderColor: themeColor.border }]}
        variant="ghost"
      >
        <View style={styles.infoRow} variant="ghost">
          <View style={styles.infoIcon} variant="ghost">
            <ClockIcon size={20} color={themeColor.primary} />
          </View>

          <View style={styles.infoContent} variant="ghost">
            <Text style={[styles.infoLabel]} variant="muted">
              Waktu diterima
            </Text>
            <Text style={styles.infoValue}>
              {formatDate(notification.created_at)}
            </Text>
          </View>
        </View>

        <Separator />

        <View style={styles.infoRow} variant="ghost">
          <View style={styles.infoIcon} variant="ghost">
            <CheckIcon size={20} color={themeColor.primary} />
          </View>

          <View style={styles.infoContent} variant="ghost">
            <Text style={styles.infoLabel} variant="muted">
              Waktu dibaca
            </Text>
            <Text style={styles.infoValue}>
              {notification.readed_at
                ? formatDate(notification.readed_at)
                : "Belum dibaca"}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.actions} variant="ghost">
        <Button onPress={handleDelete} full variant="destructive" size="lg">
          <Text weight="semibold">Delete Notification</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    height: 58,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  backButton: {
    width: 36,
    height: 40,
    justifyContent: "center",
  },
  backIcon: {
    fontSize: 36,
    lineHeight: 40,
    color: "#0F172A",
  },
  headerTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
  },
  headerSpacer: {
    width: 36,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  statusBadge: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    marginBottom: 20,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 7,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  title: {
    lineHeight: 32,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    lineHeight: 25,
    textAlign: "center",
  },
  divider: {
    height: 1,
    marginVertical: 28,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 14,
  },
  infoCard: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderWidth: 1,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  infoIconText: {
    fontSize: 19,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "500",
  },
  infoDivider: {
    height: 1,
  },
  actions: {
    marginTop: 28,
    gap: 12,
  },
  readButton: {
    minHeight: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  readButtonText: {
    fontSize: 14,
    fontWeight: "700",
  },
  deleteButton: {
    minHeight: 52,
    borderWidth: 1,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: "700",
  },
});
