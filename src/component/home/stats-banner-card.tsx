import { Image, StyleSheet } from "react-native";
import { Button, Text, View } from "../ui";
import { Borders, Colors } from "@/constant/theme";
import Banner from "@/assets/images/home/banner.png";

export function StatsBannerCard() {
  return (
    <View variant="card" style={styles.card}>
      <Image source={Banner} style={styles.img} />
      <View variant="ghost" style={styles.imgMask}>
        <Text
          weight="bold"
          size="xl2"
          variant="primary"
          style={{ textTransform: "uppercase", marginBottom: 5 }}
        >
          Ready to be stronger?
        </Text>
        <Text size="sm" style={{ color: Colors.white }}>
          Start with a workout plan designed just for you.
        </Text>
        <Button style={{ marginTop: 20 }}>
          <Text
            size="sm"
            style={{ textTransform: "uppercase" }}
            weight="semibold"
          >
            Get Started
          </Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 190,
    borderRadius: Borders.radius.xl,
    position: "relative",
    overflow: "hidden",
  },
  img: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    width: "100%",
    objectFit: "cover",
  },
  imgMask: {
    padding: 24,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    width: "100%",
    backgroundColor: `rgba(0, 0, 0, 0.2)`,
    justifyContent: "center",
  },
});
