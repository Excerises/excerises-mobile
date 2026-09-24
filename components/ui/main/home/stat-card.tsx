import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import UIText from "@/components/ui/common/text";
import useThemeColor from "@/hooks/use-theme-color";

type StatCardProps = {
  icon: ReactNode;
  value: string;
  unit?: string;
  label: string;
  valueColor?: "success" | "default";
};

export default function StatCard({
  icon,
  value,
  unit,
  label,
  valueColor = "default",
}: StatCardProps) {
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
      <View style={styles.icon}>{icon}</View>

      <View style={styles.valueRow}>
        <UIText
          style={[
            styles.value,
            {
              color:
                valueColor === "success"
                  ? themeColor.success
                  : themeColor.foreground,
            },
          ]}
        >
          {value}
        </UIText>

        {unit ? (
          <UIText
            style={[
              styles.unit,
              {
                color: themeColor.foreground,
              },
            ]}
          >
            {unit}
          </UIText>
        ) : null}
      </View>

      <UIText variant="muted" style={styles.label}>
        {label}
      </UIText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },

  valueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
  },

  value: {
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
  },

  unit: {
    fontSize: 13,
    marginLeft: 3,
    textAlign: "center",
  },

  label: {
    fontSize: 13,
    marginTop: 2,
    textAlign: "center",
  },
});
