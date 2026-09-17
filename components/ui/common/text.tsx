import type { TextProps } from "react-native";
import { Text } from "react-native";

import useThemeColor from "@/hooks/use-theme-color";

interface Props extends TextProps {
  variant?: "default" | "muted" | "link";
}

export default function UIText({ variant = "default", ...props }: Props) {
  const themeColor = useThemeColor();

  const { style, ...other } = props;

  const color = {
    default: themeColor.foreground,
    muted: themeColor.mutedForeground,
    link: themeColor.primary,
  }[variant];

  return (
    <Text
      style={[
        {
          color,
        },
        style,
      ]}
      {...other}
    />
  );
}
