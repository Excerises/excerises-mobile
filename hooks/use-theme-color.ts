import { Colors } from "@/constant/theme";
import { useTheme } from "@react-navigation/native";

export default function useThemeColor() {
  const { dark } = useTheme();
  return Colors[dark ? "dark" : "light"];
}
