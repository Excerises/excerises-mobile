import { View } from "@/component/ui";
import { useThemeColor } from "@/hook/use-theme-color";
import { Tabs } from "expo-router";
import { HistoryIcon, HomeIcon, UserIcon } from "lucide-react-native";

const menus = [
  {
    title: "Home",
    icon: HomeIcon,
    url: "/",
    name: "index",
  },
  {
    title: "History",
    icon: HistoryIcon,
    url: "/history",
    name: "history",
  },
  {
    title: "Account",
    icon: UserIcon,
    url: "/account",
    name: "account",
  },
];

export default function Layout() {
  const themeColor = useThemeColor();

  return (
    <View variant="card" style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: themeColor.primary,
          tabBarInactiveTintColor: themeColor.foreground,
          tabBarStyle: {
            backgroundColor: themeColor.card,
          },
        }}
      >
        {menus.map((menu, i) => (
          <Tabs.Screen
            key={i}
            name={menu.name}
            options={{
              title: menu.title,
              tabBarIcon: ({ color }) => <menu.icon size={22} color={color} />,
            }}
          />
        ))}
      </Tabs>
    </View>
  );
}
