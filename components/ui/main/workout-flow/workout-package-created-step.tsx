import {
  CheckCircle,
  Dumbbell,
  List,
  Target,
  UserRound,
} from "lucide-react-native";

import type { ReactNode } from "react";

import { StyleSheet, View } from "react-native";

import UIButton from "@/components/ui/common/button";

import UIText from "@/components/ui/common/text";

import useThemeColor from "@/hooks/use-theme-color";

import type { WorkoutPackage } from "@/components/provider/workout-provider";

type WorkoutPackageCreatedStepProps = {
  workoutPackage: WorkoutPackage;
  onStart: () => void;
  onHome: () => void;
};

const getEquipmentIcon = (equipment: string) =>
  equipment === "Dumbbell" ? Dumbbell : UserRound;

export default function WorkoutPackageCreatedStep({
  workoutPackage,
  onStart,
  onHome,
}: WorkoutPackageCreatedStepProps) {
  const themeColor = useThemeColor();

  return (
    <View style={styles.container}>
      <View style={styles.successIcon}>
        <CheckCircle size={58} color={themeColor.primary} />
      </View>

      <UIText style={styles.title}>Workout Package Created!</UIText>

      <UIText variant="muted" style={styles.subtitle}>
        Your workout package has been created and is ready to use.
      </UIText>

      <View
        style={[
          styles.coverContainer,
          {
            backgroundColor: themeColor.card,
            borderColor: themeColor.border,
          },
        ]}
      >
        <View style={styles.coverIcons}>
          {workoutPackage.exercises.map((workout, index) => {
            const EquipmentIcon = getEquipmentIcon(workout.equipment);

            return (
              <View
                key={`${workout.exercise_id}-${index}`}
                style={[
                  styles.coverIcon,
                  {
                    backgroundColor: themeColor.background,
                    borderColor: themeColor.border,
                  },
                ]}
              >
                <EquipmentIcon
                  size={workoutPackage.exercises.length === 1 ? 48 : 32}
                  color={themeColor.primary}
                />
              </View>
            );
          })}
        </View>

        <View style={styles.coverContent}>
          <UIText style={styles.packageName}>{workoutPackage.name}</UIText>

          <UIText variant="muted" style={styles.exerciseCount}>
            {workoutPackage.exercises.length} Exercises
          </UIText>
        </View>
      </View>

      <View
        style={[
          styles.detailCard,
          {
            backgroundColor: themeColor.card,
            borderColor: themeColor.border,
          },
        ]}
      >
        <DetailRow
          icon={<Target size={20} color={themeColor.foreground} />}
          value={workoutPackage.target}
        />

        <DetailRow
          icon={<Dumbbell size={20} color={themeColor.foreground} />}
          value={workoutPackage.bodyPart}
        />

        <DetailRow
          icon={<Dumbbell size={20} color={themeColor.foreground} />}
          value={workoutPackage.equipment}
        />

        <DetailRow
          icon={<List size={20} color={themeColor.foreground} />}
          value={workoutPackage.category}
        />
      </View>

      <UIButton
        label="Start Workout  →"
        variant="primary"
        style={styles.mainButton}
        onPress={onStart}
      />

      <UIButton
        label="Back to Home"
        style={styles.secondaryButton}
        onPress={onHome}
      />
    </View>
  );
}

type DetailRowProps = {
  icon: ReactNode;
  value: string;
};

function DetailRow({ icon, value }: DetailRowProps) {
  return (
    <View style={styles.detailRow}>
      {icon}

      <UIText style={styles.detailValue}>{value}</UIText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },

  successIcon: {
    marginTop: 6,
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 12,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
    textAlign: "center",
  },

  coverContainer: {
    width: "100%",
    minHeight: 190,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    marginTop: 18,
    padding: 16,
    justifyContent: "space-between",
  },

  coverIcons: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  coverIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  coverContent: {
    marginTop: 12,
  },

  packageName: {
    fontSize: 22,
    fontWeight: "bold",
  },

  exerciseCount: {
    fontSize: 13,
    marginTop: 2,
  },

  detailCard: {
    width: "100%",
    marginTop: 14,
    padding: 14,
    borderWidth: 1,
    borderRadius: 10,
    gap: 12,
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  detailValue: {
    fontSize: 14,
  },

  mainButton: {
    width: "100%",
    height: 48,
    marginTop: 16,
    borderRadius: 8,
  },

  secondaryButton: {
    width: "100%",
    height: 48,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 8,
  },
});
