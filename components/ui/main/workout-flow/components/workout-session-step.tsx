import { List, Pause, Play } from "lucide-react-native";
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
    <View style={styles.container}>
      <UIText style={styles.title}>Workout Session</UIText>

      <UIText variant="muted" style={styles.subtitle}>
        Follow the instructions and complete your exercise.
      </UIText>

      <Image
        source={workout.image}
        style={[
          styles.sessionImage,
          {
            borderColor: themeColor.border,
          },
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
            styles.timerStatus,
            {
              backgroundColor: isPaused ? themeColor.card : themeColor.primary,
              borderColor: isPaused ? themeColor.border : themeColor.primary,
            },
          ]}
        >
          <UIText
            style={[
              styles.timerStatusText,
              {
                color: isPaused ? themeColor.mutedForeground : themeColor.white,
              },
            ]}
          >
            {isPaused ? "Paused" : "In Progress"}
          </UIText>
        </View>
      </View>

      <UIText style={styles.detailTitle}>{workout.title}</UIText>

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
          <List size={26} color={themeColor.foreground} />

          <UIText style={styles.sectionTitle}>Instructions</UIText>
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
                  {
                    backgroundColor: themeColor.primary,
                  },
                ]}
              >
                <UIText
                  style={[
                    styles.numberText,
                    {
                      color: themeColor.white,
                    },
                  ]}
                >
                  {index + 1}
                </UIText>
              </View>

              <UIText variant="muted" style={styles.description}>
                {instruction}
              </UIText>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.sessionButtons}>
        <UIButton
          style={[
            styles.secondaryButton,
            {
              borderColor: themeColor.border,
            },
          ]}
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
    fontSize: 16,
    lineHeight: 21,
    marginTop: 4,
  },

  sessionImage: {
    width: "100%",
    height: 220,
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 18,
  },

  timerCard: {
    minHeight: 115,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    paddingVertical: 12,
  },

  timerLabel: {
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 1,
  },

  timer: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 2,
  },

  timerStatus: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 4,
  },

  timerStatusText: {
    fontSize: 9,
    fontWeight: "600",
  },

  detailTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
  },

  instructionsCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginTop: 14,
  },

  instructionsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },

  instructions: {
    marginTop: 16,
    gap: 10,
  },

  instructionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },

  number: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },

  numberText: {
    fontSize: 14,
    fontWeight: "600",
  },

  description: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
    paddingTop: 5,
  },

  sessionButtons: {
    gap: 10,
    marginTop: 20,
    marginBottom: 20,
  },

  secondaryButton: {
    width: "100%",
    height: 48,
    borderRadius: 8,
  },

  mainButton: {
    width: "100%",
    height: 48,
    borderRadius: 8,
  },
});
