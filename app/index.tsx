import useThemeColor from "@/hooks/use-theme-color";
import { Image, StyleSheet, View } from "react-native";
import Icon from "@/assets/img/favicon.png";

export default function IndexPage() {
  const color = useThemeColor();
  const size = 120;

  return (
    <View style={[styles.container, { backgroundColor: color.background }]}>
      <Image
        source={Icon as any}
        style={{ width: size, height: size, backgroundColor: "transparent" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    borderRadius: 9999,
    height: 130,
    width: 130,
    alignItems: "center",
    justifyContent: "center",
  },
});
