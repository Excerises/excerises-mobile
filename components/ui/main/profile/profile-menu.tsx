import {
  Bell,
  ChevronRight,
  CircleHelp,
  FileText,
} from "lucide-react-native";

import { Pressable, StyleSheet, View } from "react-native";

import UIText from "@/components/ui/common/text";
import useThemeColor from "@/hooks/use-theme-color";

const menuItems = [
  { label: "Notifications", icon: Bell },
  { label: "Help & Support", icon: CircleHelp },
  { label: "Terms & Privacy", icon: FileText },
];

type ProfileMenuProps = {
  onPress?: (label: string) => void;
};

export default function ProfileMenu({ onPress }: ProfileMenuProps) {
  const themeColor = useThemeColor();

  return (
    <View style={styles.container}>
      <UIText style={styles.title}>Quick Menu</UIText>

      <View
        style={[
          styles.menu,
          {
            backgroundColor: themeColor.card,
            borderColor: themeColor.border,
          },
        ]}
      >
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isLast = index === menuItems.length - 1;

          return (
            <Pressable
              key={item.label}
              style={({ pressed }) => [
                styles.item,
                !isLast && {
                  borderBottomColor: themeColor.border,
                  borderBottomWidth: 1,
                },
                { opacity: pressed ? 0.7 : 1 },
              ]}
              onPress={() => onPress?.(item.label)}
            >
              <Icon size={22} color={themeColor.foreground} />

              <UIText style={styles.label}>{item.label}</UIText>

              <ChevronRight
                size={21}
                color={themeColor.foreground}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 10,
  },

  menu: {
    borderWidth: 1,
    borderRadius: 16,
    overflow: "hidden",
  },

  item: {
    minHeight: 54,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  label: {
    flex: 1,
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 14,
  },
});