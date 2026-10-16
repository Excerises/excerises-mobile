import { NoRecordCard } from "@/component/common/no-record";
import {
  HomeScreen,
  HomeScreenTitle,
} from "@/component/screen/main/home-screen";
import { Button, Text, View } from "@/component/ui";
import { LinearGauge } from "@/component/visual/gauge/linear-gauge";
import { bmiCategories } from "@/constant/fitness/bmi-categories";
import { Borders, Fonts } from "@/constant/theme";
import { useThemeColor } from "@/hook/use-theme-color";
import { getBmiCategory } from "@/utils/fitness/bmi-category";
import { AwardIcon, ClockIcon, FlameIcon } from "lucide-react-native";
import { useMemo } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function Page() {
  const themeColor = useThemeColor();

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
        value: 169,
      },
      {
        label: "Weight (kg)",
        value: 55,
      },
    ],
    [],
  );

  return (
    <HomeScreen title={<HomeScreenTitle>Your History</HomeScreenTitle>}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View variant="ghost" style={styles.container}>
          <View variant="card" style={styles.stats}>
            {stats.map((stat, i) => (
              <View key={i} variant="ghost" style={styles.statItem}>
                <stat.icon color={themeColor.primary} size={Fonts.size.xl2} />
                <Text size="xl2" weight="bold">
                  {stat.value > 0 ? stat.value : "NA"}
                </Text>
                <Text variant="muted" size="sm">
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>
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
                    18.5
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
                      backgroundColor: getBmiCategory(18.5).color,
                      borderRadius: 9999,
                    }}
                  ></View>
                  <Text>{getBmiCategory(18.5).name}</Text>
                </View>
              </View>
              <LinearGauge
                value={18.5}
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
