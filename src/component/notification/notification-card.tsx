import { StyleSheet, Pressable } from "react-native";
import {
  Clock3Icon,
  ChevronRightIcon,
  BellIcon,
  MessageCircleIcon,
  XCircleIcon,
  AlertCircleIcon,
  CheckCircle2Icon,
  WalletIcon,
} from "lucide-react-native";
import { Text, View } from "../ui";
import { useThemeColor } from "@/hook/use-theme-color";
import { Colors } from "@/constant/theme";
import { Notification } from "../../../type/entity/notificaton";

interface NotificationCardProps {
  notification: Notification;
  onPress?: (notification: Notification) => void;
  onLongPress?: (notification: Notification) => void;
}

const formatNotificationDate = (date?: string) => {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "";

  const now = new Date();
  const diff = now.getTime() - parsedDate.getTime();

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < 0) {
    return parsedDate.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
    });
  }

  if (diff < minute) return "Baru saja";
  if (diff < hour) return `${Math.floor(diff / minute)} menit lalu`;
  if (diff < day) return `${Math.floor(diff / hour)} jam lalu`;
  if (diff < 7 * day) return `${Math.floor(diff / day)} hari lalu`;

  return parsedDate.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year:
      parsedDate.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
};

const getNotificationIcon = (title: string) => {
  const value = title.toLowerCase();

  if (
    value.includes("berhasil") ||
    value.includes("success") ||
    value.includes("selesai")
  ) {
    return {
      Icon: CheckCircle2Icon,
      iconColor: "#16A34A",
    };
  }

  if (
    value.includes("peringatan") ||
    value.includes("warning") ||
    value.includes("penting")
  ) {
    return {
      Icon: AlertCircleIcon,
      iconColor: "#D97706",
    };
  }

  if (
    value.includes("gagal") ||
    value.includes("error") ||
    value.includes("ditolak")
  ) {
    return {
      Icon: XCircleIcon,
      iconColor: "#DC2626",
    };
  }

  if (
    value.includes("pembayaran") ||
    value.includes("transaksi") ||
    value.includes("invoice")
  ) {
    return {
      Icon: WalletIcon,
      iconColor: "#7C3AED",
    };
  }

  if (
    value.includes("pesan") ||
    value.includes("chat") ||
    value.includes("komentar")
  ) {
    return {
      Icon: MessageCircleIcon,
      iconColor: "#2563EB",
    };
  }

  return {
    Icon: BellIcon,
    iconColor: Colors.primary,
  };
};

const NotificationCard = ({
  notification,
  onPress,
  onLongPress,
}: NotificationCardProps) => {
  const themeColor = useThemeColor();
  const isUnread = !notification.readed_at;
  const { Icon, iconColor } = getNotificationIcon(notification.title);
  const time = formatNotificationDate(notification.created_at);

  return (
    <Pressable
      onPress={() => onPress?.(notification)}
      onLongPress={() => onLongPress?.(notification)}
      accessibilityRole="button"
      accessibilityLabel={`${notification.title}. ${
        isUnread ? "Belum dibaca." : "Sudah dibaca."
      }`}
    >
      <View
        variant="card"
        style={[styles.card, { borderColor: themeColor.border }]}
      >
        {isUnread && (
          <View
            variant="ghost"
            style={[
              styles.unreadIndicator,
              { backgroundColor: themeColor.primary },
            ]}
          />
        )}

        <View variant="ghost" style={styles.cardContent}>
          <View
            variant="ghost"
            style={[
              styles.iconContainer,
              { backgroundColor: `${iconColor}33` },
            ]}
          >
            <Icon size={23} color={iconColor} strokeWidth={2} />
          </View>

          <View variant="ghost" style={styles.textContainer}>
            <View variant="ghost" style={styles.header}>
              <Text
                numberOfLines={2}
                style={[styles.title, isUnread && styles.unreadTitle]}
              >
                {notification.title}
              </Text>

              {isUnread && (
                <View
                  style={[
                    styles.unreadDot,
                    { backgroundColor: themeColor.primary },
                  ]}
                />
              )}
            </View>

            <Text numberOfLines={3} style={styles.description} variant="muted">
              {notification.description}
            </Text>

            <View variant="ghost" style={styles.footer}>
              <View variant="ghost" style={styles.timeContainer}>
                <Clock3Icon size={13} color={themeColor.mutedForeground} />
                <Text style={styles.timeText} variant="muted">
                  {time || "Waktu tidak tersedia"}
                </Text>
              </View>

              {isUnread && (
                <View style={styles.newBadge} variant="primary">
                  <Text style={[styles.newBadgeText, { color: Colors.white }]}>
                    BARU
                  </Text>
                </View>
              )}
            </View>
          </View>

          <View variant="ghost" style={styles.chevronContainer}>
            <ChevronRightIcon size={17} color={themeColor.mutedForeground} />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    position: "relative",
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    overflow: "hidden",
  },
  unreadIndicator: {
    position: "absolute",
    left: 0,
    top: 16,
    bottom: 16,
    width: 4,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 16,
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  textContainer: {
    flex: 1,
    minWidth: 0,
    paddingTop: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  title: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
  },
  unreadTitle: {
    fontWeight: "700",
  },
  unreadDot: {
    width: 7,
    height: 7,
    marginTop: 6,
    borderRadius: 4,
  },
  description: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "400",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  timeText: {
    fontSize: 11,
    fontWeight: "500",
  },
  newBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  newBadgeText: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.6,
  },
  chevronContainer: {
    alignSelf: "center",
    marginLeft: -4,
  },
});

export default NotificationCard;
