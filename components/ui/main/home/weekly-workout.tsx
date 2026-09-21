import { ChevronLeft, ChevronRight } from "lucide-react-native";

import { Pressable, StyleSheet, View } from "react-native";

import { weeklyDayNames } from "@/components/data/home-data";

import UIText from "@/components/ui/common/text";

import useThemeColor from "@/hooks/use-theme-color";

type WeeklyWorkoutProps = {
  completedDates: Date[];
  weeklyTarget?: number;
};

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

  const weekDays = weeklyDayNames.map((day, index) => {
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

          <Pressable
            style={[
              styles.arrowButton,
              {
                backgroundColor: themeColor.border,
              },
            ]}
          >
            <ChevronLeft size={15} color={themeColor.foreground} />
          </Pressable>

          <Pressable
            style={[
              styles.arrowButton,
              {
                backgroundColor: themeColor.border,
              },
            ]}
          >
            <ChevronRight size={15} color={themeColor.foreground} />
          </Pressable>
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
              item.completed && {
                backgroundColor: themeColor.primary,
              },
              item.isToday &&
                !item.completed && {
                  borderWidth: 1,
                  borderColor: themeColor.primary,
                },
            ]}
          >
            <UIText
              style={[
                styles.dayText,
                item.completed && {
                  color: themeColor.white,
                },
              ]}
            >
              {item.day}
            </UIText>

            <UIText
              style={[
                styles.dateText,
                item.completed && {
                  color: themeColor.white,
                },
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
    fontSize: 10,
    marginRight: 2,
  },

  arrowButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
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
    height: 58,
    marginHorizontal: 2,
    borderRadius: 12,
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
});
