import { useThemeColor } from "@/hook/use-theme-color";
import { useMemo } from "react";
import { View, ViewProps } from "react-native";

export type NViewProps = ViewProps & {
  variant?: "default" | "card" | "primary" | "ghost";
};

export function NView({ variant = "default", ...props }: NViewProps) {
  const themeColor = useThemeColor();

  const { style, ...other } = props;
  const backgroundColor = useMemo(() => {
    return {
      default: themeColor.background,
      card: themeColor.card,
      primary: themeColor.primary,
      ghost: undefined,
    }[variant];
  }, [themeColor, variant]);

  return <View style={[{ backgroundColor }, style]} {...other} />;
}
