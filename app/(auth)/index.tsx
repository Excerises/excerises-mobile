import UIButton from "@/components/ui/button";
import UIText from "@/components/ui/text";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

export default function Page() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View>
        <UIText style={styles.bannerText}>Smart Workout</UIText>
        <UIText
          style={[styles.bannerText, { fontWeight: "light" }]}
          variant="muted"
        >
          For a Better
        </UIText>
        <UIText style={styles.bannerText} variant="link">
          You
        </UIText>
      </View>
      <View>
        <UIText
          style={{
            fontSize: 18,
          }}
          variant="muted"
        >
          Get the best way to get fit with Artificial Intelligence. Start your
          journey now with us!
        </UIText>
      </View>
      <View>
        <View style={{ flexDirection: "row" }}>
          <UIButton
            style={styles.startButton}
            label="Start Now"
            onPress={() => router.push("/register")}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <UIText variant="muted">Already have an account? </UIText>
          <Pressable onPress={() => router.push("/login")}>
            <UIText variant="link">Log In here</UIText>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    gap: 30,
  },
  startButton: {
    width: "100%",
    borderRadius: 50,
  },
  bannerText: {
    fontSize: 46,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
