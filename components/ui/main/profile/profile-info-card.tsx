import { ChevronRight, User } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";

import UIText from "@/components/ui/common/text";
import useThemeColor from "@/hooks/use-theme-color";
import { useAuth } from "@/stores/auth-store";

type ProfileInfoCardProps = {
  name: string;
  email: string;
  onEditPress?: () => void;
};

export default function ProfileInfoCard({
  name,
  email,
  onEditPress,
}: ProfileInfoCardProps) {
  const { user } = useAuth();
  const themeColor = useThemeColor();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeColor.card,
          borderColor: themeColor.border,
        },
      ]}
    >
      <View style={styles.topRow}>
        <View
          style={[styles.avatar, { backgroundColor: themeColor.background }]}
        >
          <User size={36} color={themeColor.foreground} />
        </View>

        <View style={styles.info}>
          <UIText style={styles.name}>{user?.name ?? name}</UIText>

          <UIText variant="muted" style={styles.email}>
            {user?.email ?? email}
          </UIText>

          <Pressable
            style={[styles.editButton, { borderColor: themeColor.primary }]}
            onPress={onEditPress}
          >
            <UIText style={[styles.editText, { color: themeColor.foreground }]}>
              Edit Profile
            </UIText>
          </Pressable>
        </View>

        <ChevronRight size={23} color={themeColor.foreground} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 120,
    marginTop: 14,
    padding: 14,
    borderWidth: 1,
    borderRadius: 16,
    justifyContent: "center",
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    alignItems: "center",
    justifyContent: "center",
  },

  info: {
    flex: 1,
    marginLeft: 14,
    marginRight: 8,
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
  },

  email: {
    fontSize: 11,
    marginTop: 4,
  },

  editButton: {
    minHeight: 30,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  editText: {
    fontSize: 11,
    fontWeight: "600",
  },
});
