import {
  InstructionSheet,
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
import { useActiveSession } from "@/context/active-session-context";
import { useThemeColor } from "@/hook/use-theme-color";
import { capitalize } from "@/utils/common/text";
import { formatSeconds } from "@/utils/common/format";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  CircleHelp,
  PauseCircle,
  Timer as TimerIcon,
} from "lucide-react-native";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";

export default function ActiveWorkout() {
  const router = useRouter();
  const themeColor = useThemeColor();
  const { exerciseId } = useLocalSearchParams<{ exerciseId: string }>();
  const {
    exercises,
    currentIndex,
    currentElapsed,
    paused,
    setPaused,
    startWorkout,
    completeWorkout,
  } = useActiveSession();
  const [sheetOpen, setSheetOpen] = useState(false);

  const id = useMemo(() => decodeURIComponent(exerciseId ?? ""), [exerciseId]);
  const index = exercises.findIndex((exercise) => String(exercise.id) === id);

  useEffect(() => {
    if (index >= 0) {
      startWorkout(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (index < 0) {
    return <Redirect href="/session/active" />;
  }

  const exercise = exercises[index];
  const steps = exercise.instructions ?? [];
  const accent = difficultyColors[exercise.difficulty];
  const CategoryIcon = categoryIcons[exercise.category];

  const openSheet = () => {
    setSheetOpen(true);
    setPaused(true);
  };

  const closeSheet = () => {
    setSheetOpen(false);
    setPaused(false);
  };

  const onNext = () => {
    closeSheet();
    completeWorkout();

    if (currentIndex >= exercises.length - 1) {
      router.push("/session/active/finish");
    } else {
      router.push("/session/active/break");
    }
  };

  return (
    <HomeScreen
      title={<HomeScreenTitle>Active Session</HomeScreenTitle>}
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
        <View variant="card" style={styles.hero}>
          <View variant="ghost" style={styles.heroTop}>
            <View
              variant="ghost"
              style={[styles.iconChip, { backgroundColor: `${accent}24` }]}
            >
              <CategoryIcon size={26} color={accent} />
            </View>

            <View variant="ghost" style={styles.heroTitle}>
              <Text size="xs" variant="muted" weight="semibold">
                EXERCISE {index + 1} OF {exercises.length}
              </Text>
              <Text size="xl3" weight="bold">
                {exercise.name}
              </Text>
            </View>
          </View>

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
                {capitalize(exercise.difficulty)}
              </Text>
            </View>

            <View
              variant="ghost"
              style={[styles.badge, { backgroundColor: themeColor.muted }]}
            >
              <CategoryIcon size={13} color={themeColor.mutedForeground} />
              <Text size="xs" variant="muted" weight="medium">
                {categoryLabels[exercise.category]}
              </Text>
            </View>
          </View>

          <View variant="ghost" style={styles.metaRow}>
            {[
              { label: "Body part", value: capitalize(exercise.body_part) },
              { label: "Target", value: capitalize(exercise.target) },
              { label: "Equipment", value: capitalize(exercise.equipment) },
            ].map((item) => (
              <View
                key={item.label}
                variant="ghost"
                style={[styles.metaItem, { backgroundColor: themeColor.muted }]}
              >
                <Text size="xs" variant="muted">
                  {item.label}
                </Text>
                <Text size="sm" weight="semibold">
                  {item.value}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View variant="card" style={styles.timerCard}>
          <View variant="ghost" style={styles.timerHead}>
            <View
              variant="ghost"
              style={[
                styles.timerIcon,
                { backgroundColor: `${themeColor.primary}1F` },
              ]}
            >
              <TimerIcon size={15} color={themeColor.primary} />
            </View>
            <Text size="sm" variant="muted" weight="medium">
              Workout time
            </Text>
            {paused && (
              <View
                variant="ghost"
                style={[
                  styles.pausedBadge,
                  { backgroundColor: `${themeColor.primary}1F` },
                ]}
              >
                <PauseCircle size={12} color={themeColor.primary} />
                <Text size="xs" weight="semibold" variant="primary">
                  Paused
                </Text>
              </View>
            )}
          </View>
          <Text size="xl7" weight="bold" style={styles.timerText}>
            {formatSeconds(currentElapsed)}
          </Text>
        </View>

        <Pressable
          onPress={openSheet}
          accessibilityRole="button"
          accessibilityLabel="How to perform this exercise"
        >
          <View variant="card" style={styles.howTo}>
            <View
              variant="ghost"
              style={[
                styles.howToIcon,
                { backgroundColor: `${themeColor.primary}1F` },
              ]}
            >
              <CircleHelp size={22} color={themeColor.primary} />
            </View>
            <View variant="ghost" style={styles.howToText}>
              <Text size="md" weight="semibold">
                How to perform
              </Text>
              <Text size="xs" variant="muted">
                {steps.length} step{steps.length === 1 ? "" : "s"} • timer
                pauses while you read
              </Text>
            </View>
            <ChevronRightIcon size={20} color={themeColor.mutedForeground} />
          </View>
        </Pressable>

        <View variant="card" style={styles.aboutCard}>
          <Text size="sm" weight="semibold">
            About this exercise
          </Text>
          <Text size="sm" variant="muted" style={styles.aboutText}>
            {exercise.description}
          </Text>

          {exercise.secondary_muscles?.length > 0 && (
            <View variant="ghost" style={styles.secondaryBlock}>
              <Text
                size="xs"
                variant="muted"
                weight="semibold"
                style={styles.sectionLabel}
              >
                Secondary muscles
              </Text>
              <View variant="ghost" style={styles.chipRow}>
                {exercise.secondary_muscles.map((muscle) => (
                  <View
                    key={muscle}
                    variant="ghost"
                    style={[styles.chip, { backgroundColor: themeColor.muted }]}
                  >
                    <Text size="xs" variant="muted">
                      {capitalize(muscle)}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <SessionActionBar>
        <Button full size="lg" onPress={onNext}>
          <Text weight="semibold">Next</Text>
          <ArrowRightIcon size={18} color={themeColor.foreground} />
        </Button>
      </SessionActionBar>

      <InstructionSheet
        exercise={exercise}
        visible={sheetOpen}
        onClose={closeSheet}
      />
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
  hero: {
    padding: 16,
    borderRadius: Borders.radius.xl2,
    gap: 14,
  },
  heroTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  iconChip: {
    height: 52,
    width: 52,
    borderRadius: Borders.radius.xl2,
    alignItems: "center",
    justifyContent: "center",
  },
  heroTitle: {
    flex: 1,
    gap: 4,
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
  },
  badgeDot: {
    height: 7,
    width: 7,
    borderRadius: 9999,
  },
  metaRow: {
    flexDirection: "row",
    gap: 8,
  },
  metaItem: {
    flex: 1,
    minWidth: 0,
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: Borders.radius.xl,
  },
  timerCard: {
    padding: 24,
    borderRadius: Borders.radius.xl2,
    alignItems: "center",
    gap: 8,
  },
  timerHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  timerIcon: {
    height: 26,
    width: 26,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
  pausedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 9999,
    marginLeft: 4,
  },
  timerText: {
    textAlign: "center",
    fontVariant: ["tabular-nums"],
  },
  howTo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: Borders.radius.xl2,
  },
  howToIcon: {
    height: 44,
    width: 44,
    borderRadius: Borders.radius.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  howToText: {
    flex: 1,
    gap: 3,
  },
  aboutCard: {
    padding: 16,
    borderRadius: Borders.radius.xl2,
    gap: 8,
  },
  aboutText: {
    lineHeight: 21,
  },
  secondaryBlock: {
    gap: 8,
    marginTop: 4,
  },
  sectionLabel: {
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  chipRow: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 9999,
  },
});
