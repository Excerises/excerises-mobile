import { Button, Text, View } from "@/component/ui";
import { Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Banner from "@/assets/images/welcome/banner-alt.jpg";
import { Colors } from "@/constant/theme";
import { useRouter } from "expo-router";
import { ThemeToggler } from "@/component/common/theme-toggler";

export default function Index() {
  const router = useRouter();

  function getStarted() {
    router.replace("/login");
  }

  return (
    <View style={[styles.container, { paddingHorizontal: 0 }]}>
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <View style={styles.content} variant="ghost">
          <Image source={Banner} style={styles.banner} />
          <View
            variant="ghost"
            style={{ paddingHorizontal: 30, paddingBottom: 50 }}
          >
            <Text size="xl5" weight="bold" style={{ color: Colors.white }}>
              SMART{"\n"}WORKOUT{"\n"}FOR A
            </Text>
            <Text size="xl5" weight="bold" variant="primary">
              BETTER YOU
            </Text>
          </View>
        </View>
        <View variant="ghost" style={{ paddingHorizontal: 30, gap: 10 }}>
          <Text size="xl" weight="bold" style={{ paddingTop: 14 }}>
            Find Best Exercises
          </Text>
          <Text variant="muted">
            Get workout recommendations
            {"\n"}tailored to your needs using AI.
          </Text>
        </View>
        <View
          variant="ghost"
          style={{ paddingHorizontal: 20, paddingBottom: 25, paddingTop: 14 }}
        >
          <Button
            style={{ alignSelf: "stretch" }}
            size="xl"
            onPress={getStarted}
          >
            <Text weight="bold" size="lg">
              GET STARTED
            </Text>
          </Button>
        </View>
      </SafeAreaView>

      <View variant="ghost" style={styles.themeToggler}>
        <SafeAreaView>
          <ThemeToggler color={Colors.white} />
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
  content: {
    flex: 1,
    gap: 18,
    justifyContent: "flex-end",
    position: "relative",
  },
  banner: {
    position: "absolute",
    filter: "brightness(0.65)",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  themeToggler: {
    position: "absolute",
    top: 20,
    right: 20,
  },
});
