import { useRouter } from "expo-router";

import { Gauge, Ruler, Scale } from "lucide-react-native";

import { ScrollView, StyleSheet, View } from "react-native";

import { exercises, type Exercise } from "@/components/data/Exercise";
import { histories } from "@/components/data/History";
import { news } from "@/components/data/News";
import { currentUser } from "@/components/data/User";
import { userProfiles } from "@/components/data/User_Profile";

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

const currentProfile = userProfiles.find(
  (profile) => profile.user_id === currentUser.user_id,
);

const userHistory = histories.filter(
  (item) => item.user_id === currentUser.user_id,
);

const getExercise = (exerciseId: string): Exercise | undefined =>
  exercises.find((exercise) => exercise.exercise_id === exerciseId);

const completedHistory = userHistory
  .filter((item) => item.status === "completed")
  .sort(
    (first, second) =>
      new Date(second.created_at).getTime() -
      new Date(first.created_at).getTime(),
  );

const todayCompleted = userHistory.find(
  (item) => item.status === "completed",
);

const todayInProgress = userHistory.find(
  (item) => item.status === "in_progress",
);

const todayWorkouts = [todayCompleted, todayInProgress]
  .map((item) => {
    if (!item) {
      return null;
    }

    const exercise = getExercise(item.exercise_id);

    if (!exercise) {
      return null;
    }

    return {
      workout: exercise,
      completed: item.status === "completed",
    };
  })
  .filter(Boolean) as { workout: Exercise; completed: boolean }[];

const recentWorkouts = [completedHistory[2], completedHistory[3]]
  .filter(Boolean)
  .map((item) => {
    const exercise = getExercise(item.exercise_id);

    if (!exercise) {
      return null;
    }

    return {
      workout: exercise,
      duration: item.duration,
      completedAt: new Date(item.created_at),
    };
  })
  .filter(Boolean) as {
  workout: Exercise;
  duration: number;
  completedAt: Date;
}[];

const completedDates = userHistory
  .filter((item) => item.status === "completed")
  .map((item) => new Date(item.created_at));

const latestNews = news.map((item) => ({
  id: item.news_id,
  image: item.image,
  title: item.home_title,
}));

const profile = currentProfile ?? userProfiles[0];

export default function Home() {
  const router = useRouter();
  const themeColor = useThemeColor();

  const { hasCompletedWorkout } = useWorkoutContext();

  const goToWorkout = () => {
    router.push("/(main)/workout-flow");
  };

  const goToDetail = (exercise: (typeof exercises)[number]) => {
    router.push({
      pathname: "/(main)/workout-flow",
      params: {
        workoutId: exercise.exercise_id,
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
        <HomeHeader name={currentUser.name} />
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
            <WeeklyWorkout
              completedDates={completedDates}
              weeklyTarget={profile.frequency_exercise}
            />

            <TodaysWorkout workouts={todayWorkouts} onSelect={goToDetail} />

            <RecommendedWorkouts
              workouts={exercises}
              onSelect={goToDetail}
            />
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
              value={String(profile.height)}
              unit="cm"
              label="Height"
            />

            <StatCard
              icon={<Scale size={22} color={themeColor.destructive} />}
              value={String(profile.weight)}
              unit="kg"
              label="Weight"
            />

            <StatCard
              icon={<Gauge size={22} color={themeColor.destructive} />}
              value={profile.bmi.toFixed(1)}
              unit={profile.bmi_status}
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

          <NewsCard data={latestNews} />
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
