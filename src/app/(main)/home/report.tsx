import { NoRecordCard } from "@/component/common/no-record";
import { ProgressSnapshotCard } from "@/component/home/progress-snapshot-card";
import {
  HomeScreen,
  HomeScreenTitle,
} from "@/component/screen/main/home-screen";
import { Button, Text, View } from "@/component/ui";
import { LinearGauge } from "@/component/visual/gauge/linear-gauge";
import { bmiCategories } from "@/constant/fitness/bmi-categories";
import { Fonts } from "@/constant/theme";
import { useAuth } from "@/context/auth-context";
import { useThemeColor } from "@/hook/use-theme-color";
import { getBmiCategory } from "@/utils/fitness/bmi-category";
import {
  AwardIcon,
  ClockIcon,
  DumbbellIcon,
  FlameIcon,
  RulerIcon,
  ScaleIcon,
} from "lucide-react-native";
import { useMemo } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useGetSessions } from "@/hook/api/session/use-get-session";
import { SessionCard } from "@/component/fitness";

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <View variant="ghost" style={{ gap: 2 }}>
      <Text weight="semibold" size="lg">
        {title}
      </Text>
      {subtitle && (
        <Text variant="muted" size="xs">
          {subtitle}
        </Text>
      )}
    </View>
  );
}

export default function Page() {
  const themeColor = useThemeColor();
  const { user } = useAuth();
  const router = useRouter();
  const {
    query: { data: sessionsData },
  } = useGetSessions();

  const stats = useMemo(
    () => [
      { label: "Streaks", value: 0, icon: FlameIcon },
      { label: "Workouts", value: 0, icon: AwardIcon },
      { label: "Minutes", value: 0, icon: ClockIcon },
    ],
    [],
  );

  const bodyStats = useMemo(
    () => [
      {
        label: "Height",
        unit: "cm",
        value: user?.profile?.height || 0,
        icon: RulerIcon,
      },
      {
        label: "Weight",
        unit: "kg",
        value: user?.profile?.weight || 0,
        icon: ScaleIcon,
      },
    ],
    [user?.profile?.height, user?.profile?.weight],
  );

  const bmi = user?.profile?.bmi || 15.0;
  const bmiCategory = getBmiCategory(bmi);
  const maxBmi = Math.max(...bmiCategories.map((c) => c.max));

  return (
    <HomeScreen title={<HomeScreenTitle>Report</HomeScreenTitle>}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <ProgressSnapshotCard stats={stats} />

        <View variant="ghost" style={{ gap: 12 }}>
          <SectionHeader
            title="Body Mass Index"
            subtitle="Where you stand today"
          />
          <View variant="card" style={styles.card}>
            <View variant="ghost" style={styles.bmiTop}>
              <View variant="ghost" style={{ gap: 4 }}>
                <Text variant="muted" size="xs">
                  Your BMI
                </Text>
                <Text weight="bold" size="xl4">
                  {bmi.toFixed(1)}
                </Text>
              </View>
              <View
                variant="ghost"
                style={[
                  styles.categoryPill,
                  { backgroundColor: `${bmiCategory.color}24` },
                ]}
              >
                <View
                  variant="ghost"
                  style={[styles.dot, { backgroundColor: bmiCategory.color }]}
                />
                <Text
                  size="sm"
                  weight="semibold"
                  style={{ color: bmiCategory.color }}
                >
                  {bmiCategory.name}
                </Text>
              </View>
            </View>
            <LinearGauge
              value={bmi}
              min={10}
              max={maxBmi}
              ranges={bmiCategories.map((c) => c.max)}
              colors={bmiCategories.map((c) => c.color)}
              style={{ marginTop: 24 }}
            />
          </View>
        </View>

        <View variant="ghost" style={{ gap: 12 }}>
          <SectionHeader
            title="Body Stats"
            subtitle="Your latest measurements"
          />
          <View variant="ghost" style={styles.bodyRow}>
            {bodyStats.map((stat, i) => (
              <View key={i} variant="card" style={styles.bodyItem}>
                <View
                  variant="ghost"
                  style={[
                    styles.bodyIcon,
                    { backgroundColor: `${themeColor.primary}1A` },
                  ]}
                >
                  <stat.icon size={Fonts.size.lg} color={themeColor.primary} />
                </View>
                <View variant="ghost" style={{ gap: 2 }}>
                  <Text variant="muted" size="xs">
                    {stat.label}
                  </Text>
                  <Text size="xl3" weight="bold">
                    {stat.value.toFixed(1)}
                    <Text size="sm" variant="muted">
                      {" "}
                      {stat.unit}
                    </Text>
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View variant="ghost" style={{ gap: 12 }}>
          <SectionHeader
            title="Sessions Record"
            subtitle="Every workout adds up"
          />
          {sessionsData && sessionsData.data.length === 0 ? (
            <NoRecordCard
              icon={DumbbellIcon}
              message="No workout sessions yet. Start your first one!"
              actions={
                <Button onPress={() => router.push("/session/new")}>
                  <Text
                    size="sm"
                    weight="semibold"
                    style={{ textTransform: "uppercase" }}
                  >
                    Start Workout
                  </Text>
                </Button>
              }
            />
          ) : (
            sessionsData?.data.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))
          )}
        </View>
      </ScrollView>
    </HomeScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 20,
    paddingBottom: 24,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    gap: 4,
  },
  bmiTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  categoryPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 9999,
  },
  legend: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    width: "46%",
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 9999,
  },
  legendDotActive: {
    width: 14,
    height: 14,
    borderWidth: 2,
  },
  bodyRow: {
    flexDirection: "row",
    gap: 12,
  },
  bodyItem: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    gap: 12,
  },
  bodyIcon: {
    height: 40,
    width: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
