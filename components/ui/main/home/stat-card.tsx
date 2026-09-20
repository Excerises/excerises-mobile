import { StyleSheet, View } from "react-native";

import useThemeColor from "@/hooks/use-theme-color";

import UIText from "@/components/ui/common/text";

type StatCardProps = {
  icon: React.ReactNode;
  value: string;
  unit: string;
  label: string;
  unitColor?: "success" | "muted";
};

export default function StatCard({
  icon,
  value,
  unit,
  label,
  unitColor = "muted",
}: StatCardProps) {
  const themeColor = useThemeColor();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeColor.card,
          borderColor: themeColor.destructive,
        },
      ]}
    >
      <View style={styles.icon}>{icon}</View>

      <UIText style={styles.value}>{value}</UIText>

      <UIText
        style={[
          styles.unit,
          {
            color:
              unitColor === "success"
                ? themeColor.success
                : themeColor.mutedForeground,
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
  container: {
    flex: 1,
    height: 118,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 6,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },

  icon: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },

  value: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  unit: {
    fontSize: 16,
    textAlign: "center",
  },

  label: {
    fontSize: 16,
    textAlign: "center",
  },
});
