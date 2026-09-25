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

import FloatingWorkoutButton from "@/components/ui/main/home/floating-workout-button";

import NewsCard from "@/components/ui/main/home/news-card";

import RecentWorkouts from "@/components/ui/main/home/recent-workouts";

import StatCard from "@/components/ui/main/home/stat-card";

import WeeklyWorkout from "@/components/ui/main/home/weekly-workout";

import WorkoutBanner from "@/components/ui/main/home/workout-banner";

import useThemeColor from "@/hooks/use-theme-color";
import Header from "@/components/ui/main/header";
import { useAuth } from "@/stores/auth-store";

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

const recentWorkoutGroups = [
  completedHistory.slice(0, 3),
  completedHistory.slice(3, 6),
].filter((group) => group.length > 0);

const recentWorkouts = recentWorkoutGroups
  .map((group, index) => {
    const firstExercise = getExercise(group[0].exercise_id);

    if (!firstExercise) {
      return null;
    }

    return {
      id: `WORKOUT-${index + 1}`,
      title: `My Workout #${index + 1}`,
      exerciseCount: group.length,
      duration: group.reduce((total, item) => total + item.duration, 0),
      image: firstExercise.image,
    };
  })
  .filter(Boolean) as {
  id: string;
  title: string;
  exerciseCount: number;
  duration: number;
  image: Exercise["image"];
}[];

const completedDates = completedHistory.map(
  (item) => new Date(item.created_at),
);

const latestNews = news.map((item) => ({
  id: item.news_id,
  image: item.image,
  title: item.home_title,
  description: item.content,
}));

const profile = currentProfile ?? userProfiles[0];

export default function Home() {
  const router = useRouter();
  const themeColor = useThemeColor();

  const { hasWorkoutPlan } = useWorkoutContext();

  const goToWorkout = () => {
    router.push("/(main)/workout-flow");
  };

  const { user } = useAuth();

  const goToRecentWorkoutDetail = (workoutId: string) => {
    router.push({
      pathname: "/(main)/workout-flow",
      params: {
        workoutId,
        step: "detail",
        source: "recent",
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
        <Header
          title={`Hi ${user?.name} 👋`}
          description="Ready for a workout?"
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {!hasWorkoutPlan ? (
          <WorkoutBanner
            image={require("@/assets/images/workout-banner.jpeg")}
            title="START YOUR\nWORKOUT"
            description="Create your workout plan and start your fitness journey today."
            onPress={goToWorkout}
          />
        ) : (
          <>
            <WeeklyWorkout
              completedDates={completedDates}
              weeklyTarget={profile.frequency_exercise}
            />

            <RecentWorkouts
              workouts={recentWorkouts}
              onPress={(workout) => goToRecentWorkoutDetail(workout.id)}
            />
          </>
        )}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <UIText style={styles.sectionTitle}>Your Body Stats</UIText>
          </View>

          <View style={styles.statsRow}>
            <StatCard
              icon={<Ruler size={22} color={themeColor.primary} />}
              value={String(profile.height)}
              unit="cm"
              label="Height"
            />

            <StatCard
              icon={<Scale size={22} color={themeColor.primary} />}
              value={String(profile.weight)}
              unit="kg"
              label="Weight"
            />

            <StatCard
              icon={<Gauge size={22} color={themeColor.primary} />}
              value={profile.bmi.toFixed(1)}
              label="BMI"
              valueColor="success"
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <UIText style={styles.sectionTitle}>Latest News</UIText>
          </View>

          <NewsCard data={latestNews} />
        </View>
      </ScrollView>

      {hasWorkoutPlan && <FloatingWorkoutButton onPress={goToWorkout} />}
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
    marginBottom: 8,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
  },

  statsRow: {
    flexDirection: "row",
    gap: 6,
  },
});
