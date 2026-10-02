import { Check, Clock3, Dumbbell, UserRound } from "lucide-react-native";

import { useState } from "react";

import { Dimensions, FlatList, StyleSheet, View } from "react-native";

import UIButton from "@/components/ui/common/button";

import UIText from "@/components/ui/common/text";

import useThemeColor from "@/hooks/use-theme-color";

type RecentWorkoutItem = {
  id: string;
  title: string;
  exerciseCount: number;
  duration: number;
  equipment: string[];
};

type RecentWorkoutsProps = {
  workouts: RecentWorkoutItem[];
  onPress?: (workout: RecentWorkoutItem) => void;
};

const { width } = Dimensions.get("window");

const getEquipmentIcon = (equipment: string) =>
  equipment === "Dumbbell" ? Dumbbell : UserRound;

export default function RecentWorkouts({
  workouts,
  onPress,
}: RecentWorkoutsProps) {
  const themeColor = useThemeColor();

  const cardWidth = width - 40;

  const [activeIndex, setActiveIndex] = useState(0);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds,
    ).padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <UIText style={styles.title}>Recent Workout</UIText>
      </View>

      <FlatList
        data={workouts}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / cardWidth,
          );

          setActiveIndex(index);
        }}
        renderItem={({ item }) => (
          <View
            style={{
              width: cardWidth,
            }}
          >
            <View
              style={[
                styles.card,
                {
                  backgroundColor: themeColor.card,
                  borderColor: themeColor.border,
                },
              ]}
            >
              <View
                style={[
                  styles.iconArea,
                  {
                    backgroundColor: themeColor.background,
                  },
                ]}
              >
                <View style={styles.iconRow}>
                  {item.equipment.map((equipment, index) => {
                    const EquipmentIcon = getEquipmentIcon(equipment);

                    return (
                      <View
                        key={`${equipment}-${index}`}
                        style={[
                          styles.equipmentIcon,
                          {
                            backgroundColor: themeColor.card,
                            borderColor: themeColor.border,
                          },
                        ]}
                      >
                        <EquipmentIcon
                          size={item.equipment.length === 1 ? 38 : 28}
                          color={themeColor.primary}
                        />
                      </View>
                    );
                  })}
                </View>
              </View>

              <View
                style={[
                  styles.content,
                  {
                    backgroundColor: themeColor.card,
                  },
                ]}
              >
                <UIText style={styles.workoutTitle} numberOfLines={1}>
                  {item.title}
                </UIText>

                <UIText style={styles.exerciseCount}>
                  {item.exerciseCount} Exercises
                </UIText>

                <View style={styles.infoRow}>
                  <View style={styles.duration}>
                    <Clock3 size={14} color={themeColor.foreground} />

                    <UIText variant="muted" style={styles.infoText}>
                      {formatTime(item.duration)}
                    </UIText>
                  </View>

                  <View style={styles.completed}>
                    <Check
                      size={11}
                      color={themeColor.success}
                      strokeWidth={3}
                    />

                    <UIText
                      style={[
                        styles.completedText,
                        {
                          color: themeColor.success,
                        },
                      ]}
                    >
                      Completed
                    </UIText>
                  </View>
                </View>

                <UIButton
                  label="VIEW WORKOUT"
                  variant="primary"
                  style={styles.button}
                  labelStyle={styles.buttonText}
                  onPress={() => onPress?.(item)}
                />
              </View>
            </View>
          </View>
        )}
      />

      {workouts.length > 1 && (
        <View style={styles.indicator}>
          {workouts.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    index === activeIndex
                      ? themeColor.primary
                      : themeColor.mutedForeground,
                },
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  title: {
    fontSize: 14,
    fontWeight: "600",
  },

  card: {
    height: 138,
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
    flexDirection: "row",
  },

  iconArea: {
    width: "43%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },

  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    flexWrap: "wrap",
  },

  equipmentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: "space-between",
  },

  workoutTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  exerciseCount: {
    fontSize: 11,
    marginTop: 2,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 4,
  },

  duration: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  infoText: {
    fontSize: 9,
  },

  completed: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  completedText: {
    fontSize: 9,
    fontWeight: "600",
  },

  button: {
    width: "100%",
    height: 32,
    minHeight: 32,
    marginTop: 6,
    paddingHorizontal: 5,
    borderRadius: 6,
  },

  buttonText: {
    fontSize: 9,
  },

  indicator: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginTop: 8,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
});
