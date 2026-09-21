import { useRouter } from "expo-router";

import { Gauge, Ruler, Scale } from "lucide-react-native";

import { ScrollView, StyleSheet, View } from "react-native";

import {
  bodyStats,
  homeNewsData,
  homeUserName,
  recentWorkouts,
  todayWorkouts,
  weeklyTarget,
  workoutBanner,
} from "@/components/data/home-data";
import { workouts, type Workout } from "@/components/data/workout-data";

import { useWorkoutContext } from "@/components/provider/workout-provider";

import UIText from "@/components/ui/common/text";

import HomeHeader from "@/components/ui/main/home/home-header";

import NewsCard from "@/components/ui/main/home/news-card";

import RecentWorkouts from "@/components/ui/main/home/recent-workouts";

import RecommendedWorkouts from "@/components/ui/main/home/recommended-workouts";

import StatCard from "@/components/ui/main/home/stat-card";

import TodaysWorkout from "@/components/ui/main/home/todays-workout";

import WeeklyWorkout from "@/components/ui/main/home/weekly-workout";

import WorkoutBanner from "@/components/ui/main/home/workout-banner";

import useThemeColor from "@/hooks/use-theme-color";

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
        <HomeHeader name={homeUserName} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {!hasCompletedWorkout ? (
          <WorkoutBanner
            image={workoutBanner.image}
            title={workoutBanner.title}
            description={workoutBanner.description}
            onPress={goToWorkout}
          />
        ) : (
          <>
            <WeeklyWorkout
              completedDates={completedDates}
              weeklyTarget={weeklyTarget}
            />

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
              value={bodyStats.height}
              unit="cm"
              label="Height"
            />

            <StatCard
              icon={<Scale size={22} color={themeColor.destructive} />}
              value={bodyStats.weight}
              unit="kg"
              label="Weight"
            />

            <StatCard
              icon={<Gauge size={22} color={themeColor.destructive} />}
              value={bodyStats.bmi}
              unit={bodyStats.bmiStatus}
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

          <NewsCard data={homeNewsData} />
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
