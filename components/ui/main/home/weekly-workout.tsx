import { StyleSheet, View } from "react-native";

import UIText from "@/components/ui/common/text";
import useThemeColor from "@/hooks/use-theme-color";

const days = [
  { day: "Mon", date: "15", completed: true },
  { day: "Tue", date: "16", completed: false },
  { day: "Wed", date: "17", completed: true },
  { day: "Thu", date: "18", completed: false },
  { day: "Fri", date: "19", completed: false },
  { day: "Sat", date: "20", completed: false },
  { day: "Sun", date: "21", completed: false },
];

export default function WeeklyWorkout() {
  const themeColor = useThemeColor();

  const completedCount = days.filter((item) => item.completed).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <UIText style={styles.title}>Weekly Workout</UIText>

        <UIText style={styles.count}>{completedCount}/4</UIText>
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
        {days.map((item) => (
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
              style={[styles.dateText, item.completed && styles.activeText]}
            >
              {item.date}
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
