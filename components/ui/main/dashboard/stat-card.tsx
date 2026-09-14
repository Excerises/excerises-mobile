import UIText from "@/components/ui/text";

import useThemeColor from "@/hooks/use-theme-color";

import { StyleSheet, View } from "react-native";

type StatCardProps = {
  icon: React.ReactNode;
  value: string;
  unit: string;
  label: string;
  unitColor?: string;
};

export default function StatCard({
  icon,
  value,
  unit,
  label,
  unitColor,
}: StatCardProps) {
  const themeColor = useThemeColor();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: themeColor.card,
        },
      ]}
    >
      <View style={styles.icon}>{icon}</View>

      <UIText style={styles.value}>{value}</UIText>

      <UIText
        style={[
          styles.unit,
          {
            color: unitColor ?? themeColor.mutedForeground,
          },
        ]}
      >
        {unit}
      </UIText>

      <UIText style={styles.label}>{label}</UIText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 91,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    justifyContent: "space-between",
  },

  icon: {
    height: 21,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  value: {
    fontSize: 16,
    fontWeight: "bold",
  },

  unit: {
    fontSize: 10,
    marginTop: -6,
  },

  label: {
    fontSize: 10,
  },
});
