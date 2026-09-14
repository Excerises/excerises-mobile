import { ChevronDown } from "lucide-react-native";
import { Pressable, StyleSheet } from "react-native";

import UIText from "@/components/ui/text";
import useThemeColor from "@/hooks/use-theme-color";

type DurationSelectorProps = {
  value?: string;
  onPress?: () => void;
  placeholder?: string;
};

export default function DurationSelector({
  value,
  onPress,
  placeholder = "Select duration",
}: DurationSelectorProps) {
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
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  text: {
    fontSize: 14,
  },
});
