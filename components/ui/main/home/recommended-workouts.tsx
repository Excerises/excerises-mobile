import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import type { Exercise } from "@/components/data/Exercise";
import UIText from "@/components/ui/common/text";
import useThemeColor from "@/hooks/use-theme-color";

type RecommendedWorkoutsProps = {
  workouts: Exercise[];
  onSelect?: (workout: Exercise) => void;
};

const { width } = Dimensions.get("window");

export default function RecommendedWorkouts({
  workouts,
  onSelect,
}: RecommendedWorkoutsProps) {
  const themeColor = useThemeColor();

  const [activeIndex, setActiveIndex] = useState(0);

  const cardWidth = Math.min(112, (width - 52) / 3);
  const snapDistance = cardWidth + 8;

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
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={(item) => item.exercise_id}
        snapToInterval={snapDistance}
        decelerationRate="fast"
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / snapDistance,
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
            onPress={() => onSelect?.(item)}
          >
            <Image source={item.image} style={styles.image} />

            <View style={styles.content}>
              <UIText style={styles.workoutTitle} numberOfLines={2}>
                {item.exercise_name}
              </UIText>

              <UIText variant="muted" style={styles.meta} numberOfLines={1}>
                {item.body_part} • {item.equipment}
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
          {workouts.slice(0, 4).map((item, index) => (
            <View
              key={item.exercise_id}
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

  seeAll: {
    fontSize: 10,
  },

  listContent: {
    paddingRight: 4,
  },

  separator: {
    width: 8,
  },

  card: {
    height: 140,
    borderWidth: 1,
    borderRadius: 7,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 68,
    resizeMode: "cover",
  },

  content: {
    flex: 1,
    paddingHorizontal: 7,
    paddingVertical: 6,
    justifyContent: "space-between",
  },

  workoutTitle: {
    fontSize: 12,
    fontWeight: "600",
  },

  meta: {
    fontSize: 9,
    marginTop: 2,
  },

  tryText: {
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
    width: 7,
    height: 7,
    borderRadius: 4,
  },
});
