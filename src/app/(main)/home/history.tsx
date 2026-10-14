import {
  HomeScreen,
  HomeScreenTitle,
} from "@/component/screen/main/home-screen";
import { Text, View } from "@/component/ui";
import { StyleSheet } from "react-native";

export default function Page() {
  return (
    <HomeScreen title={<HomeScreenTitle>Your History</HomeScreenTitle>}>
      <View style={styles.container}>
        <Text>History Page</Text>
      </View>
    </HomeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
