import { StyleSheet } from "react-native";
import { Text, View } from "../ui";
import { Borders } from "@/constant/theme";
import { useThemeColor } from "@/hook/use-theme-color";

export interface WeeklyActivityCardProps {
  /** Minutes trained per day, Monday-first. Length 7. */
  minutes?: number[];
  title?: string;
}

const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

export function WeeklyActivityCard({
  minutes = [0, 0, 0, 0, 0, 0, 0],
  title = "This Week",
}: WeeklyActivityCardProps) {
  const themeColor = useThemeColor();
  const todayIndex = (new Date().getDay() + 6) % 7;
  const max = Math.max(...minutes, 30);
  const total = minutes.reduce((a, b) => a + b, 0);

  return (
    <View variant="card" style={styles.card}>
      <View variant="ghost" style={styles.header}>
        <Text weight="semibold" size="lg">
          {title}
        </Text>
        <Text variant="muted" size="sm">
          {total > 0 ? `${total} min total` : "No activity yet"}
        </Text>
      </View>
      <View variant="ghost" style={styles.chart}>
        {minutes.map((m, i) => {
          const active = m > 0;
          const isToday = i === todayIndex;
          const height = Math.max((m / max) * 100, active ? 20 : 8);

          return (
            <View key={i} variant="ghost" style={styles.barColumn}>
              <View variant="ghost" style={styles.barTrack}>
                <View
                  variant="ghost"
                  style={[
                    styles.bar,
                    {
                      height: `${height}%`,
                      backgroundColor: active
                        ? themeColor.primary
                        : themeColor.muted,
                    },
                  ]}
                />
              </View>
              <Text
                size="xs"
                variant={isToday ? "primary" : "muted"}
                weight={isToday ? "bold" : "normal"}
              >
                {DAY_LABELS[i]}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Borders.radius.xl,
    padding: 16,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chart: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  barColumn: {
    flex: 1,
    alignItems: "center",
    gap: 8,
  },
  barTrack: {
    height: 72,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  bar: {
    width: "70%",
    borderRadius: Borders.radius.lg,
  },
});
