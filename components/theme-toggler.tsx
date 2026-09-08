import { MoonIcon, SunIcon } from "lucide-react-native";
import { useThemeContext } from "./provider/theme-provider";
import { Pressable } from "react-native";
import useThemeColor from "@/hooks/use-theme-color";

export default function ThemeToggler({ color }: { color?: string }) {
  const themeColor = useThemeColor();
  const { theme, setTheme } = useThemeContext();
  const isDark = theme === "dark";

  function toggleTheme() {
    const nextTheme = isDark ? "light" : "dark";
    setTheme(nextTheme);
  }

  return (
    <Pressable onPress={toggleTheme}>
      {isDark ? (
        <MoonIcon color={color ?? themeColor.foreground} />
      ) : (
        <SunIcon color={color ?? themeColor.foreground} />
      )}
    </Pressable>
  );
}
