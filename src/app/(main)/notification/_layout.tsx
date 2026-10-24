import { useThemeColor } from "@/hook/use-theme-color";
import { Stack } from "expo-router";

export default function Layout() {
  const themeColor = useThemeColor();

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: themeColor.background,
        },
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Notifications",
        }}
      />
    </Stack>
  );
}
