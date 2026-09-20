import { StyleSheet, View } from "react-native";

import UIText from "@/components/ui/common/text";
import WorkoutCard from "@/components/ui/main/workout-flow/workout-card";

import type { Workout } from "@/components/data/workout-data";

type WorkoutRecommendationStepProps = {
  workouts: Workout[];
  onSelect: (workout: Workout) => void;
};

export default function WorkoutRecommendationStep({
  workouts,
  onSelect,
}: WorkoutRecommendationStepProps) {
  return (
    <>
      <UIText style={styles.title}>Recommended Workout</UIText>

      <UIText style={styles.subtitle}>
        Choose a workout from the list below.
      </UIText>

      <View style={styles.list}>
        {workouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
            onPress={() => onSelect(workout)}
          />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },

  list: {
    marginTop: 26,
    gap: 12,
  },
});
