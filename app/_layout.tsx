import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ThemeProvider from "@/components/provider/theme-provider";
import { useMemo } from "react";

export default function RootLayout() {
  const queryClient = useMemo(() => {
    return new QueryClient();
  }, []);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
