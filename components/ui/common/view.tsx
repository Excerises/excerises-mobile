import useThemeColor from "@/hooks/use-theme-color";
import { View, ViewProps } from "react-native";

export type UIViewProps = ViewProps & {
  variant?: "default" | "card" | "primary";
};

export default function UIView({ variant = "default", ...props }: UIViewProps) {
  const themeColor = useThemeColor();

  const { style, ...other } = props;

  const backgroundColor = {
    default: themeColor.background,
    card: themeColor.card,
    primary: themeColor.primary,
  }[variant];

  return <View style={[{ backgroundColor }, style]} {...other} />;
}
