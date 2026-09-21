import { Borders } from "@/constant/theme";
import useThemeColor from "@/hooks/use-theme-color";
import type { ReactNode } from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

import UIText from "./text";

interface Props extends TouchableOpacityProps {
  label: string;
  labelStyle?: StyleProp<TextStyle>;
  variant?: "default" | "primary";
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function UIButton({
  label,
  labelStyle,
  variant = "default",
  icon,
  style,
  disabled,
  ...props
}: Props) {
  const themeColor = useThemeColor();

  const isPrimary = variant === "primary";

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: isPrimary ? themeColor.primary : themeColor.card,
          borderColor: isPrimary ? themeColor.primary : themeColor.border,
        },
        disabled && styles.disabled,
        style,
      ]}
      activeOpacity={0.8}
      disabled={disabled}
      {...props}
    >
      {icon}

      <UIText
        style={[
          styles.text,
          {
            color: isPrimary ? themeColor.black : themeColor.foreground,
          },
          labelStyle,
        ]}
      >
        {label}
      </UIText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: Borders.radius,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  text: {
    fontSize: 16,
    fontWeight: "600",
  },

  disabled: {
    opacity: 0.5,
  },
});
