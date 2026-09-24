import { List, Pause, Play } from "lucide-react-native";

import { Image, StyleSheet, View } from "react-native";

import UIButton from "@/components/ui/common/button";
import UIText from "@/components/ui/common/text";

import useThemeColor from "@/hooks/use-theme-color";

import type { Exercise } from "@/components/data/Exercise";

type WorkoutSessionStepProps = {
  workout: Exercise;
  exerciseIndex: number;
  totalExercises: number;
  elapsedTime: string;
  isPaused: boolean;
  onTogglePause: () => void;
  onFinishExercise: () => void;
};

export default function WorkoutSessionStep({
  workout,
  exerciseIndex,
  totalExercises,
  elapsedTime,
  isPaused,
  onTogglePause,
  onFinishExercise,
}: WorkoutSessionStepProps) {
  const themeColor = useThemeColor();

  return (
    <View style={styles.container}>
      <UIText style={styles.title}>
        Exercise {exerciseIndex + 1} of {totalExercises}
      </UIText>

      <UIText style={styles.exerciseName}>
        {workout.exercise_name}
      </UIText>

      <UIText variant="muted" style={styles.subtitle}>
        {workout.body_part} • {workout.equipment}
      </UIText>

      <Image
        source={workout.image}
        style={[
          styles.sessionImage,
          { borderColor: themeColor.border },
        ]}
      />

      <View
        style={[
          styles.timerCard,
          {
            backgroundColor: themeColor.card,
            borderColor: themeColor.border,
          },
        ]}
      >
        <UIText variant="muted" style={styles.timerLabel}>
          TIME
        </UIText>

        <UIText style={styles.timer}>{elapsedTime}</UIText>

        <View
          style={[
            styles.status,
            {
              backgroundColor: isPaused
                ? themeColor.card
                : themeColor.primary,
              borderColor: isPaused
                ? themeColor.border
                : themeColor.primary,
            },
          ]}
        >
          <UIText
            style={[
              styles.statusText,
              {
                color: isPaused
                  ? themeColor.mutedForeground
                  : themeColor.black,
              },
            ]}
          >
            {isPaused ? "Paused" : "In Progress"}
          </UIText>
        </View>
      </View>

      <View
        style={[
          styles.instructionsCard,
          {
            backgroundColor: themeColor.card,
            borderColor: themeColor.border,
          },
        ]}
      >
        <View style={styles.instructionsHeader}>
          <List size={24} color={themeColor.foreground} />
          <UIText style={styles.instructionsTitle}>Instructions</UIText>
        </View>

        <View style={styles.instructions}>
          {workout.instructions.map((instruction, index) => (
            <View
              key={`${index}-${instruction}`}
              style={styles.instructionItem}
            >
              <View
                style={[
                  styles.number,
                  { backgroundColor: themeColor.primary },
                ]}
              >
                <UIText
                  style={[
                    styles.numberText,
                    { color: themeColor.black },
                  ]}
                >
                  {index + 1}
                </UIText>
              </View>

              <UIText variant="muted" style={styles.instructionText}>
                {instruction}
              </UIText>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.buttons}>
        <UIButton
          style={styles.secondaryButton}
          icon={
            isPaused ? (
              <Play size={18} color={themeColor.foreground} />
            ) : (
              <Pause size={18} color={themeColor.foreground} />
            )
          }
          label={isPaused ? "Resume" : "Pause"}
          onPress={onTogglePause}
        />

        <UIButton
          style={styles.mainButton}
          label="Complete Exercise  →"
          variant="primary"
          onPress={onFinishExercise}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
  },

  exerciseName: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 18,
  },

  subtitle: {
    fontSize: 12,
    marginTop: 3,
  },

  sessionImage: {
    width: "100%",
    height: 210,
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 16,
  },

  timerCard: {
    minHeight: 110,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
    paddingVertical: 10,
  },

  timerLabel: {
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 1,
  },

  timer: {
    fontSize: 38,
    fontWeight: "bold",
    marginTop: 2,
  },

  status: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 4,
  },

  statusText: {
    fontSize: 9,
    fontWeight: "600",
  },

  instructionsCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginTop: 14,
  },

  instructionsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  instructionsTitle: {
    fontSize: 18,
    fontWeight: "600",
  },

  instructions: {
    gap: 10,
    marginTop: 14,
  },

  instructionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },

  number: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  numberText: {
    fontSize: 13,
    fontWeight: "600",
  },

  instructionText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    paddingTop: 4,
  },

  buttons: {
    gap: 10,
    marginTop: 18,
    marginBottom: 20,
  },

  secondaryButton: {
    width: "100%",
    height: 46,
    borderRadius: 8,
  },

  mainButton: {
    width: "100%",
    height: 48,
    borderRadius: 8,
  },
});
