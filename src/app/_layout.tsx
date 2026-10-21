import { SplashScreen } from "@/component/screen/splash-screen";
import { AuthProvider, useAuth } from "@/context/auth-context";
import { ThemeProvider, useTheme } from "@/context/theme-context";
import { useAppEntry } from "@/hook/use-app-entry";
import { Stack } from "expo-router";
import { NavigationBar } from "expo-navigation-bar";
import { StatusBar, StatusBarStyle } from "expo-status-bar";
import { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout() {
  const queryClient = useMemo(() => {
    return new QueryClient();
  }, []);

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Content />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

function Content() {
  const { theme } = useTheme();
  const { isReady } = useAppEntry();

  const barStyle = useMemo<StatusBarStyle>(() => {
    switch (theme) {
      case "system":
        return "auto";
      case "light":
        return "dark";
      case "dark":
        return "light";
    }
  }, [theme]);

  return (
    <>
      <StatusBar style={barStyle} />
      <NavigationBar style={barStyle} />
      {isReady ? (
        <Stack screenOptions={{ headerShown: false }} />
      ) : (
        <SplashScreen />
      )}
    </>
  );
}
