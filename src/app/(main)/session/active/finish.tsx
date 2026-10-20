import { HomeScreen, HomeScreenTitle } from "@/component/screen/main/home-screen";
import { Button, Text, View } from "@/component/ui";
import { useActiveSession } from "@/context/active-session-context";
import { formatSeconds } from "@/utils/common/format-seconds";
import { useThemeColor } from "@/hook/use-theme-color";
import { CheckCircle2 } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function ActiveFinish() {
  const router = useRouter();
  const themeColor = useThemeColor();
  const { exercises, totalElapsed, endSession } = useActiveSession();

  useEffect(() => {
    endSession();
  }, [endSession]);

  return (
    <HomeScreen title={<HomeScreenTitle>Session Complete</HomeScreenTitle>}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View variant="ghost" style={styles.container}>
          <View variant="ghost" style={styles.iconWrapper}>
            <CheckCircle2 size={64} color={themeColor.primary} />
          </View>

          <Text size="xl3" weight="bold" style={styles.centerText}>
            Great work!
          </Text>
          <Text variant="muted" size="sm" style={styles.centerText}>
            {exercises.length} exercise{exercises.length > 1 ? "s" : ""}{" "}
            completed
          </Text>

          <View variant="card" style={styles.totalCard}>
            <Text variant="muted" size="sm">
              Total training time
            </Text>
            <Text size="xl6" weight="bold" style={styles.timerText}>
              {formatSeconds(totalElapsed)}
            </Text>
          </View>

          <Button full size="lg" onPress={() => router.replace("/home")}>
            <Text weight="semibold">Back to Home</Text>
          </Button>
        </View>
      </ScrollView>
    </HomeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingBottom: 40,
  },
  iconWrapper: {
    alignItems: "center",
    marginTop: 24,
  },
  centerText: {
    textAlign: "center",
  },
  timerText: {
    textAlign: "center",
    fontVariant: ["tabular-nums"],
  },
  totalCard: {
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    gap: 4,
    marginVertical: 8,
  },
});
