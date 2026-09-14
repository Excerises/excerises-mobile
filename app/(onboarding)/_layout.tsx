import OnboardingProvider, {
  useOnboardingContext,
} from "@/components/provider/onboarding-provider";

import { useThemeContext } from "@/components/provider/theme-provider";
import ThemeToggler from "@/components/theme-toggler";
import useThemeColor from "@/hooks/use-theme-color";

import { NavigationBar } from "expo-navigation-bar";
import { Slot } from "expo-router";
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

function OnboardingLayout() {
  const { height } = useWindowDimensions();

  const themeColor = useThemeColor();

  const { theme } = useThemeContext();

  const insets = useSafeAreaInsets();

  const { handleBack } = useOnboardingContext();

  const systemBarStyle =
    theme === "dark" ? "light" : "dark";

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
      <StatusBar
        style={systemBarStyle}
      />

      <NavigationBar
        style={
          theme === "dark"
            ? "dark"
            : "light"
        }
      />

      <SafeAreaView edges={["top"]} />

      <View style={styles.header}>
        <Pressable
          onPress={handleBack}
          style={styles.backButton}
        >
          <Text
            style={[
              styles.backText,
              {
                color:
                  themeColor.foreground,
              },
            ]}
          >
            ←
          </Text>
        </Pressable>

        <ThemeToggler
          color={themeColor.foreground}
        />
      </View>

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
          contentContainerStyle={
            styles.scrollContent
          }
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
                  styles.header.height,
              },
            ]}
          >
            <Slot />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <SafeAreaView edges={["bottom"]} />
    </View>
  );
}

export default function Layout() {
  return (
    <OnboardingProvider>
      <OnboardingLayout />
    </OnboardingProvider>
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
});