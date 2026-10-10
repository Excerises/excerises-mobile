import { Fonts } from "@/constant/theme";
import { useThemeColor } from "@/hook/use-theme-color";
import { useMemo } from "react";
import { TextProps, Text } from "react-native";

export type NTextProps = TextProps & {
  variant?: "default" | "muted" | "primary" | "destructive";
  size?: keyof typeof Fonts.size | number;
  weight?: keyof typeof Fonts.weight | number;
};

export function NText({
  variant = "default",
  size = "md",
  weight = "normal",
  ...props
}: NTextProps) {
  const { style, ...other } = props;
  const themeColor = useThemeColor();

  const color = useMemo(() => {
    return {
      default: themeColor.foreground,
      muted: themeColor.mutedForeground,
      primary: themeColor.primary,
      destructive: themeColor.danger,
    }[variant];
  }, [variant, themeColor]);

  return (
    <Text
      style={[
        {
          color,
          fontSize: typeof size == "number" ? size : Fonts.size[size],
          fontWeight:
            typeof weight == "number" ? weight : (Fonts.weight[weight] as any),
        },
        style,
      ]}
      {...other}
    />
  );
}
