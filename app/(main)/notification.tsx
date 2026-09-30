import { useState } from "react";

import { router } from "expo-router";

import { Bell, CheckCircle2, Star, Trophy } from "lucide-react-native";

import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { notifications } from "@/components/data/Notification";

import { currentUser } from "@/components/data/User";

import UIText from "@/components/ui/common/text";

import useThemeColor from "@/hooks/use-theme-color";

type NotificationIconType =
  | "completed"
  | "great-job"
  | "reminder"
  | "achievement";

const getNotificationIconType = (title: string): NotificationIconType => {
  switch (title) {
    case "Workout Completed":
      return "completed";

    case "Great Job!":
      return "great-job";

    case "Reminder":
      return "reminder";

    case "Achievement":
      return "achievement";

    default:
      return "achievement";
  }
};

const getTimeAgo = (date: string) => {
  const createdAt = new Date(date).getTime();
  const now = Date.now();

  const difference = Math.max(0, now - createdAt);

  const minutes = Math.floor(difference / (1000 * 60));

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes} min ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }

  const days = Math.floor(hours / 24);

  return `${days} ${days === 1 ? "day" : "days"} ago`;
};

export default function NotificationScreen() {
  const themeColor = useThemeColor();

  const userNotifications = notifications.filter(
    (item) => item.user_id === currentUser.user_id,
  );

  const [readIds, setReadIds] = useState<string[]>(
    userNotifications
      .filter((item) => item.read_at !== null)
      .map((item) => item.notification_id),
  );

  const handleMarkAllRead = () => {
    setReadIds(userNotifications.map((item) => item.notification_id));
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeColor.background,
        },
      ]}
    >
      <View
        style={[
          styles.header,
          {
            borderBottomColor: themeColor.border,
          },
        ]}
      >
        <Pressable onPress={handleBack} style={styles.backButton} hitSlop={8}>
          <UIText
            style={[
              styles.backText,
              {
                color: themeColor.foreground,
              },
            ]}
          >
            ←
          </UIText>
        </Pressable>

        <UIText style={styles.headerTitle}>Notification</UIText>

        <Pressable
          onPress={handleMarkAllRead}
          style={styles.markButton}
          hitSlop={8}
        >
          <UIText
            style={[
              styles.markText,
              {
                color: themeColor.primary,
              },
            ]}
          >
            Mark All Read
          </UIText>
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {userNotifications.map((notification) => {
          const iconType = getNotificationIconType(notification.title);

          const isRead = readIds.includes(notification.notification_id);

          const iconColor =
            iconType === "completed"
              ? themeColor.success
              : iconType === "great-job"
                ? themeColor.primary
                : iconType === "reminder"
                  ? themeColor.danger
                  : themeColor.primary;

          return (
            <View
              key={notification.notification_id}
              style={[
                styles.card,
                {
                  backgroundColor: themeColor.card,
                  borderColor: themeColor.border,
                },
              ]}
            >
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: themeColor.background,
                  },
                ]}
              >
                {iconType === "completed" && (
                  <CheckCircle2 size={25} color={iconColor} />
                )}

                {iconType === "great-job" && (
                  <Trophy size={25} color={iconColor} />
                )}

                {iconType === "reminder" && (
                  <Bell size={25} color={iconColor} />
                )}

                {iconType === "achievement" && (
                  <Star size={25} color={iconColor} />
                )}
              </View>

              <View style={styles.content}>
                <UIText style={styles.title}>{notification.title}</UIText>

                <UIText
                  style={[
                    styles.description,
                    {
                      color: themeColor.mutedForeground,
                    },
                  ]}
                >
                  {notification.description}
                </UIText>

                <UIText
                  style={[
                    styles.time,
                    {
                      color: themeColor.mutedForeground,
                    },
                  ]}
                >
                  {getTimeAgo(notification.created_at)}
                </UIText>
              </View>

              {!isRead && (
                <View
                  style={[
                    styles.unreadDot,
                    {
                      backgroundColor: themeColor.primary,
                    },
                  ]}
                />
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    minHeight: 60,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingHorizontal: 18,
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  backText: {
    fontSize: 32,
    fontWeight: "300",
  },

  headerTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 4,
  },

  markButton: {
    justifyContent: "center",
    alignItems: "center",
  },

  markText: {
    fontSize: 12,
    fontWeight: "600",
  },

  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 20,
  },

  card: {
    minHeight: 98,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    flex: 1,
    marginLeft: 14,
    paddingRight: 20,
  },

  title: {
    fontSize: 14,
    fontWeight: "600",
  },

  description: {
    fontSize: 11,
    marginTop: 4,
  },

  time: {
    fontSize: 10,
    marginTop: 8,
  },

  unreadDot: {
    position: "absolute",
    top: 17,
    right: 12,
    width: 9,
    height: 9,
    borderRadius: 5,
  },
});
