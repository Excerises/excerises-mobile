import { Button, Text, View } from "@/component/ui";
import { Image, StyleSheet, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Banner from "@/assets/images/welcome/banner-alt.jpg";
import { Colors } from "@/constant/theme";
import { useRouter } from "expo-router";

export default function Index() {
  const { height, width } = useWindowDimensions();
  const router = useRouter();

  function getStarted() {
    router.replace("/login");
  }

  return (
    <View style={[styles.container, { paddingHorizontal: 0 }]}>
      <Image source={Banner} style={[styles.banner, { height, width }]} />
      <SafeAreaView style={styles.container} edges={["bottom", "top"]}>
        <View style={styles.content} variant="ghost">
          <View variant="ghost">
            <Text size="xl5" weight="bold" style={{ color: Colors.white }}>
              SMART{"\n"}WORKOUT{"\n"}FOR A
            </Text>
            <Text size="xl5" weight="bold" variant="primary">
              BETTER YOU
            </Text>
          </View>
          <View variant="ghost">
            <Text style={{ color: Colors.white }}>
              Get workout recommendations
              {"\n"}tailored to your needs
              {"\n"}using AI.
            </Text>
          </View>
        </View>
        <Button style={{ alignSelf: "stretch" }} size="xl" onPress={getStarted}>
          <Text weight="bold" size="xl">
            Get Started
          </Text>
        </Button>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  content: {
    flex: 1,
    gap: 18,
    justifyContent: "center",
    position: "relative",
  },
  banner: {
    position: "absolute",
    filter: "brightness(0.65)",
    top: 0,
    left: 0,
    objectFit: "cover",
  },
});
