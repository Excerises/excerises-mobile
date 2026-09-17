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

type RecommendedWorkoutsProps = {
  workouts: Workout[];
  onSelect?: (workout: Workout) => void;
};

const { width } = Dimensions.get("window");

export default function RecommendedWorkouts({
  workouts,
  onSelect,
}: RecommendedWorkoutsProps) {
  const themeColor = useThemeColor();
  const [activeIndex, setActiveIndex] = useState(0);

  const cardWidth = width - 40;

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
        <UIText style={styles.title}>Recommended Workouts</UIText>

        <UIText variant="muted" style={styles.seeAll}>
          See All &gt;
        </UIText>
      </View>

      <FlatList
        data={workouts}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardWidth}
        decelerationRate="fast"
        keyExtractor={(item) => item.id}
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
            onPress={() => onSelect?.(item)}
          >
            <Image source={item.image} style={styles.image} />

            <View style={styles.content}>
              <UIText style={styles.workoutTitle}>{item.title}</UIText>

              <UIText variant="muted" style={styles.meta}>
                {item.bodyPart} • {item.equipment}
              </UIText>

              <UIText
                style={[
                  styles.tryText,
                  {
                    color: themeColor.primary,
                  },
                ]}
              >
                Try This
              </UIText>
            </View>
          </Pressable>
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

  seeAll: {
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

  tryText: {
    fontSize: 11,
    fontWeight: "600",
    marginTop: 8,
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
