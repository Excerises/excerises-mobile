import Logo from "@/components/logo";
import ThemeToggler from "@/components/theme-toggler";
import useThemeColor from "@/hooks/use-theme-color";
import { Slot } from "expo-router";
import { SunIcon } from "lucide-react-native";
import {
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
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        backgroundColor: themeColor.background,
        flex: 1,
      }}
    >
      <SafeAreaView edges={["top"]} />
      <View style={styles.headers}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Logo size={30} />
          <Text
            style={{
              color: themeColor.primary,
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Excerises
          </Text>
        </View>
        <ThemeToggler />
      </View>
      <ScrollView style={styles.scrollView}>
        <View
          style={[
            styles.container,
            {
              minHeight:
                height -
                insets.top -
                insets.bottom * 2 -
                styles.scrollView.paddingVertical -
                styles.headers.height * 2,
            },
          ]}
        >
          <Slot />
        </View>
      </ScrollView>
      <SafeAreaView edges={["bottom"]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  headers: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  scrollView: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    flex: 1,
  },
});
