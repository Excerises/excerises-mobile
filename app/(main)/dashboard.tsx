import { useRouter } from "expo-router";
import {
  ChartNoAxesColumnIncreasing,
  Dumbbell,
} from "lucide-react-native";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import DashboardHeader from "@/components/ui/main/dashboard/dashboard-header";
import NewsCard from "@/components/ui/main/dashboard/news-card";
import RecentWorkoutCard from "@/components/ui/main/dashboard/recent-workout-card";
import StatCard from "@/components/ui/main/dashboard/stat-card";
import WorkoutBanner from "@/components/ui/main/dashboard/workout-banner";
import UIText from "@/components/ui/text";
import useThemeColor from "@/hooks/use-theme-color";

export default function Dashboard() {
  const router = useRouter();
  const themeColor = useThemeColor();

  const goToWorkout = () => {
    router.push("/type-workout");
  };

  const goToHistory = () => {
    router.push("/history");
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
        <DashboardHeader
          name="User"
          onNotificationPress={() => {}}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <WorkoutBanner
          image={require("@/assets/images/workout-dark.jpeg")}
          title={"Ready to\nWorkout?"}
          description={
            "Choose your workout type\nand get personalized exercises."
          }
          onPress={goToWorkout}
        />

        <View style={styles.sectionHeader}>
          <UIText style={styles.sectionTitle}>
            Your Body Stats
          </UIText>

          <Pressable>
            <UIText style={styles.seeDetails}>
              See Details &gt;
            </UIText>
          </Pressable>
        </View>

        <View style={styles.statsRow}>
          <StatCard
            icon={
              <ChartNoAxesColumnIncreasing
                size={21}
                color={themeColor.destructive}
              />
            }
            value="171"
            unit="cm"
            label="Height"
          />

          <StatCard
            icon={
              <Dumbbell
                size={21}
                color={themeColor.destructive}
              />
            }
            value="68.5"
            unit="kg"
            label="Weight"
          />

          <StatCard
            icon={
              <ChartNoAxesColumnIncreasing
                size={21}
                color={themeColor.destructive}
              />
            }
            value="23.4"
            unit="Normal"
            label="BMI"
            unitColor="#16C84E"
          />
        </View>

        <View style={styles.sectionHeader}>
          <UIText style={styles.sectionTitle}>
            Recent Workouts
          </UIText>

          <Pressable onPress={goToHistory}>
            <UIText style={styles.seeDetails}>
              See All &gt;
            </UIText>
          </Pressable>
        </View>

        <RecentWorkoutCard
          title="Full Body Beginner"
          type="Beginner • Full Body"
          duration="25 min"
          onPress={() => {}}
        />

        <RecentWorkoutCard
          title="Upper Body"
          type="Beginner • Upper Body"
          duration="18 min"
          onPress={() => {}}
        />

        <View style={styles.sectionHeader}>
          <UIText style={styles.sectionTitle}>
            Latest News
          </UIText>

          <Pressable>
            <UIText style={styles.seeDetails}>
              See All &gt;
            </UIText>
          </Pressable>
        </View>

        <NewsCard
          data={[
            {
              id: "1",
              image: require("@/assets/images/workout-dark.jpeg"),
              title: "5 Tips to Stay\nConsistent with\nYour Workout",
            },
            {
              id: "2",
              image: require("@/assets/images/workout-dark.jpeg"),
              title: "How to Build a\nConsistent Workout\nRoutine",
            },
            {
              id: "3",
              image: require("@/assets/images/workout-dark.jpeg"),
              title: "Best Time to\nStart Your Daily\nWorkout",
            },
          ]}
          onPress={(item) => {
            console.log("News selected:", item.id);
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 17,
    paddingTop: 14,
  },
  scrollContent: {
    paddingHorizontal: 17,
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 17,
    marginBottom: 7,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
  },
  seeDetails: {
    fontSize: 10,
  },
  statsRow: {
    flexDirection: "row",
    gap: 14,
  },
});