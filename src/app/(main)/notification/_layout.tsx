import { ThemeToggler } from "@/component/common/theme-toggler";
import { useThemeColor } from "@/hook/use-theme-color";
import { Stack, useRouter } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";
import { Pressable } from "react-native";

export default function Layout() {
  const themeColor = useThemeColor();
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: themeColor.background,
        },
        headerTitleStyle: {
          color: themeColor.foreground,
        },
        contentStyle: {
          backgroundColor: themeColor.background,
        },
        headerLeft: () => (
          <Pressable onPress={() => router.back()}>
            <ArrowLeftIcon color={themeColor.foreground} />
          </Pressable>
        ),
        headerRight: () => <ThemeToggler />,
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
