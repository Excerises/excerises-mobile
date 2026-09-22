import { CheckCircle, Dumbbell, Frown, Meh, Smile } from "lucide-react-native";

import { useState } from "react";

import { Image, Pressable, StyleSheet, View } from "react-native";

import UIButton from "@/components/ui/common/button";

import UIText from "@/components/ui/common/text";

import useThemeColor from "@/hooks/use-theme-color";

import type { Exercise } from "@/components/data/Exercise";

type WorkoutCompleteStepProps = {
  workout: Exercise | null;
  elapsedTime: string;
  onDone: () => void;
};

export default function WorkoutCompleteStep({
  workout,
  elapsedTime,
  onDone,
}: WorkoutCompleteStepProps) {
  const themeColor = useThemeColor();

  const [difficulty, setDifficulty] = useState("");

  const difficultyOptions = [
    {
      label: "Too Easy",
      icon: Smile,
      color: themeColor.success,
    },
    {
      label: "Just Right",
      icon: Meh,
      color: themeColor.mutedForeground,
    },
    {
      label: "Too Hard",
      icon: Frown,
      color: themeColor.primary,
    },
  ];

  return (
    <View style={styles.container}>
      <CheckCircle size={58} color={themeColor.primary} />

      <UIText style={styles.title}>Workout Complete!</UIText>

      <UIText variant="muted" style={styles.subtitle}>
        Great job! You have completed your workout.
      </UIText>

      {workout && (
        <Image
          source={workout.image}
          style={[
            styles.completeImage,
            {
              borderColor: themeColor.border,
            },
          ]}
        />
      )}

      <View
        style={[
          styles.completeCard,
          {
            backgroundColor: themeColor.card,
            borderColor: themeColor.border,
          },
        ]}
      >
        <View style={styles.detailItem}>
          <UIText variant="muted" style={styles.detailLabel}>
            Duration
          </UIText>

          <UIText style={styles.detailValue}>{elapsedTime}</UIText>
        </View>

        <View style={styles.detailItem}>
          <UIText variant="muted" style={styles.detailLabel}>
            Status
          </UIText>

          <UIText style={styles.detailValue}>Completed</UIText>
        </View>
      </View>

      <View
        style={[
          styles.feedbackCard,
          {
            backgroundColor: themeColor.card,
            borderColor: themeColor.primary,
          },
        ]}
      >
        <View style={styles.feedbackHeader}>
          <View
            style={[
              styles.feedbackIcon,
              {
                backgroundColor: themeColor.destructive,
              },
            ]}
          >
            <Dumbbell size={24} color={themeColor.primary} />
          </View>

          <View style={styles.feedbackText}>
            <UIText style={styles.feedbackTitle}>
              How was the{" "}
              <UIText
                style={[
                  styles.feedbackTitle,
                  {
                    color: themeColor.primary,
                  },
                ]}
              >
                difficulty
              </UIText>
              ?
            </UIText>

            <UIText variant="muted" style={styles.feedbackSubtitle}>
              Let us know how this workout felt for you.
            </UIText>
          </View>
        </View>

        <View style={styles.options}>
          {difficultyOptions.map((option) => {
            const selected = difficulty === option.label;
            const Icon = option.icon;

            return (
              <Pressable
                key={option.label}
                style={[
                  styles.option,
                  {
                    backgroundColor: themeColor.background,
                    borderColor: selected
                      ? themeColor.primary
                      : themeColor.border,
                    borderWidth: selected ? 2 : 1,
                  },
                ]}
                onPress={() => setDifficulty(option.label)}
              >
                <View
                  style={[
                    styles.optionIcon,
                    {
                      backgroundColor: option.color,
                    },
                  ]}
                >
                  <Icon size={22} color={themeColor.white} strokeWidth={2.5} />
                </View>

                <UIText
                  style={[
                    styles.optionText,
                    {
                      color: themeColor.foreground,
                    },
                  ]}
                >
                  {option.label}
                </UIText>
              </Pressable>
            );
          })}
        </View>
      </View>

      <UIButton
        style={styles.mainButton}
        label="Done"
        variant="primary"
        onPress={onDone}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 12,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 13,
    marginTop: 3,
    textAlign: "center",
  },

  completeImage: {
    width: "100%",
    height: 200,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 18,
  },

  completeCard: {
    width: "100%",
    flexDirection: "row",
    marginTop: 14,
    padding: 14,
    borderWidth: 1,
    borderRadius: 10,
    gap: 20,
  },

  detailItem: {
    flex: 1,
  },

  detailLabel: {
    fontSize: 11,
  },

  detailValue: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 3,
  },

  feedbackCard: {
    width: "100%",
    marginTop: 14,
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
  },

  feedbackHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  feedbackIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },

  feedbackText: {
    flex: 1,
    marginLeft: 12,
  },

  feedbackTitle: {
    fontSize: 19,
    fontWeight: "bold",
  },

  feedbackSubtitle: {
    fontSize: 10,
    lineHeight: 14,
    marginTop: 2,
  },

  options: {
    flexDirection: "row",
    gap: 8,
    marginTop: 14,
  },

  option: {
    flex: 1,
    minHeight: 66,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    paddingVertical: 6,
  },

  optionIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },

  optionText: {
    fontSize: 9,
    fontWeight: "600",
    textAlign: "center",
  },

  mainButton: {
    width: "100%",
    height: 44,
    marginTop: 14,
    borderRadius: 8,
    marginBottom: 14,
  },
});
