import { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../ui";
import { CircleAlertIcon, LucideIcon } from "lucide-react-native";
import { useThemeColor } from "@/hook/use-theme-color";
import { Borders, Fonts } from "@/constant/theme";

export interface NoRecordProps {
  icon?: LucideIcon;
  message?: string;
  actions?: ReactNode;
}

export function NoRecord({ icon, message, actions }: NoRecordProps) {
  let Icon = icon || CircleAlertIcon;

  const themeColor = useThemeColor();

  return (
    <View variant="ghost" style={styles.container}>
      <Icon
        color={themeColor.mutedForeground}
        size={Fonts.size.xl4}
        style={{ marginBottom: 5 }}
      />
      <Text variant="muted" size="sm">
        {message || "No record founds"}
      </Text>
      {actions && (
        <View variant="ghost" style={{ marginTop: 8 }}>
          {actions}
        </View>
      )}
    </View>
  );
}

export function NoRecordCard(props: NoRecordProps) {
  return (
    <View variant="card" style={styles.card}>
      <NoRecord {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    paddingVertical: 28,
    borderRadius: Borders.radius.lg,
  },
});
