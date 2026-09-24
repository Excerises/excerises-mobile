import { Check, X } from "lucide-react-native";

import { Image, Pressable, StyleSheet, View } from "react-native";

import UIButton from "@/components/ui/common/button";
import UIText from "@/components/ui/common/text";

import useThemeColor from "@/hooks/use-theme-color";

import type { Exercise } from "@/components/data/Exercise";

type WorkoutRecommendationStepProps = {
  workouts: Exercise[];
  selectedWorkouts: Exercise[];
  onToggleSelect: (workout: Exercise) => void;
  onConfirm: () => void;
  onClear: () => void;
};

export default function WorkoutRecommendationStep({
  workouts,
  selectedWorkouts,
  onToggleSelect,
  onConfirm,
  onClear,
}: WorkoutRecommendationStepProps) {
  const themeColor = useThemeColor();

  const isSelected = (exerciseId: string) =>
    selectedWorkouts.some((workout) => workout.exercise_id === exerciseId);

  return (
    <View style={styles.container}>
      <UIText style={styles.title}>Select Workout</UIText>

      <UIText style={styles.subtitle}>
        Choose several exercises for your workout package.
      </UIText>

      <View style={styles.sectionHeader}>
        <View>
          <UIText style={styles.sectionTitle}>Recommended Workout</UIText>
          <UIText variant="muted" style={styles.sectionSubtitle}>
            Based on your preferences
          </UIText>
        </View>

        <UIText variant="muted" style={styles.workoutCount}>
          {workouts.length} workouts
        </UIText>
      </View>

      <View style={styles.list}>
        {workouts.map((workout) => {
          const selected = isSelected(workout.exercise_id);

          return (
            <Pressable
              key={workout.exercise_id}
              style={[
                styles.workoutCard,
                {
                  backgroundColor: themeColor.card,
                  borderColor: selected
                    ? themeColor.primary
                    : themeColor.border,
                },
              ]}
              onPress={() => onToggleSelect(workout)}
            >
              <Image source={workout.image} style={styles.workoutImage} />

              <View style={styles.workoutContent}>
                <UIText style={styles.workoutTitle} numberOfLines={1}>
                  {workout.exercise_name}
                </UIText>

                <UIText variant="muted" style={styles.infoText}>
                  {workout.body_part} • {workout.equipment}
                </UIText>
              </View>

              <View
                style={[
                  styles.checkbox,
                  {
                    backgroundColor: selected
                      ? themeColor.primary
                      : themeColor.card,
                    borderColor: selected
                      ? themeColor.primary
                      : themeColor.foreground,
                  },
                ]}
              >
                {selected && (
                  <Check
                    size={17}
                    color={themeColor.black}
                    strokeWidth={3}
                  />
                )}
              </View>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.selectedHeader}>
        <UIText style={styles.selectedTitle}>
          Selected Workout ({selectedWorkouts.length})
        </UIText>

        {selectedWorkouts.length > 0 && (
          <Pressable onPress={onClear}>
            <UIText
              style={[
                styles.clearText,
                { color: themeColor.primary },
              ]}
            >
              Clear All
            </UIText>
          </Pressable>
        )}
      </View>

      <View style={styles.selectedList}>
        {selectedWorkouts.map((workout) => (
          <View
            key={workout.exercise_id}
            style={[
              styles.selectedItem,
              {
                backgroundColor: themeColor.card,
                borderColor: themeColor.border,
              },
            ]}
          >
            <Image source={workout.image} style={styles.selectedImage} />

            <UIText style={styles.selectedItemText} numberOfLines={1}>
              {workout.exercise_name}
            </UIText>

            <Pressable onPress={() => onToggleSelect(workout)} hitSlop={8}>
              <X size={21} color={themeColor.foreground} />
            </Pressable>
          </View>
        ))}
      </View>

      <UIButton
        label="Confirm Workout  →"
        variant="primary"
        style={styles.mainButton}
        disabled={selectedWorkouts.length === 0}
        onPress={onConfirm}
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
    fontSize: 16,
    lineHeight: 21,
    marginTop: 4,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 26,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
  },

  sectionSubtitle: {
    fontSize: 12,
    marginTop: 3,
  },

  workoutCount: {
    fontSize: 12,
  },

  list: {
    gap: 8,
  },

  workoutCard: {
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 6,
  },

  workoutImage: {
    width: 54,
    height: 54,
    borderRadius: 8,
  },

  workoutContent: {
    flex: 1,
    marginHorizontal: 10,
  },

  workoutTitle: {
    fontSize: 14,
    fontWeight: "600",
  },

  infoText: {
    fontSize: 11,
    marginTop: 4,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
  },

  selectedHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 22,
    marginBottom: 10,
  },

  selectedTitle: {
    fontSize: 18,
    fontWeight: "600",
  },

  clearText: {
    fontSize: 12,
    fontWeight: "600",
  },

  selectedList: {
    gap: 8,
  },

  selectedItem: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },

  selectedImage: {
    width: 42,
    height: 42,
    borderRadius: 6,
  },

  selectedItemText: {
    flex: 1,
    fontSize: 12,
    fontWeight: "600",
    marginHorizontal: 10,
  },

  mainButton: {
    width: "100%",
    height: 50,
    marginTop: 18,
    marginBottom: 20,
    borderRadius: 8,
  },
});
