import { Image, StyleSheet, View } from "react-native";

import UIButton from "@/components/ui/common/button";
import UIText from "@/components/ui/common/text";
import useThemeColor from "@/hooks/use-theme-color";

import type { Workout } from "@/components/data/workout-data";

type WorkoutDetailStepProps = {
  workout: Workout;
  onStart: () => void;
};

export default function WorkoutDetailStep({
  workout,
  onStart,
}: WorkoutDetailStepProps) {
  const themeColor = useThemeColor();

  return (
    <>
      <UIText style={styles.title}>Workout Details</UIText>

      <Image source={workout.image} style={styles.detailImage} />

      <UIText style={styles.detailTitle}>{workout.title}</UIText>

      <View
        style={[
          styles.detailGrid,
          {
            borderColor: themeColor.border,
          },
        ]}
      >
        <View style={styles.detailItem}>
          <UIText style={styles.detailLabel}>Body Part</UIText>

          <UIText style={styles.detailValue}>{workout.bodyPart}</UIText>
        </View>

        <View style={styles.detailItem}>
          <UIText style={styles.detailLabel}>Equipment</UIText>

          <UIText style={styles.detailValue}>{workout.equipment}</UIText>
        </View>

        <View style={styles.detailItem}>
          <UIText style={styles.detailLabel}>Difficulty</UIText>

          <UIText style={styles.detailValue}>{workout.difficulty}</UIText>
        </View>

        <View style={styles.detailItem}>
          <UIText style={styles.detailLabel}>Target</UIText>

          <UIText style={styles.detailValue}>{workout.target}</UIText>
        </View>
      </View>

      <UIText style={styles.sectionTitle}>Description</UIText>

      <UIText style={styles.description}>{workout.description}</UIText>

      <UIText style={styles.sectionTitle}>Secondary Muscles</UIText>

      <UIText style={styles.description}>{workout.secondaryMuscles}</UIText>

      <UIText style={styles.sectionTitle}>Instructions</UIText>

      <View style={styles.instructions}>
        {workout.instructions.map((instruction, index) => (
          <View key={`${index}-${instruction}`} style={styles.instructionItem}>
            <UIText style={styles.instructionNumber}>{index + 1}.</UIText>

            <UIText style={styles.description}>{instruction}</UIText>
          </View>
        ))}
      </View>

      <UIButton
        style={styles.mainButton}
        label="Start Workout"
        variant="primary"
        onPress={onStart}
      />
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },

  detailImage: {
    width: "100%",
    height: 220,
    borderRadius: 6,
    marginTop: 24,
  },

  detailTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 18,
  },

  detailGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 1,
    borderRadius: 6,
    marginTop: 18,
  },

  detailItem: {
    width: "50%",
    padding: 12,
    gap: 3,
  },

  detailLabel: {
    fontSize: 12,
  },

  detailValue: {
    fontSize: 16,
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 22,
  },

  description: {
    fontSize: 14,
    marginTop: 6,
    lineHeight: 21,
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

  mainButton: {
    width: "100%",
    height: 48,
    marginTop: 30,
    borderRadius: 6,
  },
});
