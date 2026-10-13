import { Pressable, StyleSheet, View } from "react-native";
import { Stack, usePathname, useRouter } from "expo-router";
import { useThemeColor } from "@/hook/use-theme-color";
import { ThemeToggler } from "@/component/common/theme-toggler";
import { SafeAreaView } from "react-native-safe-area-context";
import { OnboardingProvider } from "@/context/onboarding-context";
import { ArrowLeftIcon } from "lucide-react-native";
import { Fonts } from "@/constant/theme";
import { useEffect, useState } from "react";

export default function Layout() {
  const router = useRouter();
  const pathname = usePathname();
  const themeColor = useThemeColor();

  const [canBack, setCanBack] = useState(false);

  useEffect(() => {
    setCanBack(router.canGoBack());
  }, [pathname]);

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
      {canBack && (
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
