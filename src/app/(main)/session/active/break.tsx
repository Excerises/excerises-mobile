import {
  HomeScreen,
  HomeScreenTitle,
} from "@/component/screen/main/home-screen";
import { Button, Text, View } from "@/component/ui";
import { Fonts } from "@/constant/theme";
import { useActiveSession } from "@/context/active-session-context";
import { useThemeColor } from "@/hook/use-theme-color";
import { formatSeconds } from "@/utils/common/format-seconds";
import { ArrowLeftIcon } from "lucide-react-native";
import { Redirect, useRouter } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function ActiveBreak() {
  const router = useRouter();
  const themeColor = useThemeColor();
  const {
    exercises,
    currentIndex,
    breakRemaining,
    totalElapsed,
    advanceFromBreak,
    endSession,
  } = useActiveSession();

  const advancedRef = useRef(false);

  const isLast = currentIndex >= exercises.length - 1;
  const nextExercise = exercises[currentIndex + 1];

  const goNext = useCallback(() => {
    if (advancedRef.current) return;
    advancedRef.current = true;

    if (!advanceFromBreak()) {
      router.push("/session/active/finish");
      return;
    }

    const next = exercises[currentIndex + 1];
    router.push(`/session/active/${encodeURIComponent(String(next.id))}`);
  }, [advanceFromBreak, currentIndex, exercises, router]);

  useEffect(() => {
    if (breakRemaining > 0 || advancedRef.current) return;
    goNext();
  }, [breakRemaining, goNext]);

  useEffect(() => {
    if (isLast && !advancedRef.current) {
      advancedRef.current = true;
      endSession();
      router.push("/session/active/finish");
    }
  }, [isLast, endSession, router]);

  if (exercises.length === 0) {
    return <Redirect href="/session/active" />;
  }

  return (
    <HomeScreen
      title={<HomeScreenTitle>Break</HomeScreenTitle>}
      actions={[
        {
          icon: (
            <ArrowLeftIcon size={Fonts.size.xl} color={themeColor.foreground} />
          ),
          onTap: () => router.back(),
        },
      ]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View variant="ghost" style={styles.container}>
          <View variant="card" style={styles.timerCard}>
            <Text size="xl7" weight="bold" style={styles.timerText}>
              {formatSeconds(breakRemaining)}
            </Text>
            <Text variant="muted" size="sm" style={styles.timerText}>
              Resting
            </Text>
          </View>

          <Text variant="muted" size="sm">
            Next exercise
          </Text>
          <View variant="card" style={styles.nextCard}>
            <Text size="lg" weight="semibold">
              {nextExercise?.name ?? "-"}
            </Text>
            <Text variant="muted" size="sm">
              {nextExercise?.description}
            </Text>
          </View>

          <View variant="card" style={styles.totalCard}>
            <Text variant="muted" size="sm">
              Total training time
            </Text>
            <Text size="xl3" weight="bold" style={styles.timerText}>
              {formatSeconds(totalElapsed)}
            </Text>
          </View>

          <Button full size="lg" onPress={goNext}>
            <Text weight="semibold">Skip Break</Text>
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
  timerCard: {
    padding: 32,
    borderRadius: 16,
    alignItems: "center",
    gap: 8,
    marginVertical: 8,
  },
  timerText: {
    textAlign: "center",
    fontVariant: ["tabular-nums"],
  },
  nextCard: {
    padding: 16,
    borderRadius: 12,
    gap: 4,
  },
  totalCard: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    gap: 4,
  },
});
