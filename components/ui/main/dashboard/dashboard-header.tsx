import UIText from "@/components/ui/text";

import ThemeToggler from "@/components/theme-toggler";

import useThemeColor from "@/hooks/use-theme-color";

import { Bell, User } from "lucide-react-native";

import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";

type DashboardHeaderProps = {
  name: string;
  onNotificationPress?: () => void;
};

export default function DashboardHeader({
  name,
  onNotificationPress,
}: DashboardHeaderProps) {
  const themeColor = useThemeColor();

  return (
    <View style={styles.header}>

      <View style={styles.userSection}>

        <View
          style={[
            styles.avatar,
            {
              borderColor:
                themeColor.destructive,
            },
          ]}
        >
          <User
            size={26}
            color={
              themeColor.destructive
            }
          />
        </View>


        <View>

          <UIText style={styles.greeting}>
            Good Morning.
          </UIText>


          <UIText style={styles.userName}>
            {name} 👋
          </UIText>
        </View>
      </View>


      <View style={styles.actions}>

        <ThemeToggler
          color={themeColor.foreground}
        />


        <Pressable
          onPress={onNotificationPress}
          style={styles.notification}
        >
          <Bell
            size={21}
            color={themeColor.foreground}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  userSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  greeting: {
    fontSize: 12,
  },

  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 2,
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  notification: {
    padding: 4,
  },
});