import { Frown, Meh, Smile } from "lucide-react-native";

import { useEffect, useState } from "react";

import { Pressable, StyleSheet, View } from "react-native";

import UIButton from "@/components/ui/common/button";
import UIText from "@/components/ui/common/text";

import useThemeColor from "@/hooks/use-theme-color";

import type { Exercise } from "@/components/data/Exercise";

export type Difficulty = "Too Easy" | "Just Right" | "Too Hard";

type WorkoutRestStepProps = {
  workout: Exercise;
  exerciseIndex: number;
  totalExercises: number;
  selectedDifficulty: Difficulty | undefined;
  onDifficultyChange: (value: Difficulty) => void;
  onContinue: () => void;
};

export default function WorkoutRestStep({
  workout,
  exerciseIndex,
  totalExercises,
  selectedDifficulty,
  onDifficultyChange,
  onContinue,
}: WorkoutRestStepProps) {
  const themeColor = useThemeColor();
  const [remainingSeconds, setRemainingSeconds] = useState(30);

  useEffect(() => {
    if (remainingSeconds <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setRemainingSeconds((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingSeconds]);

  const options: {
    label: Difficulty;
    icon: typeof Smile;
  }[] = [
    { label: "Too Easy", icon: Smile },
    { label: "Just Right", icon: Meh },
    { label: "Too Hard", icon: Frown },
  ];

  return (
    <View style={styles.container}>
      <UIText style={styles.title}>Rest</UIText>

      <UIText variant="muted" style={styles.subtitle}>
        Take a short break before the next exercise.
      </UIText>

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
          REST
        </UIText>

        <UIText style={styles.timer}>
          00:{String(remainingSeconds).padStart(2, "0")}
        </UIText>

        <UIText variant="muted" style={styles.exerciseText}>
          Exercise {exerciseIndex + 1} of {totalExercises}: {workout.exercise_name}
        </UIText>
      </View>

      <UIText style={styles.feedbackTitle}>
        How difficult was this exercise?
      </UIText>

      <UIText variant="muted" style={styles.feedbackSubtitle}>
        Your feedback helps personalize future workouts.
      </UIText>

      <View style={styles.options}>
        {options.map((option) => {
          const selected = selectedDifficulty === option.label;
          const Icon = option.icon;

          return (
            <Pressable
              key={option.label}
              style={[
                styles.option,
                {
                  backgroundColor: themeColor.card,
                  borderColor: selected
                    ? themeColor.primary
                    : themeColor.border,
                  borderWidth: selected ? 2 : 1,
                },
              ]}
              onPress={() => onDifficultyChange(option.label)}
            >
              <View
                style={[
                  styles.optionIcon,
                  {
                    backgroundColor: selected
                      ? themeColor.primary
                      : themeColor.border,
                  },
                ]}
              >
                <Icon
                  size={21}
                  color={selected ? themeColor.black : themeColor.foreground}
                />
              </View>

              <UIText style={styles.optionText}>
                {option.label}
              </UIText>
            </Pressable>
          );
        })}
      </View>

      <UIButton
        label={exerciseIndex + 1 === totalExercises ? "View Summary  →" : "Continue  →"}
        variant="primary"
        style={styles.mainButton}
        disabled={!selectedDifficulty}
        onPress={onContinue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 20,
    marginTop: 4,
  },

  timerCard: {
    minHeight: 155,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 22,
    padding: 14,
  },

  timerLabel: {
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 1,
  },

  timer: {
    fontSize: 42,
    fontWeight: "bold",
    marginTop: 3,
  },

  exerciseText: {
    fontSize: 11,
    textAlign: "center",
    marginTop: 4,
  },

  feedbackTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 22,
  },

  feedbackSubtitle: {
    fontSize: 12,
    lineHeight: 17,
    marginTop: 3,
  },

  options: {
    flexDirection: "row",
    gap: 8,
    marginTop: 14,
  },

  option: {
    flex: 1,
    minHeight: 92,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },

  optionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 7,
  },

  optionText: {
    fontSize: 10,
    fontWeight: "600",
    textAlign: "center",
  },

  mainButton: {
    width: "100%",
    height: 48,
    marginTop: 18,
    marginBottom: 20,
    borderRadius: 8,
  },
});
