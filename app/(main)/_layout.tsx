import { useThemeContext } from "@/components/provider/theme-provider";
import useThemeColor from "@/hooks/use-theme-color";

import {
  Slot,
  usePathname,
  useRouter,
} from "expo-router";

import { NavigationBar } from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";

import {
  Clock3,
  Dumbbell,
  Home,
  User,
} from "lucide-react-native";

import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import UIText from "@/components/ui/text";

export default function Layout() {
  const themeColor = useThemeColor();

  const { theme } = useThemeContext();

  const pathname = usePathname();

  const router = useRouter();

  const systemBarStyle =
    theme === "dark" ? "light" : "dark";

  const menus = [
    {
      label: "Home",
      path: "/dashboard",
      route: "/(main)/dashboard",
      icon: Home,
    },
    {
      label: "Workout",
      path: "/type-workout",
      route: "/(main)/type-workout",
      icon: Dumbbell,
    },
    {
      label: "History",
      path: "/history",
      route: "/(main)/history",
      icon: Clock3,
    },
    {
      label: "Profile",
      path: "/account",
      route: "/(main)/account",
      icon: User,
    },
  ] as const;

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor:
            themeColor.background,
        },
      ]}
    >

      <StatusBar style={systemBarStyle} />


      <NavigationBar
        style={
          theme === "dark"
            ? "dark"
            : "light"
        }
      />


      <View style={styles.content}>
        <Slot />
      </View>


      <View
        style={[
          styles.bottomNavigation,
          {
            backgroundColor:
              themeColor.card,
          },
        ]}
      >
        {menus.map((menu) => {
          const isActive =
            pathname === menu.path;

          const Icon = menu.icon;

          return (
            <Pressable
              key={menu.route}
              style={styles.navItem}
              onPress={() =>
                router.replace(menu.route)
              }
            >

              <Icon
                size={21}
                color={
                  isActive
                    ? themeColor.destructive
                    : themeColor.foreground
                }
              />


              <UIText
                style={[
                  styles.navLabel,
                  {
                    color: isActive
                      ? themeColor.destructive
                      : themeColor.foreground,
                  },
                ]}
              >
                {menu.label}
              </UIText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  content: {
    flex: 1,
    paddingBottom: 62,
  },

  bottomNavigation: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 56,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 12,
  },

  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },

  navLabel: {
    fontSize: 9,
  },
});