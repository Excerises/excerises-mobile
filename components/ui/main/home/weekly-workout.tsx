import { Check } from "lucide-react-native";

import { StyleSheet, View } from "react-native";

import UIText from "@/components/ui/common/text";
import useThemeColor from "@/hooks/use-theme-color";

type WeeklyWorkoutProps = {
  completedDates: Date[];
  weeklyTarget?: number;
};

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const sameDate = (date1: Date, date2: Date) =>
  date1.toDateString() === date2.toDateString();

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

    const completed = completedDates.some((completedDate) =>
      sameDate(completedDate, date),
    );

    const isToday = sameDate(date, today);

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

        <View style={styles.headerRight}>
          <UIText variant="muted" style={styles.count}>
            {completedCount}/{weeklyTarget}
          </UIText>
        </View>
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
              {
                backgroundColor: item.completed
                  ? themeColor.primary
                  : themeColor.card,

                borderColor:
                  item.completed || item.isToday
                    ? themeColor.primary
                    : themeColor.border,
              },
            ]}
          >
            <UIText
              style={[
                styles.dayText,
                {
                  color: item.completed
                    ? themeColor.black
                    : themeColor.foreground,
                },
              ]}
            >
              {item.day}
            </UIText>

            <UIText
              style={[
                styles.dateText,
                {
                  color: item.completed
                    ? themeColor.black
                    : themeColor.foreground,
                },
              ]}
            >
              {item.date.getDate()}
            </UIText>

            {item.completed ? (
              <Check size={13} color={themeColor.black} strokeWidth={3} />
            ) : (
              <UIText
                style={[
                  styles.marker,
                  {
                    color: themeColor.mutedForeground,
                  },
                ]}
              >
                —
              </UIText>
            )}
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
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  title: {
    fontSize: 14,
    fontWeight: "600",
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  count: {
    fontSize: 12,
    marginRight: 2,
  },

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 6,
    borderWidth: 1,
    borderRadius: 8,
  },

  day: {
    flex: 1,
    height: 72,
    marginHorizontal: 2,
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
  },

  dayText: {
    fontSize: 10,
    fontWeight: "600",
  },

  dateText: {
    fontSize: 11,
    fontWeight: "600",
  },

  marker: {
    fontSize: 10,
    lineHeight: 12,
  },
});
