import { StyleSheet, View } from "react-native";
import { Stack } from "expo-router";
import { useThemeColor } from "@/hook/use-theme-color";
import { ThemeToggler } from "@/component/common/theme-toggler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
  const themeColor = useThemeColor();

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            ...styles.container,
            backgroundColor: themeColor.background,
          },
        }}
      />
      <View style={styles.themeToggler}>
        <SafeAreaView>
          <ThemeToggler />
        </SafeAreaView>
      </View>
    </>
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
});
