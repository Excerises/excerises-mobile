import { Pressable, StyleSheet, View } from "react-native";

import { ChevronDown, Clock3 } from "lucide-react-native";

import UIText from "@/components/ui/text";

import useThemeColor from "@/hooks/use-theme-color";

type TimeSelectorProps = {
  value?: string;
  onPress?: () => void;
  placeholder?: string;
  showIcon?: boolean;
};

export default function TimeSelector({
  value,
  onPress,
  placeholder = "Select time",
  showIcon = true,
}: TimeSelectorProps) {
  const themeColor = useThemeColor();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: themeColor.card,
        },
      ]}
    >
      <View style={styles.leftSection}>
        {showIcon && (
          <Clock3 size={20} strokeWidth={1.8} color={themeColor.foreground} />
        )}

        <UIText
          style={[
            styles.text,
            {
              color: value ? themeColor.foreground : themeColor.mutedForeground,
            },
          ]}
        >
          {value || placeholder}
        </UIText>
      </View>

      <ChevronDown
        size={20}
        strokeWidth={2}
        color={themeColor.mutedForeground}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    borderRadius: 6,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  text: {
    fontSize: 14,
  },
});
