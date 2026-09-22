import { Check, ChevronRight } from "lucide-react-native";
import { Image, Pressable, StyleSheet, View } from "react-native";

import type { Exercise } from "@/components/data/Exercise";
import UIText from "@/components/ui/common/text";
import useThemeColor from "@/hooks/use-theme-color";

type WorkoutHistory = {
  workout: Exercise;
  duration: number;
  completedAt: Date;
};

type RecentWorkoutsProps = {
  workouts: WorkoutHistory[];
};

export default function RecentWorkouts({ workouts }: RecentWorkoutsProps) {
  const themeColor = useThemeColor();

  const displayedWorkouts = workouts.slice(0, 3);

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
        <UIText style={styles.title}>Recent Workouts</UIText>

        <UIText variant="muted" style={styles.seeAll}>
          See All &gt;
        </UIText>
      </View>

      <View style={styles.list}>
        {displayedWorkouts.map((item, index) => (
          <Pressable
            key={`${item.completedAt.getTime()}-${index}`}
            style={[
              styles.card,
              {
                backgroundColor: themeColor.card,
                borderColor: themeColor.border,
              },
            ]}
          >
            <Image source={item.workout.image} style={styles.image} />

            <View style={styles.content}>
              <UIText style={styles.workoutTitle} numberOfLines={1}>
                {item.workout.exercise_name}
              </UIText>

              <UIText variant="muted" style={styles.meta} numberOfLines={1}>
                {item.workout.body_part} • {item.workout.equipment}
              </UIText>

              <UIText variant="muted" style={styles.info}>
                ◷ {formatTime(item.duration)}
              </UIText>
            </View>

            <View style={styles.right}>
              <View
                style={[
                  styles.completed,
                  {
                    backgroundColor: themeColor.card,
                  },
                ]}
              >
                <Check size={12} color={themeColor.success} strokeWidth={3} />

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

              <ChevronRight
                size={18}
                color={themeColor.foreground}
                strokeWidth={2}
              />
            </View>
          </Pressable>
        ))}
      </View>
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

  seeAll: {
    fontSize: 10,
  },

  list: {
    gap: 6,
  },

  card: {
    minHeight: 66,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 6,
    overflow: "hidden",
  },

  image: {
    width: 62,
    height: 62,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 7,
  },

  workoutTitle: {
    fontSize: 10,
    fontWeight: "600",
  },

  meta: {
    fontSize: 8,
    marginTop: 3,
  },

  info: {
    fontSize: 8,
    marginTop: 3,
  },

  right: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    alignSelf: "stretch",
    paddingVertical: 7,
    paddingRight: 7,
  },

  completed: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 5,
  },

  completedText: {
    fontSize: 8,
    fontWeight: "600",
  },
});
