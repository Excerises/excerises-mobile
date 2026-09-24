import { Dumbbell, List, Target } from "lucide-react-native";

import type { ReactNode } from "react";
import { Image, StyleSheet, View } from "react-native";

import UIButton from "@/components/ui/common/button";
import UIText from "@/components/ui/common/text";

import useThemeColor from "@/hooks/use-theme-color";

import type { WorkoutPackage } from "@/components/provider/workout-provider";

type WorkoutDetailStepProps = {
  workoutPackage: WorkoutPackage;
  onStart: () => void;
};

export default function WorkoutDetailStep({
  workoutPackage,
  onStart,
}: WorkoutDetailStepProps) {
  const themeColor = useThemeColor();

  return (
    <View style={styles.container}>
      <UIText style={styles.title}>Workout Detail</UIText>

      <UIText style={styles.packageName}>
        {workoutPackage.name}
      </UIText>

      <UIText variant="muted" style={styles.subtitle}>
        {workoutPackage.exercises.length} Exercises
      </UIText>

      <View
        style={[
          styles.summaryCard,
          {
            backgroundColor: themeColor.card,
            borderColor: themeColor.border,
          },
        ]}
      >
        <DetailRow
          icon={<Target size={22} color={themeColor.primary} />}
          label="Target"
          value={workoutPackage.target}
        />
        <DetailRow
          icon={<Target size={22} color={themeColor.primary} />}
          label="Body Part"
          value={workoutPackage.bodyPart}
        />
        <DetailRow
          icon={<Dumbbell size={22} color={themeColor.primary} />}
          label="Equipment"
          value={workoutPackage.equipment}
        />
        <DetailRow
          icon={<List size={22} color={themeColor.primary} />}
          label="Category"
          value={workoutPackage.category}
        />
      </View>

      <UIText style={styles.exerciseTitle}>
        Exercises ({workoutPackage.exercises.length})
      </UIText>

      <View style={styles.exerciseList}>
        {workoutPackage.exercises.map((workout, index) => (
          <View
            key={workout.exercise_id}
            style={[
              styles.exerciseCard,
              {
                backgroundColor: themeColor.card,
                borderColor: themeColor.border,
              },
            ]}
          >
            <Image source={workout.image} style={styles.exerciseImage} />

            <View style={styles.exerciseContent}>
              <UIText style={styles.exerciseName}>
                {index + 1}. {workout.exercise_name}
              </UIText>

              <UIText variant="muted" style={styles.exerciseMeta}>
                {workout.body_part} • {workout.equipment}
              </UIText>
            </View>
          </View>
        ))}
      </View>

      <UIButton
        label="Start Workout  →"
        variant="primary"
        style={styles.mainButton}
        onPress={onStart}
      />
    </View>
  );
}

type DetailRowProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

function DetailRow({ icon, label, value }: DetailRowProps) {
  return (
    <View style={styles.detailRow}>
      {icon}
      <View style={styles.detailText}>
        <UIText variant="muted" style={styles.detailLabel}>
          {label}
        </UIText>
        <UIText style={styles.detailValue}>{value || "—"}</UIText>
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

  packageName: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 18,
  },

  subtitle: {
    fontSize: 13,
    marginTop: 3,
  },

  summaryCard: {
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 14,
    padding: 14,
    gap: 12,
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  detailText: {
    flex: 1,
  },

  detailLabel: {
    fontSize: 10,
  },

  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 1,
  },

  exerciseTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },

  exerciseList: {
    gap: 8,
  },

  exerciseCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 7,
  },

  exerciseImage: {
    width: 58,
    height: 58,
    borderRadius: 8,
  },

  exerciseContent: {
    flex: 1,
    marginLeft: 10,
  },

  exerciseName: {
    fontSize: 14,
    fontWeight: "600",
  },

  exerciseMeta: {
    fontSize: 11,
    marginTop: 4,
  },

  mainButton: {
    width: "100%",
    height: 50,
    marginTop: 18,
    marginBottom: 20,
    borderRadius: 8,
  },
});
