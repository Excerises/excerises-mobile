import { CheckCircle, Clock3 } from "lucide-react-native";

import { StyleSheet, View } from "react-native";

import UIButton from "@/components/ui/common/button";
import UIText from "@/components/ui/common/text";

import useThemeColor from "@/hooks/use-theme-color";

import type { Exercise } from "@/components/data/Exercise";
import type { Difficulty } from "@/components/ui/main/workout-flow/workout-rest-step";

type WorkoutSummaryStepProps = {
  workoutName: string;
  exercises: Exercise[];
  difficultyFeedback: Record<string, Difficulty>;
  elapsedTime: string;
  onDone: () => void;
};

export default function WorkoutSummaryStep({
  workoutName,
  exercises,
  difficultyFeedback,
  elapsedTime,
  onDone,
}: WorkoutSummaryStepProps) {
  const themeColor = useThemeColor();

  return (
    <View style={styles.container}>
      <CheckCircle size={58} color={themeColor.primary} />

      <UIText style={styles.title}>Workout Complete!</UIText>

      <UIText variant="muted" style={styles.subtitle}>
        {workoutName} · {exercises.length} Exercises
      </UIText>

      <View
        style={[
          styles.durationCard,
          {
            backgroundColor: themeColor.card,
            borderColor: themeColor.border,
          },
        ]}
      >
        <Clock3 size={22} color={themeColor.primary} />
        <View>
          <UIText variant="muted" style={styles.durationLabel}>
            Total Duration
          </UIText>
          <UIText style={styles.durationValue}>{elapsedTime}</UIText>
        </View>
      </View>

      <UIText style={styles.feedbackTitle}>
        Difficulty Results
      </UIText>

      <View style={styles.results}>
        {exercises.map((exercise) => (
          <View
            key={exercise.exercise_id}
            style={[
              styles.resultCard,
              {
                backgroundColor: themeColor.card,
                borderColor: themeColor.border,
              },
            ]}
          >
            <View style={styles.resultText}>
              <UIText style={styles.exerciseName}>
                {exercise.exercise_name}
              </UIText>
              <UIText variant="muted" style={styles.exerciseMeta}>
                {exercise.body_part} • {exercise.equipment}
              </UIText>
            </View>

            <UIText
              style={[
                styles.difficulty,
                { color: themeColor.success },
              ]}
            >
              {difficultyFeedback[exercise.exercise_id] ?? "—"}
            </UIText>
          </View>
        ))}
      </View>

      <UIButton
        label="Done"
        variant="primary"
        style={styles.mainButton}
        onPress={onDone}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 12,
  },

  subtitle: {
    fontSize: 13,
    marginTop: 3,
    textAlign: "center",
  },

  durationCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 18,
    padding: 14,
    borderWidth: 1,
    borderRadius: 10,
  },

  durationLabel: {
    fontSize: 10,
  },

  durationValue: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 2,
  },

  feedbackTitle: {
    alignSelf: "flex-start",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 22,
    marginBottom: 10,
  },

  results: {
    width: "100%",
    gap: 8,
  },

  resultCard: {
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  resultText: {
    flex: 1,
  },

  exerciseName: {
    fontSize: 13,
    fontWeight: "600",
  },

  exerciseMeta: {
    fontSize: 10,
    marginTop: 2,
  },

  difficulty: {
    fontSize: 11,
    fontWeight: "700",
    marginLeft: 8,
  },

  mainButton: {
    width: "100%",
    height: 48,
    marginTop: 18,
    marginBottom: 20,
    borderRadius: 8,
  },
});
