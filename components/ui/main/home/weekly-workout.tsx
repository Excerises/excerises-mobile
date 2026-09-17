import { StyleSheet, View } from "react-native";

import UIText from "@/components/ui/common/text";
import useThemeColor from "@/hooks/use-theme-color";

type WeeklyWorkoutProps = {
  completedDates: Date[];
  weeklyTarget?: number;
};

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function WeeklyWorkout({
  completedDates,
  weeklyTarget = 4,
}: WeeklyWorkoutProps) {
  const themeColor = useThemeColor();

  const today = new Date();

  const currentDay = today.getDay();

  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;

  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);

  const weekDays = dayNames.map((day, index) => {
    const date = new Date(monday);

    date.setDate(monday.getDate() + index);

    const completed = completedDates.some(
      (completedDate) =>
        completedDate.getFullYear() === date.getFullYear() &&
        completedDate.getMonth() === date.getMonth() &&
        completedDate.getDate() === date.getDate(),
    );

    const isToday =
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate();

    return {
      day,
      date,
      completed,
      isToday,
    };
  });

  const completedCount = weekDays.filter((item) => item.completed).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <UIText style={styles.title}>Weekly Workout</UIText>

        <UIText variant="muted" style={styles.count}>
          {completedCount}/{weeklyTarget}
        </UIText>
      </View>

      <View
        style={[
          styles.card,
          {
            backgroundColor: themeColor.card,
            borderColor: themeColor.border,
          },
        ]}
      >
        {weekDays.map((item) => (
          <View
            key={item.day}
            style={[
              styles.day,
              item.completed && {
                backgroundColor: themeColor.primary,
              },
            ]}
          >
            <UIText
              style={[styles.dayText, item.completed && styles.activeText]}
            >
              {item.day}
            </UIText>

            <UIText
              style={[
                styles.dateText,
                item.completed && styles.activeText,
                item.isToday &&
                  !item.completed && {
                    color: themeColor.primary,
                  },
              ]}
            >
              {item.date.getDate()}
            </UIText>
          </View>
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

  count: {
    fontSize: 11,
  },

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    borderWidth: 1,
    borderRadius: 6,
  },

  day: {
    width: 31,
    height: 64,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },

  dayText: {
    fontSize: 10,
    fontWeight: "600",
  },

  dateText: {
    fontSize: 11,
    fontWeight: "600",
  },

  activeText: {
    color: "#FFFFFF",
  },
});
