import { ChevronRight, Dumbbell, Home, Signal } from "lucide-react-native";

import { Image, Pressable, StyleSheet, View } from "react-native";

import UIText from "@/components/ui/common/text";

import useThemeColor from "@/hooks/use-theme-color";

import type { Exercise } from "@/components/data/Exercise";

type WorkoutRecommendationStepProps = {
  workouts: Exercise[];
  onSelect: (workout: Exercise) => void;
  onNotNow?: () => void;
};

export default function WorkoutRecommendationStep({
  workouts,
  onSelect,
  onNotNow,
}: WorkoutRecommendationStepProps) {
  const themeColor = useThemeColor();

  return (
    <View style={styles.container}>
      <UIText style={styles.title}>Recommended Workout</UIText>

      <UIText style={styles.subtitle}>
        Choose a workout from the list below.
      </UIText>

      <View
        style={[
          styles.notNowCard,
          {
            backgroundColor: themeColor.card,
            borderColor: themeColor.border,
          },
        ]}
      >
        <View
          style={[
            styles.notNowIcon,
            {
              backgroundColor: themeColor.danger,
            },
          ]}
        >
          <Home size={28} color={themeColor.white} />
        </View>

        <View style={styles.notNowContent}>
          <UIText style={styles.notNowTitle}>
            Not ready to work out right now?
          </UIText>

          <UIText variant="muted" style={styles.notNowDescription}>
            No problem! You can come back later.
          </UIText>
        </View>

        <Pressable
          style={[
            styles.notNowButton,
            {
              borderColor: themeColor.primary,
            },
          ]}
          onPress={onNotNow}
        >
          <UIText
            style={[
              styles.notNowButtonText,
              {
                color: themeColor.primary,
              },
            ]}
          >
            Not Now
          </UIText>

          <ChevronRight size={25} color={themeColor.primary} />
        </Pressable>
      </View>

      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <View
            style={[
              styles.sectionLine,
              {
                backgroundColor: themeColor.primary,
              },
            ]}
          />

          <View>
            <UIText style={styles.sectionTitle}>Recommended for You</UIText>

            <UIText variant="muted" style={styles.sectionSubtitle}>
              Based on your preferences
            </UIText>
          </View>
        </View>

        <UIText variant="muted" style={styles.workoutCount}>
          {workouts.length} workouts
        </UIText>
      </View>

      <View style={styles.list}>
        {workouts.map((workout) => (
          <Pressable
            key={workout.exercise_id}
            style={[
              styles.workoutCard,
              {
                backgroundColor: themeColor.card,
                borderColor: themeColor.border,
              },
            ]}
            onPress={() => onSelect(workout)}
          >
            <Image source={workout.image} style={styles.workoutImage} />

            <View style={styles.workoutContent}>
              <UIText style={styles.workoutTitle} numberOfLines={1}>
                {workout.exercise_name}
              </UIText>

              <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                  <Dumbbell size={22} color={themeColor.foreground} />

                  <UIText variant="muted" style={styles.infoText}>
                    {workout.body_part}
                  </UIText>
                </View>

                <View style={styles.infoItem}>
                  <Signal size={22} color={themeColor.foreground} />

                  <UIText variant="muted" style={styles.infoText}>
                    {workout.level}
                  </UIText>
                </View>

                <View style={styles.infoItem}>
                  <Dumbbell size={22} color={themeColor.foreground} />

                  <UIText variant="muted" style={styles.infoText}>
                    {workout.equipment}
                  </UIText>
                </View>
              </View>

              <Pressable
                style={[
                  styles.startButton,
                  {
                    backgroundColor: themeColor.primary,
                  },
                ]}
                onPress={() => onSelect(workout)}
              >
                <UIText
                  style={[
                    styles.startButtonText,
                    {
                      color: themeColor.black,
                    },
                  ]}
                >
                  Start Workout
                </UIText>

                <ChevronRight size={24} color={themeColor.black} />
              </Pressable>
            </View>

            <ChevronRight
              size={28}
              color={themeColor.foreground}
              style={styles.cardArrow}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },

  notNowCard: {
    minHeight: 118,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginTop: 30,
  },

  notNowIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
  },

  notNowContent: {
    flex: 1,
    paddingHorizontal: 12,
  },

  notNowTitle: {
    fontSize: 14,
    fontWeight: "600",
  },

  notNowDescription: {
    fontSize: 11,
    marginTop: 5,
  },

  notNowButton: {
    width: 105,
    height: 58,
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  notNowButtonText: {
    fontSize: 13,
    fontWeight: "600",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 18,
  },

  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  sectionLine: {
    width: 6,
    height: 48,
    borderRadius: 4,
    marginRight: 14,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
  },

  sectionSubtitle: {
    fontSize: 12,
    marginTop: 4,
  },

  workoutCount: {
    fontSize: 13,
    marginTop: 5,
  },

  list: {
    gap: 14,
  },

  workoutCard: {
    minHeight: 190,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 14,
    overflow: "hidden",
    position: "relative",
  },

  workoutImage: {
    width: "43%",
    height: 190,
    resizeMode: "cover",
  },

  workoutContent: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 15,
  },

  workoutTitle: {
    fontSize: 17,
    fontWeight: "600",
    marginRight: 20,
  },

  infoRow: {
    marginTop: 14,
    gap: 10,
  },

  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  infoText: {
    fontSize: 12,
  },

  startButton: {
    height: 42,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },

  startButtonText: {
    fontSize: 13,
    fontWeight: "600",
  },

  cardArrow: {
    position: "absolute",
    top: "42%",
    right: 10,
  },
});
