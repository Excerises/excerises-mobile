import { Clock3, Dumbbell, Flame } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

import UIText from "@/components/ui/common/text";
import useThemeColor from "@/hooks/use-theme-color";

type ProfileStatsProps = {
  workoutCount: number;
  daysStreak: number;
  totalHours: number;
};

export default function ProfileStats({
  workoutCount,
  daysStreak,
  totalHours,
}: ProfileStatsProps) {
  const themeColor = useThemeColor();

  const stats = [
    {
      value: String(workoutCount),
      label: "Workouts",
      icon: Dumbbell,
    },
    {
      value: String(daysStreak),
      label: "Days Streak",
      icon: Flame,
    },
    {
      value: String(totalHours),
      label: "Hours",
      icon: Clock3,
    },
  ];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeColor.card,
          borderColor: themeColor.border,
        },
      ]}
    >
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <View key={stat.label} style={styles.item}>
            <Icon size={25} color={themeColor.primary} />

            <UIText style={styles.value}>{stat.value}</UIText>

            <UIText variant="muted" style={styles.label}>
              {stat.label}
            </UIText>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 106,
    marginTop: 12,
    paddingVertical: 14,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 16,
  },

  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  value: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 7,
  },

  label: {
    fontSize: 10,
    marginTop: 4,
    textAlign: "center",
  },
});
