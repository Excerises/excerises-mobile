import { Check, ChevronRight } from "lucide-react-native";
import { Image, Pressable, StyleSheet, View } from "react-native";

import UIText from "@/components/ui/common/text";
import useThemeColor from "@/hooks/use-theme-color";

import type { Workout } from "@/components/data/workout-data";

type WorkoutHistory = {
  workout: Workout;
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

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const year = String(date.getFullYear()).slice(-2);

    return `${day}/${month}/${year}`;
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
                {item.workout.title}
              </UIText>

              <View style={styles.metaRow}>
                <UIText variant="muted" style={styles.meta}>
                  {index === 0 ? "Today" : formatDate(item.completedAt)} •{" "}
                  {formatTime(item.duration)}
                </UIText>

                <Check size={11} color={themeColor.success} strokeWidth={3} />

                <UIText
                  style={[
                    styles.completed,
                    {
                      color: themeColor.success,
                    },
                  ]}
                >
                  Completed
                </UIText>
              </View>
            </View>

            <ChevronRight size={18} color={themeColor.foreground} />
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
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 7,
    overflow: "hidden",
    paddingRight: 8,
  },

  image: {
    width: 58,
    height: 58,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },

  workoutTitle: {
    fontSize: 11,
    fontWeight: "600",
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 3,
  },

  meta: {
    fontSize: 9,
  },

  completed: {
    fontSize: 9,
    fontWeight: "600",
  },
});
