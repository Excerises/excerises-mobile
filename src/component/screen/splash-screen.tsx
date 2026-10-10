import { Image, StyleSheet } from "react-native";
import { Text, View } from "../ui";
import Favicon from "@/assets/images/favicon.png";

export function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image source={Favicon} style={styles.icon} />
      <Text weight="bold" variant="muted">
        Excerises
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 120,
    width: 120,
  },
});
