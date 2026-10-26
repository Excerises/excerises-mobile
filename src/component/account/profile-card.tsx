import { StyleSheet } from "react-native";
import { Text, View } from "../ui";
import { User } from "../../../type/entity";
import { Borders } from "@/constant/theme";

export function ProfileCard({ user }: { user: User }) {
  return (
    <View variant="card" style={styles.profileCard}>
      <View
        variant="ghost"
        style={[styles.avatar, { backgroundColor: "#f9a237" }]}
      >
        <Text size="xl3" weight="bold" style={{ color: "#fff" }}>
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </Text>
      </View>
      <View variant="ghost" style={styles.profileInfo}>
        <Text size="lg" weight="semibold">
          {user?.name || "User"}
        </Text>
        <Text variant="muted" size="sm">
          {user?.email || "user@demo.com"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    borderRadius: Borders.radius.lg,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  profileInfo: {
    flex: 1,
    gap: 2,
  },
});
