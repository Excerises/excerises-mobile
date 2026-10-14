import { Text, View } from "@/component/ui";
import { StyleSheet } from "react-native";

export default function Page() {
  return (
    <View style={styles.container}>
      <Text>Account Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
