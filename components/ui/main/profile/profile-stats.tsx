import { Clock3, Dumbbell, Flame } from "lucide-react-native";

import { StyleSheet, View } from "react-native";

import { profileStats } from "@/components/data/profile-data";

import UIText from "@/components/ui/common/text";

import useThemeColor from "@/hooks/use-theme-color";

export default function ProfileStats() {
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
      {profileStats.map((stat) => {
        const Icon = stat.icon;

        return (
          <View key={stat.label} style={styles.item}>
            <Icon size={22} color={themeColor.primary} />

            <UIText style={styles.value}>{stat.value}</UIText>

            <UIText variant="muted" style={styles.label}>
              {stat.label}
            </UIText>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 86,
    marginTop: 8,
    paddingVertical: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 7,
  },

  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  value: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
  },

  label: {
    fontSize: 9,
    marginTop: 2,
    textAlign: "center",
  },
});
