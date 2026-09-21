import { useRouter } from "expo-router";
import { Gauge, Ruler, Scale } from "lucide-react-native";
import { ScrollView, StyleSheet, View } from "react-native";

import { useWorkoutContext } from "@/components/provider/workout-provider";
import useThemeColor from "@/hooks/use-theme-color";

import UIText from "@/components/ui/common/text";
import HomeHeader from "@/components/ui/main/home/home-header";
import NewsCard from "@/components/ui/main/home/news-card";
import RecentWorkouts from "@/components/ui/main/home/recent-workouts";
import RecommendedWorkouts from "@/components/ui/main/home/recommended-workouts";
import StatCard from "@/components/ui/main/home/stat-card";
import TodaysWorkout from "@/components/ui/main/home/todays-workout";
import WeeklyWorkout from "@/components/ui/main/home/weekly-workout";
import WorkoutBanner from "@/components/ui/main/home/workout-banner";

import { workouts, type Workout } from "@/components/data/workout-data";

const newsData = [
  {
    id: "1",
    image: require("@/assets/images/news-1.png"),
    title: "5 Tips to Stay Consistent with Your Workout",
  },
  {
    id: "2",
    image: require("@/assets/images/news-2.png"),
    title: "How to Build a Better Workout Routine",
  },
  {
    id: "3",
    image: require("@/assets/images/news-3.png"),
    title: "Simple Ways to Improve Your Fitness",
  },
];

const todayWorkouts = [
  {
    workout: workouts[0],
    completed: true,
  },
  {
    workout: workouts[1],
    completed: false,
  },
];

const recentWorkouts = [
  {
    workout: workouts[0],
    duration: 332,
    completedAt: new Date("2026-09-17T10:00:00"),
  },
  {
    workout: workouts[0],
    duration: 332,
    completedAt: new Date("2026-09-15T10:00:00"),
  },
];

const completedDates = recentWorkouts.map((item) => item.completedAt);

export default function Home() {
  const router = useRouter();
  const themeColor = useThemeColor();

  const { hasCompletedWorkout } = useWorkoutContext();

  const goToWorkout = () => {
    router.push("/(main)/workout-flow");
  };

  const goToDetail = (workout: Workout) => {
    router.push({
      pathname: "/(main)/workout-flow",
      params: {
        workoutId: workout.id,
      },
    });
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeColor.background,
        },
      ]}
    >
      <View style={styles.headerContainer}>
        <HomeHeader name="User" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {!hasCompletedWorkout ? (
          <WorkoutBanner
            image={require("@/assets/images/workout-banner.jpeg")}
            title="Ready to Workout?"
            description="Choose your workout type and get personalized exercises."
            onPress={goToWorkout}
          />
        ) : (
          <>
            <WeeklyWorkout completedDates={completedDates} weeklyTarget={4} />

            <TodaysWorkout workouts={todayWorkouts} onSelect={goToDetail} />

            <RecommendedWorkouts workouts={workouts} onSelect={goToDetail} />
          </>
        )}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <UIText style={styles.sectionTitle}>Your Body Stats</UIText>

            <UIText variant="muted" style={styles.seeDetails}>
              See Details &gt;
            </UIText>
          </View>

          <View style={styles.statsRow}>
            <StatCard
              icon={<Ruler size={22} color={themeColor.destructive} />}
              value="171"
              unit="cm"
              label="Height"
            />

            <StatCard
              icon={<Scale size={22} color={themeColor.destructive} />}
              value="68.5"
              unit="kg"
              label="Weight"
            />

            <StatCard
              icon={<Gauge size={22} color={themeColor.destructive} />}
              value="23.4"
              unit="Normal"
              label="BMI"
              unitColor="success"
            />
          </View>
        </View>

        {hasCompletedWorkout && <RecentWorkouts workouts={recentWorkouts} />}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <UIText style={styles.sectionTitle}>Latest News</UIText>

            <UIText variant="muted" style={styles.seeDetails}>
              See All &gt;
            </UIText>
          </View>

          <NewsCard data={newsData} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 8,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  section: {
    marginTop: 18,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
  },

  seeDetails: {
    fontSize: 10,
  },

  statsRow: {
    flexDirection: "row",
    gap: 6,
  },
});
