import { Check, Circle } from "lucide-react-native";
import { useCallback, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  View,
  ViewToken,
} from "react-native";

import UIText from "@/components/ui/common/text";
import useThemeColor from "@/hooks/use-theme-color";

import type { Workout } from "@/components/ui/main/workout-flow/workout-data";

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

  const handleViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const index = viewableItems[0]?.index;

      if (index === null || index === undefined) {
        return;
      }

      setActiveIndex(index);
    },
    [],
  );

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
        snapToInterval={cardWidth}
        decelerationRate="fast"
        keyExtractor={(item) => item.workout.id}
        getItemLayout={(_, index) => ({
          length: cardWidth,
          offset: cardWidth * index,
          index,
        })}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 60,
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

            <View style={styles.content}>
              <UIText style={styles.workoutTitle}>{item.workout.title}</UIText>

              <UIText variant="muted" style={styles.meta}>
                {item.workout.bodyPart} • {item.workout.equipment}
              </UIText>

              {item.completed ? (
                <View style={styles.statusRow}>
                  <Check size={12} color="#16C84E" strokeWidth={3} />

                  <UIText
                    style={[
                      styles.statusText,
                      {
                        color: "#16C84E",
                      },
                    ]}
                  >
                    Completed
                  </UIText>
                </View>
              ) : (
                <View style={styles.statusRow}>
                  <Circle
                    size={12}
                    color={themeColor.mutedForeground}
                    strokeWidth={2}
                  />

                  <UIText variant="muted" style={styles.statusText}>
                    Not Completed
                  </UIText>
                </View>
              )}
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
                      ? themeColor.destructive
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
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 7,
    overflow: "hidden",
  },

  image: {
    width: "45%",
    height: "100%",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 12,
  },

  workoutTitle: {
    fontSize: 15,
    fontWeight: "600",
  },

  meta: {
    fontSize: 11,
    marginTop: 4,
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 8,
  },

  statusText: {
    fontSize: 10,
    fontWeight: "600",
  },

  indicator: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginTop: 10,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
