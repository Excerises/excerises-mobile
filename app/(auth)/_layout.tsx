import { Slot } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";

export default function Layout() {
  const { height } = useWindowDimensions();

  return (
    <ScrollView>
      <View style={[styles.container, { minHeight: height }]}>
        <Slot />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 80,
  },
});
