import { User } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

import UIText from "@/components/ui/common/text";
import HeaderActions from "@/components/ui/main/header-actions";
import useThemeColor from "@/hooks/use-theme-color";
import { useAuth } from "@/stores/auth-store";

type HomeHeaderProps = {
  name: string;
  onSearchPress?: () => void;
  onNotificationPress?: () => void;
};

export default function HomeHeader({
  onSearchPress,
  onNotificationPress,
}: HomeHeaderProps) {
  const { user } = useAuth();
  const themeColor = useThemeColor();

  return (
    <View style={styles.container}>
      <View style={styles.userSection}>
        <View
          style={[
            styles.avatar,
            {
              borderColor: themeColor.primary,
            },
          ]}
        >
          <User size={22} color={themeColor.primary} />
        </View>

        <View>
          <UIText style={styles.greeting}>Hi {user?.name} 👋</UIText>

          <UIText style={styles.subtitle}>Ready for a workout?</UIText>
        </View>
      </View>

      <HeaderActions
        onSearchPress={onSearchPress}
        onNotificationPress={onNotificationPress}
      />
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
});
