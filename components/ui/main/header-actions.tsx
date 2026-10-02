import { Bell } from "lucide-react-native";

import { useRouter } from "expo-router";

import { Pressable, StyleSheet, View } from "react-native";

import ThemeToggler from "@/components/theme-toggler";

import useThemeColor from "@/hooks/use-theme-color";

export default function HeaderActions() {
  const themeColor = useThemeColor();
  const router = useRouter();

  const handleNotificationPress = () => {
    router.push("/(main)/notification");
  };

  return (
    <View style={styles.actions}>
      <ThemeToggler />

      <Pressable
        style={styles.actionButton}
        onPress={handleNotificationPress}
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
