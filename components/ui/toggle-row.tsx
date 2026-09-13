import { Pressable, StyleSheet, Switch, View } from "react-native";

import UIText from "@/components/ui/text";

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
            <UIText style={styles.description}>{description}</UIText>
          )}
        </View>
      </View>


      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{
          false: "#444444",
          true: themeColor.destructive,
        }}
        thumbColor="#FFFFFF"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 48,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  leftSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
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
