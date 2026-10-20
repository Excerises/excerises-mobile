import { HomeScreen, HomeScreenTitle } from "@/component/screen/main/home-screen";
import { Button, Text, View } from "@/component/ui";
import { Fonts } from "@/constant/theme";
import { useActiveSession } from "@/context/active-session-context";
import { useThemeColor } from "@/hook/use-theme-color";
import { formatSeconds } from "@/utils/common/format-seconds";
import { ArrowLeftIcon } from "lucide-react-native";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function ActiveWorkout() {
  const router = useRouter();
  const themeColor = useThemeColor();
  const { exerciseId } = useLocalSearchParams<{ exerciseId: string }>();
  const {
    exercises,
    currentIndex,
    currentElapsed,
    startWorkout,
    completeWorkout,
  } = useActiveSession();

  const id = useMemo(() => decodeURIComponent(exerciseId ?? ""), [exerciseId]);
  const index = exercises.findIndex(
    (exercise) => String(exercise.id) === id
  );

  useEffect(() => {
    if (index >= 0) {
      startWorkout(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, index]);

  if (index < 0) {
    return <Redirect href="/session/active" />;
  }

  const exercise = exercises[index];

  const onNext = () => {
    completeWorkout();

    if (currentIndex >= exercises.length - 1) {
      router.replace("/session/active/finish");
    } else {
      router.replace("/session/active/break");
    }
  };

  return (
    <HomeScreen
      title={<HomeScreenTitle>Active Session</HomeScreenTitle>}
      actions={[
        {
          icon: (
            <ArrowLeftIcon
              size={Fonts.size.xl}
              color={themeColor.foreground}
            />
          ),
          onTap: () => router.back(),
        },
      ]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View variant="ghost" style={styles.container}>
          <Text variant="muted" size="sm">
            Exercise {index + 1} of {exercises.length}
          </Text>
          <Text size="xl3" weight="bold">
            {exercise.name}
          </Text>
          <Text variant="muted" size="sm">
            {exercise.description}
          </Text>

          <View variant="card" style={styles.timerCard}>
            <Text
              size="xl7"
              weight="bold"
              style={styles.timerText}
            >
              {formatSeconds(currentElapsed)}
            </Text>
            <Text variant="muted" size="sm" style={styles.timerText}>
              Workout time
            </Text>
          </View>

          <Button full size="lg" onPress={onNext}>
            <Text weight="semibold">Next</Text>
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
});
