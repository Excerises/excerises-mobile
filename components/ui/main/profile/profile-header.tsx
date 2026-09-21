import { Bell, Search } from "lucide-react-native";

import { Pressable, StyleSheet, View } from "react-native";

import ThemeToggler from "@/components/theme-toggler";

import UIText from "@/components/ui/common/text";

import useThemeColor from "@/hooks/use-theme-color";

type ProfileHeaderProps = {
  onSearchPress?: () => void;
  onNotificationPress?: () => void;
};

export default function ProfileHeader({
  onSearchPress,
  onNotificationPress,
}: ProfileHeaderProps) {
  const themeColor = useThemeColor();

  return (
    <View style={styles.container}>
      <View>
        <UIText style={styles.title}>PROFILE</UIText>

        <UIText style={styles.subtitle}>
          Keep Going, You&apos;re Doing Great
        </UIText>
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

  title: {
    fontSize: 22,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 10,
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
