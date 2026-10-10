import { Borders } from "@/constant/theme";
import { Buttons } from "@/constant/theme/button";
import { useThemeColor } from "@/hook/use-theme-color";
import { useMemo } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

export type NButtonProps = TouchableOpacityProps & {
  variant?: "default" | "secondary" | "ghost" | "destructive";
  size?: keyof typeof Buttons.size;
  style?: StyleProp<ViewStyle>;
};

export function NButton({
  variant = "default",
  disabled,
  style,
  size = "md",
  ...props
}: NButtonProps) {
  const themeColor = useThemeColor();

  const backgroundColor = useMemo(() => {
    return {
      default: themeColor.primary,
      secondary: themeColor.muted,
      ghost: "transparent",
      destructive: themeColor.danger,
    }[variant];
  }, [themeColor, variant]);

  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.disabled,
        Buttons.size[size],
        {
          borderRadius: Borders.radius[size],
          backgroundColor,
        },
        style,
      ]}
      disabled={disabled}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    gap: 8,
  },

  disabled: {
    opacity: 0.5,
  },
});
