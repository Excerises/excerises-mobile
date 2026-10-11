import { Pressable, StyleSheet, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useThemeColor } from "@/hook/use-theme-color";
import { ThemeToggler } from "@/component/common/theme-toggler";
import { SafeAreaView } from "react-native-safe-area-context";
import { OnboardingProvider } from "@/context/onboarding-context";
import { ArrowLeftIcon } from "lucide-react-native";
import { Fonts } from "@/constant/theme";

export default function Layout() {
  const router = useRouter();
  const themeColor = useThemeColor();

  return (
    <OnboardingProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            ...styles.container,
            backgroundColor: themeColor.background,
          },
        }}
      />
      {router.canGoBack() && (
        <View style={styles.backButton}>
          <SafeAreaView>
            <Pressable onPress={() => router.back()} style={{ padding: 6 }}>
              <ArrowLeftIcon
                color={themeColor.foreground}
                size={Fonts.size.xl2}
              />
            </Pressable>
          </SafeAreaView>
        </View>
      )}
      <View style={styles.themeToggler}>
        <SafeAreaView>
          <ThemeToggler />
        </SafeAreaView>
      </View>
    </OnboardingProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  themeToggler: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
  },
});
