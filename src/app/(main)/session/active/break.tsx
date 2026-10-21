import {
  SessionActionBar,
  categoryIcons,
  categoryLabels,
  difficultyColors,
} from "@/component/fitness";
import {
  HomeScreen,
  HomeScreenTitle,
} from "@/component/screen/main/home-screen";
import { Button, Text, View } from "@/component/ui";
import { Borders, Fonts } from "@/constant/theme";
import {
  BREAK_SECONDS,
  useActiveSession,
} from "@/context/active-session-context";
import { useThemeColor } from "@/hook/use-theme-color";
import { capitalize } from "@/utils/common/text";
import { formatSeconds } from "@/utils/common/format-seconds";
import { ArrowLeftIcon, Hourglass, SkipForwardIcon } from "lucide-react-native";
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

  const restProgress =
    (BREAK_SECONDS - Math.min(breakRemaining, BREAK_SECONDS)) / BREAK_SECONDS;
  const accent = nextExercise
    ? difficultyColors[nextExercise.difficulty]
    : themeColor.primary;
  const NextCategoryIcon = nextExercise
    ? categoryIcons[nextExercise.category]
    : Hourglass;

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
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View variant="card" style={styles.timerCard}>
          <View
            variant="ghost"
            style={[
              styles.restChip,
              { backgroundColor: `${themeColor.primary}1F` },
            ]}
          >
            <Hourglass size={26} color={themeColor.primary} />
          </View>

          <Text size="xl7" weight="bold" style={styles.timerText}>
            {formatSeconds(breakRemaining)}
          </Text>
          <Text variant="muted" size="sm" weight="medium">
            Resting — catch your breath
          </Text>

          <View
            variant="ghost"
            style={[
              styles.progressTrack,
              { backgroundColor: themeColor.muted },
            ]}
          >
            <View
              variant="ghost"
              style={[
                styles.progressFill,
                {
                  width: `${Math.round(restProgress * 100)}%`,
                  backgroundColor: themeColor.primary,
                },
              ]}
            />
          </View>
        </View>

        <View variant="ghost" style={styles.sectionHead}>
          <Text variant="muted" size="sm" weight="semibold">
            NEXT EXERCISE
          </Text>
          <Text variant="muted" size="sm">
            {currentIndex + 2} of {exercises.length}
          </Text>
        </View>

        <View variant="card" style={styles.nextCard}>
          <View
            variant="ghost"
            style={[styles.iconChip, { backgroundColor: `${accent}24` }]}
          >
            <NextCategoryIcon size={24} color={accent} />
          </View>
          <View variant="ghost" style={styles.nextText}>
            <Text size="lg" weight="semibold">
              {nextExercise?.name ?? "-"}
            </Text>
            {nextExercise && (
              <View variant="ghost" style={styles.badgeRow}>
                <View
                  variant="ghost"
                  style={[styles.badge, { backgroundColor: `${accent}1F` }]}
                >
                  <View
                    variant="ghost"
                    style={[styles.badgeDot, { backgroundColor: accent }]}
                  />
                  <Text size="xs" weight="semibold" style={{ color: accent }}>
                    {capitalize(nextExercise.difficulty)}
                  </Text>
                </View>
                <View
                  variant="ghost"
                  style={[styles.badge, { backgroundColor: themeColor.muted }]}
                >
                  <Text size="xs" variant="muted" weight="medium">
                    {categoryLabels[nextExercise.category]}
                  </Text>
                </View>
              </View>
            )}
            <Text variant="muted" size="sm" style={styles.nextDescription}>
              {nextExercise?.description}
            </Text>
          </View>
        </View>

        <View variant="card" style={styles.totalCard}>
          <Text variant="muted" size="sm">
            Total training time
          </Text>
          <Text size="xl3" weight="bold" style={styles.timerText}>
            {formatSeconds(totalElapsed)}
          </Text>
        </View>
      </ScrollView>

      <SessionActionBar>
        <Button full size="lg" onPress={goNext}>
          <Text weight="semibold">Skip Break</Text>
          <SkipForwardIcon size={18} color={themeColor.foreground} />
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
    gap: 16,
    paddingTop: 4,
    paddingBottom: 24,
  },
  timerCard: {
    padding: 24,
    borderRadius: Borders.radius.xl2,
    alignItems: "center",
    gap: 8,
  },
  restChip: {
    height: 56,
    width: 56,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  timerText: {
    textAlign: "center",
    fontVariant: ["tabular-nums"],
  },
  progressTrack: {
    height: 6,
    borderRadius: 9999,
    overflow: "hidden",
    alignSelf: "stretch",
    marginTop: 8,
  },
  progressFill: {
    height: 6,
    borderRadius: 9999,
  },
  sectionHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  nextCard: {
    flexDirection: "row",
    gap: 14,
    padding: 16,
    borderRadius: Borders.radius.xl2,
    alignItems: "flex-start",
  },
  iconChip: {
    height: 48,
    width: 48,
    borderRadius: Borders.radius.xl2,
    alignItems: "center",
    justifyContent: "center",
  },
  nextText: {
    flex: 1,
    gap: 8,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 9999,
    alignSelf: "flex-start",
  },
  badgeDot: {
    height: 7,
    width: 7,
    borderRadius: 9999,
  },
  nextDescription: {
    lineHeight: 20,
  },
  totalCard: {
    padding: 16,
    borderRadius: Borders.radius.xl2,
    alignItems: "center",
    gap: 4,
  },
});
