import { Dumbbell, List, Pencil, Target } from "lucide-react-native";

import type { ReactNode } from "react";
import { Image, StyleSheet, View } from "react-native";

import Input from "@/components/ui/common/input";
import UIButton from "@/components/ui/common/button";
import UIText from "@/components/ui/common/text";

import useThemeColor from "@/hooks/use-theme-color";

import type { Exercise } from "@/components/data/Exercise";

type WorkoutConfirmStepProps = {
  workoutName: string;
  target: string;
  bodyPart: string;
  equipment: string;
  category: string;
  workouts: Exercise[];
  onNameChange: (value: string) => void;
  onCreate: () => void;
};

export default function WorkoutConfirmStep({
  workoutName,
  target,
  bodyPart,
  equipment,
  category,
  workouts,
  onNameChange,
  onCreate,
}: WorkoutConfirmStepProps) {
  const themeColor = useThemeColor();

  return (
    <View style={styles.container}>
      <UIText style={styles.title}>Confirm Workout</UIText>

      <UIText style={styles.subtitle}>
        Review the exercises you selected before creating your package.
      </UIText>

      <View style={styles.formGroup}>
        <View style={styles.labelRow}>
          <UIText style={styles.label}>Workout Name</UIText>
          <Pencil size={17} color={themeColor.foreground} />
        </View>

        <Input
          value={workoutName}
          onChangeText={onNameChange}
          placeholder="My Workout #1"
          style={[
            styles.input,
            {
              borderWidth: 1,
              borderColor: themeColor.border,
            },
          ]}
        />
      </View>

      <View
        style={[
          styles.summaryCard,
          {
            backgroundColor: themeColor.card,
            borderColor: themeColor.border,
          },
        ]}
      >
        <SummaryRow label="Target" value={target} icon={<Target size={20} color={themeColor.foreground} />} />
        <SummaryRow label="Body Part" value={bodyPart} icon={<Target size={20} color={themeColor.foreground} />} />
        <SummaryRow label="Equipment" value={equipment} icon={<Dumbbell size={20} color={themeColor.foreground} />} />
        <SummaryRow label="Category" value={category} icon={<List size={20} color={themeColor.foreground} />} />
      </View>

      <UIText style={styles.exerciseTitle}>
        Exercises ({workouts.length})
      </UIText>

      <View style={styles.exerciseList}>
        {workouts.map((workout) => (
          <View
            key={workout.exercise_id}
            style={[
              styles.exerciseItem,
              {
                backgroundColor: themeColor.card,
                borderColor: themeColor.border,
              },
            ]}
          >
            <Image source={workout.image} style={styles.exerciseImage} />

            <View style={styles.exerciseContent}>
              <UIText style={styles.exerciseName} numberOfLines={1}>
                {workout.exercise_name}
              </UIText>

              <UIText variant="muted" style={styles.exerciseMeta}>
                {workout.body_part} • {workout.equipment}
              </UIText>
            </View>
          </View>
        ))}
      </View>

      <UIButton
        label="Create Workout Package  →"
        variant="primary"
        style={styles.mainButton}
        disabled={!workoutName.trim() || workouts.length === 0}
        onPress={onCreate}
      />
    </View>
  );
}

type SummaryRowProps = {
  label: string;
  value: string;
  icon: ReactNode;
};

function SummaryRow({ label, value, icon }: SummaryRowProps) {
  return (
    <View style={styles.summaryRow}>
      {icon}
      <View style={styles.summaryText}>
        <UIText variant="muted" style={styles.summaryLabel}>
          {label}
        </UIText>
        <UIText style={styles.summaryValue}>{value || "—"}</UIText>
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

  formGroup: {
    marginTop: 24,
  },

  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
  },

  input: {
    paddingHorizontal: 0,
    borderRadius: 8,
  },

  summaryCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginTop: 14,
    gap: 12,
  },

  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  summaryText: {
    flex: 1,
  },

  summaryLabel: {
    fontSize: 10,
  },

  summaryValue: {
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

  exerciseItem: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 7,
  },

  exerciseImage: {
    width: 52,
    height: 52,
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
    marginTop: 3,
  },

  mainButton: {
    width: "100%",
    height: 50,
    marginTop: 18,
    marginBottom: 20,
    borderRadius: 8,
  },
});
