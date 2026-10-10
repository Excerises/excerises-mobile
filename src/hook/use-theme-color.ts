import { ThemeColors } from "@/constant/theme";
import { useTheme } from "@/context/theme-context";
import { useColorScheme } from "react-native";

export function useThemeColor() {
  let { theme } = useTheme();
  const colorScheme = useColorScheme();

  if (theme === "system") {
    theme = ["light", "dark"].includes(colorScheme)
      ? colorScheme
      : ("light" as any);
  }

  return ThemeColors[theme];
}
