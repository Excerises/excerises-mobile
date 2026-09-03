import ThemeProvider, {
  useThemeContext,
} from "@/components/provider/theme-provider";
import { Colors } from "@/constant/theme";
import {
  DefaultTheme,
  ThemeProvider as NativeThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <RootWidget />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

function RootWidget() {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  return (
    <NativeThemeProvider
      value={{
        dark: isDark,
        colors: {
          ...DefaultTheme.colors,
          ...Colors[isDark ? "dark" : "light"],
        },
        fonts: {
          ...DefaultTheme.fonts,
        },
      }}
    >
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </NativeThemeProvider>
  );
}
