import { useRouter } from "expo-router";
import { ChevronDown, SlidersHorizontal } from "lucide-react-native";
import { useCallback, useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  ViewToken,
} from "react-native";

import { exercises, type Exercise } from "@/components/data/Exercise";
import { histories } from "@/components/data/History";
import { currentUser } from "@/components/data/User";

import UIText from "@/components/ui/common/text";
import WorkoutCurrentCard from "@/components/ui/main/workout/workout-current-card";
import WorkoutCustomizeBanner from "@/components/ui/main/workout/workout-customize-banner";
import WorkoutHeader from "@/components/ui/main/workout/workout-header";
import WorkoutHistoryList, {
  type WorkoutHistoryItem,
} from "@/components/ui/main/workout/workout-history-list";
import WorkoutRecommendedCard from "@/components/ui/main/workout/workout-recommended-card";

import useThemeColor from "@/hooks/use-theme-color";

const { width } = Dimensions.get("window");

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds,
  ).padStart(2, "0")}`;
};

const userHistory = histories.filter(
  (item) => item.user_id === currentUser.user_id,
);

const getExercise = (exerciseId: string) =>
  exercises.find((exercise) => exercise.exercise_id === exerciseId);

const currentWorkouts = userHistory
  .filter((item) => item.status === "in_progress")
  .map((item) => {
    const exercise = getExercise(item.exercise_id);

    if (!exercise) {
      return null;
    }

    return {
      workout: exercise,
      duration: formatDuration(item.duration),
    };
  })
  .filter(Boolean) as { workout: Exercise; duration: string }[];

const completedHistory = userHistory
  .filter((item) => item.status === "completed")
  .sort(
    (first, second) =>
      new Date(second.created_at).getTime() -
      new Date(first.created_at).getTime(),
  );

const historyDates = [
  ...new Set(
    completedHistory.map((item) => new Date(item.created_at).toDateString()),
  ),
];

const historyTodayDate = historyDates[0];
const historyYesterdayDate = historyDates[1];

const historyToday = userHistory
  .filter(
    (item) =>
      historyTodayDate &&
      new Date(item.created_at).toDateString() === historyTodayDate,
  )
  .filter((item) => item.status === "completed")
  .map((item) => {
    const exercise = getExercise(item.exercise_id);

    if (!exercise) {
      return null;
    }

    return {
      workout: exercise,
      duration: formatDuration(item.duration),
      completed: true,
      createdAt: item.created_at,
    };
  })
  .filter(Boolean) as WorkoutHistoryItem[];

const historyYesterday = userHistory
  .filter(
    (item) =>
      historyYesterdayDate &&
      new Date(item.created_at).toDateString() === historyYesterdayDate,
  )
  .filter((item) => item.status === "completed")
  .map((item) => {
    const exercise = getExercise(item.exercise_id);

    if (!exercise) {
      return null;
    }

    return {
      workout: exercise,
      duration: formatDuration(item.duration),
      completed: true,
      createdAt: item.created_at,
    };
  })
  .filter(Boolean) as WorkoutHistoryItem[];

const filters = [
  "All",
  "Chest",
  "Arms",
  "Legs",
  "Core",
  "Back",
  "Shoulders",
  "Full Body",
];

const historyFilters = ["All", "Today", "This Week", "This Month"] as const;

type HistoryFilter = (typeof historyFilters)[number];

export default function WorkoutScreen() {
  const router = useRouter();
  const themeColor = useThemeColor();

  const [activeTab, setActiveTab] = useState<"myWorkout" | "history">(
    "myWorkout",
  );

  const [activeCurrentIndex, setActiveCurrentIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [historyFilter, setHistoryFilter] = useState<HistoryFilter>("All");
  const [showAllRecommended, setShowAllRecommended] = useState(false);

  const cardWidth = width - 40;

  const goToCustomize = () => {
    router.push("/(main)/workout-flow");
  };

  const goToDetail = (workout: Exercise) => {
    router.push({
      pathname: "/(main)/workout-flow",
      params: {
        workoutId: workout.exercise_id,
      },
    });
  };

  const handleCurrentViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const index = viewableItems[0]?.index;

      if (index === null || index === undefined) {
        return;
      }

      setActiveCurrentIndex(index);
    },
    [],
  );

  const filteredRecommendedWorkouts = exercises.filter((workout) => {
    if (activeFilter === "All") {
      return true;
    }

    if (activeFilter === "Full Body") {
      return ["Upper Body", "Lower Body", "Core"].includes(
        workout.exercise_category,
      );
    }

    return workout.body_part === activeFilter;
  });

  const displayedRecommendedWorkouts = showAllRecommended
    ? filteredRecommendedWorkouts
    : filteredRecommendedWorkouts.slice(0, 4);

  const filteredHistoryYesterday =
    historyFilter === "Today" ? [] : historyYesterday;

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
        <WorkoutHeader />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <WorkoutCustomizeBanner onPress={goToCustomize} />

        <View
          style={[
            styles.tabs,
            {
              borderColor: themeColor.primary,
            },
          ]}
        >
          <Pressable
            style={[
              styles.tab,
              activeTab === "myWorkout" && {
                backgroundColor: themeColor.primary,
              },
            ]}
            onPress={() => setActiveTab("myWorkout")}
          >
            <UIText
              style={[
                styles.tabText,
                activeTab === "myWorkout" && {
                  color: themeColor.black,
                },
              ]}
            >
              MY WORKOUT
            </UIText>
          </Pressable>

          <Pressable
            style={[
              styles.tab,
              activeTab === "history" && {
                backgroundColor: themeColor.primary,
              },
            ]}
            onPress={() => setActiveTab("history")}
          >
            <UIText
              style={[
                styles.tabText,
                activeTab === "history" && {
                  color: themeColor.black,
                },
              ]}
            >
              HISTORY
            </UIText>
          </Pressable>
        </View>

        {activeTab === "myWorkout" ? (
          <>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <UIText style={styles.sectionTitle}>Currently Doing</UIText>

                <UIText variant="muted" style={styles.sectionAction}>
                  Swipe to view
                </UIText>
              </View>

              <FlatList
                data={currentWorkouts}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                snapToInterval={cardWidth}
                decelerationRate="fast"
                keyExtractor={(item) => item.workout.exercise_id}
                getItemLayout={(_, index) => ({
                  length: cardWidth,
                  offset: cardWidth * index,
                  index,
                })}
                onViewableItemsChanged={handleCurrentViewableItemsChanged}
                viewabilityConfig={{
                  itemVisiblePercentThreshold: 60,
                }}
                renderItem={({ item }) => (
                  <View
                    style={{
                      width: cardWidth,
                    }}
                  >
                    <WorkoutCurrentCard
                      workout={item.workout}
                      duration={item.duration}
                      onContinue={() => goToDetail(item.workout)}
                    />
                  </View>
                )}
              />

              {currentWorkouts.length > 1 && (
                <View style={styles.indicator}>
                  {currentWorkouts.map((item, index) => (
                    <View
                      key={item.workout.exercise_id}
                      style={[
                        styles.dot,
                        {
                          backgroundColor:
                            index === activeCurrentIndex
                              ? themeColor.primary
                              : themeColor.mutedForeground,
                        },
                      ]}
                    />
                  ))}
                </View>
              )}
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <UIText style={styles.sectionTitle}>Recommended For You</UIText>

                <Pressable
                  style={[
                    styles.filterButton,
                    {
                      backgroundColor: showFilters
                        ? themeColor.primary
                        : themeColor.card,
                      borderColor: showFilters
                        ? themeColor.primary
                        : themeColor.border,
                    },
                  ]}
                  onPress={() => setShowFilters((current) => !current)}
                >
                  <SlidersHorizontal
                    size={13}
                    color={
                      showFilters ? themeColor.black : themeColor.foreground
                    }
                  />

                  <UIText
                    style={[
                      styles.filterButtonText,
                      showFilters && {
                        color: themeColor.black,
                      },
                    ]}
                  >
                    Filter
                  </UIText>
                </Pressable>
              </View>

              {showFilters && (
                <View style={styles.filterList}>
                  {filters.map((filter) => (
                    <Pressable
                      key={filter}
                      style={[
                        styles.filterChip,
                        {
                          backgroundColor:
                            activeFilter === filter
                              ? themeColor.primary
                              : themeColor.card,
                          borderColor:
                            activeFilter === filter
                              ? themeColor.primary
                              : themeColor.border,
                        },
                      ]}
                      onPress={() => setActiveFilter(filter)}
                    >
                      <UIText
                        style={[
                          styles.filterText,
                          activeFilter === filter && {
                            color: themeColor.black,
                            fontWeight: "600",
                          },
                        ]}
                      >
                        {filter}
                      </UIText>
                    </Pressable>
                  ))}
                </View>
              )}

              <View style={styles.recommendedGrid}>
                {displayedRecommendedWorkouts.map((workout) => (
                  <WorkoutRecommendedCard
                    key={workout.exercise_id}
                    workout={workout}
                    onPress={() => goToDetail(workout)}
                  />
                ))}
              </View>

              {!showAllRecommended &&
                filteredRecommendedWorkouts.length > 4 && (
                  <Pressable
                    style={[
                      styles.loadMoreButton,
                      {
                        borderColor: themeColor.primary,
                      },
                    ]}
                    onPress={() => setShowAllRecommended(true)}
                  >
                    <UIText
                      style={[
                        styles.loadMoreText,
                        {
                          color: themeColor.black,
                        },
                      ]}
                    >
                      LOAD MORE
                    </UIText>

                    <ChevronDown size={17} color={themeColor.black} />
                  </Pressable>
                )}
            </View>
          </>
        ) : (
          <>
            <View style={styles.historyHeader}>
              <UIText style={styles.historyTitle}>Workout History</UIText>

              <Pressable
                style={[
                  styles.allTimeButton,
                  {
                    backgroundColor: themeColor.card,
                    borderColor: themeColor.border,
                  },
                ]}
              >
                <UIText style={styles.allTimeText}>All Time</UIText>

                <ChevronDown size={14} color={themeColor.foreground} />
              </Pressable>
            </View>

            <View style={styles.historyFilters}>
              {historyFilters.map((filter) => (
                <Pressable
                  key={filter}
                  style={[
                    styles.historyFilterChip,
                    {
                      backgroundColor:
                        historyFilter === filter
                          ? themeColor.primary
                          : themeColor.card,
                      borderColor:
                        historyFilter === filter
                          ? themeColor.primary
                          : themeColor.border,
                    },
                  ]}
                  onPress={() => setHistoryFilter(filter)}
                >
                  <UIText
                    style={[
                      styles.historyFilterText,
                      historyFilter === filter && {
                        color: themeColor.black,
                        fontWeight: "600",
                      },
                    ]}
                  >
                    {filter}
                  </UIText>
                </Pressable>
              ))}
            </View>

            <WorkoutHistoryList
              today={historyToday}
              yesterday={filteredHistoryYesterday}
            />

            <Pressable
              style={[
                styles.loadMoreButton,
                {
                  borderColor: themeColor.primary,
                },
              ]}
            >
              <UIText
                style={[
                  styles.loadMoreText,
                  {
                    color: themeColor.primary,
                  },
                ]}
              >
                LOAD MORE
              </UIText>

              <ChevronDown size={17} color={themeColor.primary} />
            </Pressable>
          </>
        )}
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

  tabs: {
    height: 40,
    flexDirection: "row",
    marginTop: 12,
    padding: 2,
    borderWidth: 1,
    borderRadius: 8,
  },

  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },

  tabText: {
    fontSize: 10,
    fontWeight: "600",
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

  sectionAction: {
    fontSize: 9,
  },

  indicator: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginTop: 10,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },

  filterButton: {
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 9,
    borderWidth: 1,
    borderRadius: 6,
  },

  filterButtonText: {
    fontSize: 9,
    fontWeight: "600",
  },

  filterList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
    marginBottom: 10,
  },

  filterChip: {
    height: 30,
    paddingHorizontal: 13,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  filterText: {
    fontSize: 9,
  },

  recommendedGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 8,
  },

  loadMoreButton: {
    height: 40,
    marginTop: 12,
    borderWidth: 1,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  loadMoreText: {
    fontSize: 10,
    fontWeight: "600",
  },

  historyHeader: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  historyTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  allTimeButton: {
    height: 32,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  allTimeText: {
    fontSize: 9,
  },

  historyFilters: {
    flexDirection: "row",
    gap: 7,
    marginTop: 12,
  },

  historyFilterChip: {
    height: 31,
    paddingHorizontal: 11,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  historyFilterText: {
    fontSize: 9,
  },
});
