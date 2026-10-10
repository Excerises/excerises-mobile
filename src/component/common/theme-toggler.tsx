import { useTheme } from "@/context/theme-context";
import { useMemo } from "react";
import { Pressable } from "react-native";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react-native";
import { useThemeColor } from "@/hook/use-theme-color";
import { Fonts } from "@/constant/theme";

export function ThemeToggler({ color }: { color?: string }) {
  const { theme, rotateTheme } = useTheme();
  const themeColor = useThemeColor();

  const Icon = useMemo(() => {
    switch (theme) {
      case "system":
        return MonitorIcon;
      case "light":
        return SunIcon;
      case "dark":
        return MoonIcon;
    }
  }, [theme]);

  return (
    <Pressable onPress={rotateTheme} style={{ padding: 6 }}>
      <Icon color={color || themeColor.foreground} size={Fonts.size.xl} />
    </Pressable>
  );
}
