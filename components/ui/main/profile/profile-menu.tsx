import {
    Bell,
    ChevronRight,
    CircleHelp,
    FileText,
    Palette,
    Settings2,
} from "lucide-react-native";

import { Pressable, StyleSheet, View } from "react-native";

import UIText from "@/components/ui/common/text";

import useThemeColor from "@/hooks/use-theme-color";

const menuItems = [
  {
    label: "Account Settings",
    icon: Settings2,
  },
  {
    label: "Notifications",
    icon: Bell,
  },
  {
    label: "Appearance",
    icon: Palette,
  },
  {
    label: "Help & Support",
    icon: CircleHelp,
  },
  {
    label: "Terms & Privacy",
    icon: FileText,
  },
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
              style={[
                styles.item,
                !isLast && {
                  borderBottomColor: themeColor.border,
                  borderBottomWidth: 1,
                },
              ]}
              onPress={() => onPress?.(item.label)}
            >
              <Icon size={21} color={themeColor.foreground} />

              <UIText style={styles.label}>{item.label}</UIText>

              <ChevronRight size={19} color={themeColor.foreground} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
  },

  title: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },

  menu: {
    borderWidth: 1,
    borderRadius: 7,
    overflow: "hidden",
  },

  item: {
    minHeight: 40,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  label: {
    flex: 1,
    fontSize: 11,
    marginLeft: 12,
  },
});
