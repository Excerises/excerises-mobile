import { NoRecordCard } from "@/component/common/no-record";
import { ProgressSnapshotCard } from "@/component/home/progress-snapshot-card";
import {
  HomeScreen,
  HomeScreenTitle,
} from "@/component/screen/main/home-screen";
import { Text, View } from "@/component/ui";
import { LinearGauge } from "@/component/visual/gauge/linear-gauge";
import { bmiCategories } from "@/constant/fitness/bmi-categories";
import { Borders, Fonts } from "@/constant/theme";
import { useAuth } from "@/context/auth-context";
import { useThemeColor } from "@/hook/use-theme-color";
import { getBmiCategory } from "@/utils/fitness/bmi-category";
import { AwardIcon, ClockIcon, FlameIcon } from "lucide-react-native";
import { useMemo } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function Page() {
  const themeColor = useThemeColor();
  const { user } = useAuth();

  const stats = useMemo(
    () => [
      {
        label: "Streaks",
        value: 0,
        icon: FlameIcon,
      },
      {
        label: "Workouts",
        value: 0,
        icon: AwardIcon,
      },
      {
        label: "Minutes",
        value: 0,
        icon: ClockIcon,
      },
    ],
    [],
  );

  const bodyStats = useMemo(
    () => [
      {
        label: "Height (cm)",
        value: user?.profile?.height || 0,
      },
      {
        label: "Weight (kg)",
        value: user?.profile?.weight || 0,
      },
    ],
    [],
  );

  const bmi = user?.profile?.bmi || 15.0;

  return (
    <HomeScreen title={<HomeScreenTitle>Report</HomeScreenTitle>}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View variant="ghost" style={styles.container}>
          <ProgressSnapshotCard stats={stats} />
          <View variant="ghost" style={{ gap: 10 }}>
            <Text weight="semibold" size="lg">
              BMI (Body Mass Index)
            </Text>
            <View
              variant="card"
              style={[styles.bodyItem, { alignItems: "flex-start" }]}
            >
              <View
                variant="ghost"
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View variant="ghost" style={{ flex: 1 }}>
                  <Text weight="bold" size="xl3">
                    {bmi.toFixed(1)}
                  </Text>
                </View>
                <View
                  variant="ghost"
                  style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
                >
                  <View
                    variant="ghost"
                    style={{
                      width: 16,
                      height: 16,
                      backgroundColor: getBmiCategory(bmi).color,
                      borderRadius: 9999,
                    }}
                  ></View>
                  <Text>{getBmiCategory(bmi).name}</Text>
                </View>
              </View>
              <LinearGauge
                value={bmi}
                min={10}
                max={Math.max(...bmiCategories.map((c) => c.max))}
                ranges={bmiCategories.map((c) => c.max)}
                colors={bmiCategories.map((c) => c.color)}
                style={{ marginTop: 20 }}
              />
              <View variant="ghost"></View>
            </View>
          </View>
          <View variant="ghost" style={styles.body}>
            {bodyStats.map((stat, i) => (
              <View key={i} variant="card" style={styles.bodyItem}>
                <Text variant="muted" size="xs">
                  {stat.label}
                </Text>
                <Text size="xl3" weight="bold">
                  {stat.value.toFixed(1)}
                </Text>
              </View>
            ))}
          </View>
          <View style={{ gap: 10 }}>
            <Text weight="semibold" size="lg">
              Sessions Record
            </Text>
            <NoRecordCard message="No workout sessions yet." />
          </View>
        </View>
      </ScrollView>
    </HomeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 14,
  },
  stats: {
    borderRadius: Borders.radius.lg,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  statItem: {
    gap: 4,
    alignItems: "center",
  },
  body: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: 14,
  },
  bodyItem: {
    flex: 1,
    padding: 12,
    borderRadius: Borders.radius.md,
    alignItems: "center",
    gap: 8,
  },
});
