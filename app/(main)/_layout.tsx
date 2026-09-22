import { NavigationBar } from "expo-navigation-bar";

import {
  Slot,
  useGlobalSearchParams,
  usePathname,
  useRouter,
} from "expo-router";

import { StatusBar } from "expo-status-bar";

import { Clock3, Dumbbell, Home, User } from "lucide-react-native";

import { Pressable, StyleSheet, View } from "react-native";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { useThemeContext } from "@/components/provider/theme-provider";

import WorkoutProvider from "@/components/provider/workout-provider";

import ThemeToggler from "@/components/theme-toggler";

import UIText from "@/components/ui/common/text";

import useThemeColor from "@/hooks/use-theme-color";

type WorkoutStep = "type" | "recommend" | "detail" | "session" | "complete";

function MainLayout() {
  const themeColor = useThemeColor();
  const { theme } = useThemeContext();
  const insets = useSafeAreaInsets();

  const pathname = usePathname();
  const router = useRouter();

  const { step, workoutId } = useGlobalSearchParams<{
    step?: WorkoutStep;
    workoutId?: string;
  }>();

  const isWorkoutFlow = pathname === "/workout-flow";

  const currentWorkoutStep: WorkoutStep =
    step ?? (workoutId ? "detail" : "type");

  const handleWorkoutBack = () => {
    if (currentWorkoutStep === "type") {
      router.back();
      return;
    }

    if (currentWorkoutStep === "recommend") {
      router.setParams({
        step: "type",
      });
      return;
    }

    if (currentWorkoutStep === "detail") {
      if (workoutId) {
        router.back();
      } else {
        router.setParams({
          step: "recommend",
        });
      }

      return;
    }

    if (currentWorkoutStep === "session") {
      router.setParams({
        step: "detail",
      });
      return;
    }

    if (currentWorkoutStep === "complete") {
      router.setParams({
        step: "detail",
      });
    }
  };

  const menus = [
    {
      label: "Home",
      path: "/home",
      route: "/(main)/home",
      icon: Home,
    },
    {
      label: "Workout",
      path: "/workout",
      route: "/(main)/workout",
      icon: Dumbbell,
    },
    {
      label: "News",
      path: "/news",
      route: "/(main)/news",
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
          backgroundColor: themeColor.background,
        },
      ]}
    >
      <StatusBar style={theme === "dark" ? "light" : "dark"} />

      <NavigationBar style={theme === "dark" ? "dark" : "light"} />

      {isWorkoutFlow ? (
        <SafeAreaView edges={["top"]}>
          <View style={styles.header}>
            <Pressable
              onPress={handleWorkoutBack}
              style={styles.backButton}
              hitSlop={8}
            >
              <UIText
                style={[
                  styles.backText,
                  {
                    color: themeColor.foreground,
                  },
                ]}
              >
                ←
              </UIText>
            </Pressable>

            <ThemeToggler color={themeColor.foreground} />
          </View>
        </SafeAreaView>
      ) : (
        <SafeAreaView edges={["top"]} />
      )}

      <View style={styles.content}>
        <View
          style={[
            styles.pageContainer,
            isWorkoutFlow && styles.workoutFlowPageContainer,
          ]}
        >
          <Slot />
        </View>
      </View>

      {!isWorkoutFlow && (
        <View
          style={[
            styles.navigationContainer,
            {
              paddingBottom: insets.bottom,
              backgroundColor: themeColor.card,
            },
          ]}
        >
          <View style={styles.bottomNavigation}>
            {menus.map((menu) => {
              const isActive = pathname === menu.path;

              const Icon = menu.icon;

              return (
                <Pressable
                  key={menu.route}
                  style={styles.navItem}
                  onPress={() => router.replace(menu.route)}
                >
                  <Icon
                    size={21}
                    color={
                      isActive ? themeColor.primary : themeColor.foreground
                    }
                  />

                  <UIText
                    style={[
                      styles.navLabel,
                      {
                        color: isActive
                          ? themeColor.primary
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
      )}
    </View>
  );
}

export default function Layout() {
  return (
    <WorkoutProvider>
      <MainLayout />
    </WorkoutProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  header: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  backText: {
    fontSize: 32,
    fontWeight: "300",
  },

  content: {
    flex: 1,
  },

  pageContainer: {
    flex: 1,
  },

  workoutFlowPageContainer: {
    paddingHorizontal: 18,
  },

  navigationContainer: {
    width: "100%",
  },

  bottomNavigation: {
    height: 56,
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
