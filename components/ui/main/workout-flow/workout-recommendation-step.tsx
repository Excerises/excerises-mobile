import {
  Check,
  ChevronDown,
  ChevronUp,
  Dumbbell,
  UserRound,
  X,
} from "lucide-react-native";

import { useState } from "react";

import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import type { Exercise } from "@/components/data/Exercise";

import UIButton from "@/components/ui/common/button";

import UIText from "@/components/ui/common/text";

import useThemeColor from "@/hooks/use-theme-color";

type WorkoutRecommendationStepProps = {
  workouts: Exercise[];
  selectedWorkouts: Exercise[];
  onToggleSelect: (workout: Exercise) => void;
  onConfirm: () => void;
  onClear: () => void;
};

const getEquipmentIcon = (equipment: string) =>
  equipment === "Dumbbell" ? Dumbbell : UserRound;

export default function WorkoutRecommendationStep({
  workouts,
  selectedWorkouts,
  onToggleSelect,
  onConfirm,
  onClear,
}: WorkoutRecommendationStepProps) {
  const themeColor = useThemeColor();

  const [isSelectedExpanded, setIsSelectedExpanded] = useState(false);

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
          <UIText variant="muted" style={styles.sectionSubtitle}>
            Based on your preferences
          </UIText>
        </View>

        <UIText variant="muted" style={styles.workoutCount}>
          {workouts.length} workouts
        </UIText>
      </View>

      <FlatList
        data={workouts}
        keyExtractor={(item) => item.exercise_id}
        style={styles.recommendedList}
        contentContainerStyle={styles.recommendedListContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const selected = isSelected(item.exercise_id);

          const EquipmentIcon = getEquipmentIcon(item.equipment);

          return (
            <Pressable
              style={[
                styles.workoutCard,
                {
                  backgroundColor: themeColor.card,
                  borderColor: selected
                    ? themeColor.primary
                    : themeColor.border,
                },
              ]}
              onPress={() => onToggleSelect(item)}
            >
              <View
                style={[
                  styles.workoutIcon,
                  {
                    backgroundColor: themeColor.background,
                    borderColor: themeColor.border,
                  },
                ]}
              >
                <EquipmentIcon size={28} color={themeColor.primary} />
              </View>

              <View style={styles.workoutContent}>
                <UIText style={styles.workoutTitle} numberOfLines={1}>
                  {item.exercise_name}
                </UIText>

                <UIText variant="muted" style={styles.infoText}>
                  {item.body_part} • {item.equipment}
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
                  <Check size={17} color={themeColor.black} strokeWidth={3} />
                )}
              </View>
            </Pressable>
          );
        }}
      />

      <View
        style={[
          styles.selectedSection,
          {
            borderTopColor: themeColor.border,
          },
        ]}
      >
        <View style={styles.selectedHeader}>
          <Pressable
            style={styles.selectedTitleButton}
            onPress={() => setIsSelectedExpanded((current) => !current)}
          >
            <UIText style={styles.selectedTitle}>
              Selected Workout ({selectedWorkouts.length})
            </UIText>

            {isSelectedExpanded ? (
              <ChevronUp size={18} color={themeColor.foreground} />
            ) : (
              <ChevronDown size={18} color={themeColor.foreground} />
            )}
          </Pressable>

          {selectedWorkouts.length > 0 && (
            <Pressable onPress={onClear} hitSlop={8}>
              <UIText
                style={[
                  styles.clearText,
                  {
                    color: themeColor.primary,
                  },
                ]}
              >
                Clear All
              </UIText>
            </Pressable>
          )}
        </View>

        {isSelectedExpanded && (
          <ScrollView
            style={styles.selectedList}
            contentContainerStyle={styles.selectedListContent}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
          >
            {selectedWorkouts.map((workout) => {
              const EquipmentIcon = getEquipmentIcon(workout.equipment);

              return (
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
                  <View
                    style={[
                      styles.selectedIcon,
                      {
                        backgroundColor: themeColor.background,
                        borderColor: themeColor.border,
                      },
                    ]}
                  >
                    <EquipmentIcon size={21} color={themeColor.primary} />
                  </View>

                  <UIText style={styles.selectedItemText} numberOfLines={1}>
                    {workout.exercise_name}
                  </UIText>

                  <Pressable
                    onPress={() => onToggleSelect(workout)}
                    hitSlop={8}
                  >
                    <X size={21} color={themeColor.foreground} />
                  </Pressable>
                </View>
              );
            })}
          </ScrollView>
        )}

        <UIButton
          label="Confirm Workout  →"
          variant="primary"
          style={styles.mainButton}
          disabled={selectedWorkouts.length === 0}
          onPress={onConfirm}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 0,
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
    marginTop: 14,
    marginBottom: 12,
  },

  sectionSubtitle: {
    fontSize: 12,
    marginTop: 3,
  },

  workoutCount: {
    fontSize: 12,
  },

  recommendedList: {
    flex: 1,
    minHeight: 0,
  },

  recommendedListContent: {
    gap: 8,
    paddingBottom: 12,
  },

  workoutCard: {
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 6,
  },

  workoutIcon: {
    width: 54,
    height: 54,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
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

  selectedSection: {
    flexShrink: 0,
    paddingTop: 10,
    borderTopWidth: 1,
  },

  selectedHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  selectedTitleButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
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
    maxHeight: 150,
    minHeight: 0,
  },

  selectedListContent: {
    gap: 8,
    paddingBottom: 4,
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

  selectedIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
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
    marginTop: 10,
    marginBottom: 16,
    borderRadius: 8,
  },
});
