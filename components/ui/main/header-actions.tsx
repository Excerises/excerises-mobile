import { Bell, Search } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";

import ThemeToggler from "@/components/theme-toggler";
import useThemeColor from "@/hooks/use-theme-color";

type HeaderActionsProps = {
  onSearchPress?: () => void;
  onNotificationPress?: () => void;
};

export default function HeaderActions({
  onSearchPress,
  onNotificationPress,
}: HeaderActionsProps) {
  const themeColor = useThemeColor();

  return (
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
  );
}

const styles = StyleSheet.create({
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
