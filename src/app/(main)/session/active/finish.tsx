import { SessionActionBar } from "@/component/fitness";
import {
  HomeScreen,
  HomeScreenTitle,
} from "@/component/screen/main/home-screen";
import { Button, Text, View } from "@/component/ui";
import { Borders } from "@/constant/theme";
import { useActiveSession } from "@/context/active-session-context";
import { formatSeconds } from "@/utils/common/format-seconds";
import { useThemeColor } from "@/hook/use-theme-color";
import { ArrowRightIcon, CheckCircle2 } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useCreateSession } from "@/hook/api/session/use-save-session";

export default function ActiveFinish() {
  const router = useRouter();
  const themeColor = useThemeColor();
  const { exercises, totalElapsed, endSession } = useActiveSession();
  const { mutation: createSessionMutation } = useCreateSession();

  useEffect(() => {
    endSession();
  }, [endSession]);

  async function saveSessionAndBackHome() {
    const durationPerWorkout = totalElapsed / exercises.length;

    await createSessionMutation.mutateAsync({
      duration: totalElapsed,
      exercises: exercises.map((ex) => ({
        exercise_id: ex.id,
        duration: durationPerWorkout,
      })),
    });

    router.replace("/home");
  }

  return (
    <HomeScreen title={<HomeScreenTitle>Session Complete</HomeScreenTitle>}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View variant="ghost" style={styles.iconWrapper}>
          <View
            variant="ghost"
            style={[
              styles.iconHalo,
              { backgroundColor: `${themeColor.primary}1F` },
            ]}
          >
            <CheckCircle2 size={56} color={themeColor.primary} />
          </View>
        </View>

        <Text size="xl3" weight="bold" style={styles.centerText}>
          Great work!
        </Text>
        <Text variant="muted" size="sm" style={styles.centerText}>
          {exercises.length} exercise{exercises.length > 1 ? "s" : ""} completed
        </Text>

        <View variant="card" style={styles.totalCard}>
          <Text variant="muted" size="sm">
            Total training time
          </Text>
          <Text size="xl6" weight="bold" style={styles.timerText}>
            {formatSeconds(totalElapsed)}
          </Text>
        </View>
      </ScrollView>

      <SessionActionBar>
        <Button full size="lg" onPress={saveSessionAndBackHome}>
          <Text weight="semibold">Back to Home</Text>
          <ArrowRightIcon size={18} color={themeColor.foreground} />
        </Button>
      </SessionActionBar>
    </HomeScreen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    gap: 12,
    paddingTop: 8,
    paddingBottom: 24,
  },
  iconWrapper: {
    alignItems: "center",
    marginTop: 16,
  },
  iconHalo: {
    height: 104,
    width: 104,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
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
    borderRadius: Borders.radius.xl2,
    alignItems: "center",
    gap: 4,
    marginTop: 8,
  },
});
