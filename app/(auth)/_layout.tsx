import Logo from "@/components/logo";
import ThemeToggler from "@/components/theme-toggler";
import { useThemeContext } from "@/components/provider/theme-provider";
import useThemeColor from "@/hooks/use-theme-color";
import { NavigationBar } from "expo-navigation-bar";
import { Slot, usePathname, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function Layout() {
  const { height } = useWindowDimensions();
  const themeColor = useThemeColor();
  const { theme } = useThemeContext();
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const router = useRouter();

  const isWelcomeScreen = pathname === "/";
  const isAuthScreen =
    pathname === "/login" || pathname === "/register";

  const systemBarStyle = theme === "dark" ? "light" : "dark";

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: themeColor.background,
        },
      ]}
    >
      <StatusBar style={systemBarStyle} />

      <NavigationBar
        style={theme === "dark" ? "dark" : "light"}
      />

      <SafeAreaView edges={["top"]} />

      {isWelcomeScreen && (
        <View
          style={[
            styles.welcomeThemeToggle,
            {
              top: insets.top + 14,
            },
          ]}
        >
          <ThemeToggler color={themeColor.foreground} />
        </View>
      )}

      {!isWelcomeScreen && (
        <View style={styles.headers}>
          {isAuthScreen ? (
              <>
                <Pressable
                  onPress={() => router.replace("/")}
                  style={styles.backButton}
                >
                  <Text
                    style={[
                      styles.backText,
                      {
                        color: themeColor.foreground,
                      },
                    ]}
                  >
                    ←
                  </Text>
                </Pressable>

                <ThemeToggler color={themeColor.foreground} />
              </>
            ) : (
            <>
              <View style={styles.logoContainer}>
                <Logo size={30} />

                <Text
                  style={{
                    color: themeColor.primary,
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  Exercises
                </Text>
              </View>

              <ThemeToggler />
            </>
          )}
        </View>
      )}

      {isWelcomeScreen ? (
        <View style={styles.welcomeContainer}>
          <Slot />
        </View>
      ) : (
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={
            Platform.OS === "ios"
              ? "padding"
              : "height"
          }
          keyboardVerticalOffset={
            Platform.OS === "ios"
              ? insets.top
              : 0
          }
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View
              style={[
                styles.pageContainer,
                {
                  minHeight:
                    height -
                    insets.top -
                    insets.bottom -
                    styles.headers.height,
                },
              ]}
            >
              <Slot />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}

      <SafeAreaView edges={["bottom"]} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  headers: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
  },

  logoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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

  keyboardContainer: {
    flex: 1,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },

  pageContainer: {
    flex: 1,
    paddingHorizontal: 18,
  },

  welcomeContainer: {
    flex: 1,
  },

  welcomeThemeToggle: {
    position: "absolute",
    right: 20,
    zIndex: 1,
  },
});