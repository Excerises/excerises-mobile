import { Check, ChevronRight, Circle } from "lucide-react-native";

import { useState } from "react";

import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import UIText from "@/components/ui/common/text";

import useThemeColor from "@/hooks/use-theme-color";

import type { Workout } from "@/components/data/workout-data";

type TodayWorkout = {
  workout: Workout;
  completed: boolean;
};

type TodaysWorkoutProps = {
  workouts: TodayWorkout[];
  onSelect?: (workout: Workout) => void;
};

const { width } = Dimensions.get("window");

export default function TodaysWorkout({
  workouts,
  onSelect,
}: TodaysWorkoutProps) {
  const themeColor = useThemeColor();

  const [activeIndex, setActiveIndex] = useState(0);

  const cardWidth = width - 40;

  const completedCount = workouts.filter((item) => item.completed).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <UIText style={styles.title}>Today&apos;s Workout</UIText>

        <UIText variant="muted" style={styles.count}>
          {completedCount}/{workouts.length} Completed &gt;
        </UIText>
      </View>

      <FlatList
        data={workouts}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.workout.id}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / cardWidth,
          );

          setActiveIndex(index);
        }}
        renderItem={({ item }) => (
          <Pressable
            style={[
              styles.card,
              {
                width: cardWidth,
                backgroundColor: themeColor.card,
                borderColor: themeColor.border,
              },
            ]}
            onPress={() => onSelect?.(item.workout)}
          >
            <Image source={item.workout.image} style={styles.image} />

            <View
              style={[
                styles.overlay,
                {
                  backgroundColor: themeColor.overlay,
                },
              ]}
            />

            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor: themeColor.card,
                },
              ]}
            >
              {item.completed ? (
                <Check size={11} color={themeColor.white} strokeWidth={3} />
              ) : (
                <Circle size={10} color={themeColor.mutedForeground} />
              )}

              <UIText
                style={[
                  styles.statusText,
                  {
                    color: item.completed
                      ? themeColor.white
                      : themeColor.mutedForeground,
                  },
                ]}
              >
                {item.completed ? "Completed" : "Not Completed"}
              </UIText>
            </View>

            <View style={styles.arrow}>
              <ChevronRight size={19} color={themeColor.foreground} />
            </View>

            <View style={styles.content}>
              <UIText style={styles.workoutTitle}>{item.workout.title}</UIText>

              <UIText variant="muted" style={styles.meta}>
                {item.workout.bodyPart} • {item.workout.equipment}
              </UIText>
            </View>
          </Pressable>
        )}
      />

      {workouts.length > 1 && (
        <View style={styles.indicator}>
          {workouts.map((item, index) => (
            <View
              key={item.workout.id}
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
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  title: {
    fontSize: 14,
    fontWeight: "600",
  },

  count: {
    fontSize: 10,
  },

  card: {
    height: 120,
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },

  image: {
    position: "absolute",
    width: "58%",
    height: "100%",
    left: 0,
    top: 0,
    resizeMode: "cover",
  },

  overlay: {
    position: "absolute",
    left: "45%",
    right: 0,
    top: 0,
    bottom: 0,
  },

  statusBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 10,
  },

  statusText: {
    fontSize: 8,
    fontWeight: "600",
  },

  arrow: {
    position: "absolute",
    right: 8,
    top: "50%",
    marginTop: -10,
  },

  content: {
    flex: 1,
    marginLeft: "55%",
    paddingHorizontal: 12,
    paddingBottom: 15,
    justifyContent: "flex-end",
  },

  workoutTitle: {
    fontSize: 15,
    fontWeight: "600",
  },

  meta: {
    fontSize: 10,
    marginTop: 4,
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
