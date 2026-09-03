import useThemeColor from "@/hooks/use-theme-color";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import UIText from "./text";
import { Borders } from "@/constant/theme";

interface Props extends TouchableOpacityProps {
  label: string;
  variant?: "default" | "destructive";
}

export default function UIButton({
  label,
  variant = "default",
  ...props
}: Props) {
  const themeColor = useThemeColor();
  const { style, ...other } = props;

  const color = {
    default: themeColor.primary,
    destructive: themeColor.destructive,
  }[variant];

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }, style]}
      {...other}
    >
      <UIText style={styles.text}>{label}</UIText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    paddingHorizontal: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Borders.radius,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});
