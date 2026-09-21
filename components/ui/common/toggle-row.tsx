import { Pressable, StyleSheet, Switch, View } from "react-native";

import UIText from "@/components/ui/common/text";
import useThemeColor from "@/hooks/use-theme-color";

type ToggleRowProps = {
  label: string;
  description?: string;
  value: boolean;
  onChange: (value: boolean) => void;
  icon?: React.ReactNode;
};

export default function ToggleRow({
  label,
  description,
  value,
  onChange,
  icon,
}: ToggleRowProps) {
  const themeColor = useThemeColor();

  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: themeColor.card,
        },
      ]}
      onPress={() => onChange(!value)}
    >
      <View style={styles.leftSection}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}

        <View style={styles.content}>
          <UIText style={styles.label}>{label}</UIText>

          {description && (
            <UIText
              style={[
                styles.description,
                {
                  color: themeColor.mutedForeground,
                },
              ]}
            >
              {description}
            </UIText>
          )}
        </View>
      </View>

      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{
          false: themeColor.border,
          true: themeColor.primary,
        }}
        thumbColor={themeColor.white}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 48,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  leftSection: {
    flex: 1,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    marginRight: 10,
  },

  content: {
    flex: 1,
  },

  label: {
    fontSize: 13,
  },

  description: {
    fontSize: 11,
    marginTop: 2,
    opacity: 0.6,
  },
});
