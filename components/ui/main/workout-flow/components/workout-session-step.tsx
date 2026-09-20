import { Pause, Play } from "lucide-react-native";
import { Image, StyleSheet, View } from "react-native";

import UIButton from "@/components/ui/common/button";
import UIText from "@/components/ui/common/text";
import useThemeColor from "@/hooks/use-theme-color";

import type { Workout } from "@/components/data/workout-data";

type WorkoutSessionStepProps = {
  workout: Workout;
  elapsedTime: string;
  isPaused: boolean;
  onTogglePause: () => void;
  onFinish: () => void;
};

export default function WorkoutSessionStep({
  workout,
  elapsedTime,
  isPaused,
  onTogglePause,
  onFinish,
}: WorkoutSessionStepProps) {
  const themeColor = useThemeColor();

  return (
    <>
      <UIText style={styles.title}>Workout Session</UIText>

      <UIText style={styles.subtitle}>
        Follow the instructions and complete your exercise.
      </UIText>

      <Image source={workout.image} style={styles.sessionImage} />

      <View style={styles.timerContainer}>
        <UIText style={styles.timer}>{elapsedTime}</UIText>
      </View>

      <UIText style={styles.detailTitle}>{workout.title}</UIText>

      <UIText style={styles.sectionTitle}>Instructions</UIText>

      <View style={styles.instructions}>
        {workout.instructions.map((instruction, index) => (
          <View key={`${index}-${instruction}`} style={styles.instructionItem}>
            <UIText style={styles.instructionNumber}>{index + 1}.</UIText>

            <UIText style={styles.description}>{instruction}</UIText>
          </View>
        ))}
      </View>

      <View style={styles.sessionButtons}>
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
          label="Finish Workout"
          variant="primary"
          onPress={onFinish}
        />
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

  sessionImage: {
    width: "100%",
    height: 240,
    borderRadius: 6,
    marginTop: 24,
  },

  timerContainer: {
    alignItems: "center",
    marginTop: 24,
  },

  timer: {
    fontSize: 42,
    fontWeight: "bold",
  },

  detailTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 18,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 22,
  },

  instructions: {
    marginTop: 8,
    gap: 8,
  },

  instructionItem: {
    flexDirection: "row",
    gap: 8,
  },

  instructionNumber: {
    fontSize: 14,
    fontWeight: "600",
  },

  description: {
    fontSize: 14,
    marginTop: 6,
    lineHeight: 21,
  },

  sessionButtons: {
    gap: 10,
    marginTop: 20,
  },

  secondaryButton: {
    width: "100%",
    height: 48,
    borderRadius: 6,
  },

  mainButton: {
    width: "100%",
    height: 48,
    borderRadius: 6,
  },
});
