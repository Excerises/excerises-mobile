import { useLocalSearchParams, useRouter } from "expo-router";

import { ScrollView, StyleSheet, View } from "react-native";

import {
  getExerciseById,
  getHistoryWorkoutById,
  createWorkoutHistoryGroups,
} from "@/components/data/History";
import { type Exercise } from "@/components/data/Exercise";
import HistoryHeader from "@/components/ui/main/history/history-header";
import WorkoutHistoryDetail from "@/components/ui/main/history/workout-history-detail";
import WorkoutHistoryList from "@/components/ui/main/history/workout-history-list";

import useThemeColor from "@/hooks/use-theme-color";

const historyGroups = createWorkoutHistoryGroups();

export default function HistoryScreen() {
  const router = useRouter();
  const themeColor = useThemeColor();
  const { workoutId } = useLocalSearchParams<{ workoutId?: string }>();

  const workout =
    typeof workoutId === "string"
      ? getHistoryWorkoutById(workoutId)
      : undefined;

  const workoutExercises = workout
    ? workout.historyItems
        .map((item) => getExerciseById(item.exercise_id))
        .filter(Boolean)
    : [];

  if (workout) {
    return (
      <WorkoutHistoryDetail
        workout={workout}
        exercises={workoutExercises as Exercise[]}
      />
    );
  }

  const handleViewHistory = (selectedWorkoutId: string) => {
    router.push({
      pathname: "/(main)/history",
      params: {
        workoutId: selectedWorkoutId,
      },
    });
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeColor.background,
        },
      ]}
    >
      <View style={styles.headerContainer}>
        <HistoryHeader />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <WorkoutHistoryList
          groups={historyGroups}
          onViewWorkout={(selectedWorkout) =>
            handleViewHistory(selectedWorkout.id)
          }
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 8,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 3,
    paddingBottom: 24,
  },
});
