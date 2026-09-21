import { Bell, Search, User } from "lucide-react-native";

import { Pressable, StyleSheet, View } from "react-native";

import ThemeToggler from "@/components/theme-toggler";

import UIText from "@/components/ui/common/text";

import useThemeColor from "@/hooks/use-theme-color";

type HomeHeaderProps = {
  name: string;
  onSearchPress?: () => void;
  onNotificationPress?: () => void;
};

export default function HomeHeader({
  name,
  onSearchPress,
  onNotificationPress,
}: HomeHeaderProps) {
  const themeColor = useThemeColor();

  return (
    <View style={styles.container}>
      <View style={styles.userSection}>
        <View
          style={[
            styles.avatar,
            {
              borderColor: themeColor.destructive,
            },
          ]}
        >
          <User size={22} color={themeColor.destructive} />
        </View>

        <View>
          <UIText style={styles.greeting}>Hi {name} 👋</UIText>

          <UIText style={styles.subtitle}>Ready for a workout?</UIText>
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable
          style={styles.actionButton}
          onPress={onSearchPress}
          hitSlop={8}
        >
          <Search size={22} color={themeColor.foreground} />
        </Pressable>

        <ThemeToggler />

        <Pressable
          style={styles.actionButton}
          onPress={onNotificationPress}
          hitSlop={8}
        >
          <Bell size={22} color={themeColor.foreground} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  userSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  greeting: {
    fontSize: 16,
    fontWeight: "600",
  },

  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  actionButton: {
    alignItems: "center",
    justifyContent: "center",
  },
});
