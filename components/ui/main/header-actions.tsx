import { Bell, Search } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";

import ThemeToggler from "@/components/theme-toggler";
import useThemeColor from "@/hooks/use-theme-color";

export default function HeaderActions() {
  const themeColor = useThemeColor();

  return (
    <View style={styles.actions}>
      <Pressable style={styles.actionButton} onPress={() => {}} hitSlop={8}>
        <Search size={22} color={themeColor.foreground} />
      </Pressable>

      <ThemeToggler />

      <Pressable style={styles.actionButton} onPress={() => {}} hitSlop={8}>
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
