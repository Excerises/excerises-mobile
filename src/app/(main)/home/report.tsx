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
import { useGetProfileProgress } from "@/hook/api/profile/use-get-profile";
import { BmiCard } from "@/component/fitness/bmi-card";

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
  const {
    query: { data: progressData },
  } = useGetProfileProgress();

  const stats = useMemo(
    () => [
      {
        label: "Streaks",
        value: progressData?.data.streaks || 0,
        icon: FlameIcon,
      },
      {
        label: "Workouts",
        value: progressData?.data.workouts || 0,
        icon: AwardIcon,
      },
      {
        label: "Minutes",
        value: (progressData?.data.minutes || 0).toFixed(0),
        icon: ClockIcon,
      },
    ],
    [progressData],
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
          <BmiCard value={bmi} />
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
              <SessionCard
                key={session.id}
                session={session}
                onPress={() => router.push(`/session/${session.id}`)}
              />
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
