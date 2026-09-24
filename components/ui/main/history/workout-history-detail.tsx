import {
    CalendarDays,
    Check,
    Clock3,
    Frown,
    Meh,
    Smile,
    Trophy,
} from "lucide-react-native";

import { Image, ScrollView, StyleSheet, View } from "react-native";

import UIText from "@/components/ui/common/text";

import type { Exercise } from "@/components/data/Exercise";
import useThemeColor from "@/hooks/use-theme-color";

import {
    formatDate,
    formatTime,
    type WorkoutHistoryItem,
} from "../../../data/History";

type Difficulty = "Too Easy" | "Just Right" | "Too Hard";

type WorkoutHistoryDetailProps = {
  workout: WorkoutHistoryItem;
  exercises: Exercise[];
};

const difficultyIcons = {
  "Too Easy": Smile,
  "Just Right": Meh,
  "Too Hard": Frown,
};

const difficultyRank: Record<Difficulty, number> = {
  "Too Easy": 1,
  "Just Right": 2,
  "Too Hard": 3,
};

const getOverallDifficulty = (
  difficulties: (Difficulty | undefined)[],
): Difficulty => {
  const values = difficulties.filter((difficulty): difficulty is Difficulty =>
    Boolean(difficulty),
  );

  if (values.length === 0) {
    return "Just Right";
  }

  const average =
    values.reduce(
      (total, difficulty) => total + difficultyRank[difficulty],
      0,
    ) / values.length;

  if (average < 1.5) {
    return "Too Easy";
  }

  if (average > 2.5) {
    return "Too Hard";
  }

  return "Just Right";
};

export default function WorkoutHistoryDetail({
  workout,
  exercises,
}: WorkoutHistoryDetailProps) {
  const themeColor = useThemeColor();
  const overallDifficulty = getOverallDifficulty(
    workout.historyItems.map((item) => item.difficulty),
  );
  const OverallIcon = difficultyIcons[overallDifficulty];
  const firstExercise = exercises[0];

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {firstExercise && (
          <View style={styles.hero}>
            <Image source={firstExercise.image} style={styles.heroImage} />

            <View
              style={[
                styles.heroOverlay,
                { backgroundColor: themeColor.overlay },
              ]}
            />

            <View style={styles.heroContent}>
              <UIText style={[styles.heroTitle, { color: themeColor.white }]}>
                {workout.title}
              </UIText>

              <UIText
                style={[styles.heroSubtitle, { color: themeColor.white }]}
              >
                {workout.target} • {workout.bodyPart}
              </UIText>
            </View>
          </View>
        )}

        <View
          style={[
            styles.infoCard,
            {
              backgroundColor: themeColor.card,
              borderColor: themeColor.border,
            },
          ]}
        >
          <View style={styles.infoItem}>
            <CalendarDays size={20} color={themeColor.foreground} />
            <View style={styles.infoText}>
              <UIText variant="muted" style={styles.infoLabel}>
                Date
              </UIText>
              <UIText style={styles.infoValue}>
                {formatDate(workout.createdAt)}
              </UIText>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Clock3 size={20} color={themeColor.foreground} />
            <View style={styles.infoText}>
              <UIText variant="muted" style={styles.infoLabel}>
                Time
              </UIText>
              <UIText style={styles.infoValue}>
                {formatTime(workout.createdAt)}
              </UIText>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Check size={20} color={themeColor.success} strokeWidth={3} />
            <View style={styles.infoText}>
              <UIText variant="muted" style={styles.infoLabel}>
                Status
              </UIText>
              <UIText style={[styles.infoValue, { color: themeColor.success }]}>
                Completed
              </UIText>
            </View>
          </View>
        </View>

        <UIText style={styles.sectionTitle}>Overall Feedback</UIText>

        <View
          style={[
            styles.overallCard,
            {
              backgroundColor: themeColor.card,
              borderColor: themeColor.success,
            },
          ]}
        >
          <View
            style={[
              styles.overallIcon,
              { backgroundColor: themeColor.success },
            ]}
          >
            <Trophy size={21} color={themeColor.black} strokeWidth={2.5} />
          </View>

          <View style={styles.overallContent}>
            <UIText
              style={[styles.overallValue, { color: themeColor.success }]}
            >
              {overallDifficulty}
            </UIText>

            <UIText variant="muted" style={styles.overallDescription}>
              Your workout difficulty was rated based on your exercise feedback.
            </UIText>
          </View>
        </View>

        <UIText style={styles.sectionTitle}>
          Exercise Feedback ({exercises.length})
        </UIText>

        <View style={styles.feedbackList}>
          {exercises.map((exercise, index) => {
            const history = workout.historyItems[index];
            const difficulty = history?.difficulty ?? "Just Right";
            const Icon = difficultyIcons[difficulty];

            return (
              <View
                key={`${exercise.exercise_id}-${index}`}
                style={[
                  styles.feedbackCard,
                  {
                    backgroundColor: themeColor.card,
                    borderColor: themeColor.border,
                  },
                ]}
              >
                <Image source={exercise.image} style={styles.exerciseImage} />

                <View style={styles.exerciseContent}>
                  <UIText style={styles.exerciseName} numberOfLines={1}>
                    {exercise.exercise_name}
                  </UIText>

                  <UIText variant="muted" style={styles.exerciseMeta}>
                    {exercise.body_part} • {exercise.equipment}
                  </UIText>
                </View>

                <View
                  style={[
                    styles.difficultyPill,
                    {
                      borderColor:
                        difficulty === "Too Hard"
                          ? themeColor.danger
                          : themeColor.success,
                    },
                  ]}
                >
                  <Icon
                    size={16}
                    color={
                      difficulty === "Too Hard"
                        ? themeColor.danger
                        : themeColor.success
                    }
                  />

                  <UIText
                    style={[
                      styles.difficultyText,
                      {
                        color:
                          difficulty === "Too Hard"
                            ? themeColor.danger
                            : themeColor.success,
                      },
                    ]}
                  >
                    {difficulty}
                  </UIText>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 22,
  },

  hero: {
    height: 175,
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 2,
  },

  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
  },

  heroContent: {
    position: "absolute",
    left: 14,
    right: 14,
    bottom: 14,
  },

  heroTitle: {
    fontSize: 22,
    fontWeight: "700",
  },

  heroSubtitle: {
    fontSize: 12,
    marginTop: 3,
  },

  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 11,
    marginTop: 10,
  },

  infoItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  infoText: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 9,
  },

  infoValue: {
    fontSize: 10,
    fontWeight: "600",
    marginTop: 1,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 18,
    marginBottom: 8,
  },

  overallCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 11,
  },

  overallIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },

  overallContent: {
    flex: 1,
    marginLeft: 10,
  },

  overallValue: {
    fontSize: 15,
    fontWeight: "700",
  },

  overallDescription: {
    fontSize: 10,
    lineHeight: 15,
    marginTop: 2,
  },

  feedbackList: {
    gap: 8,
  },

  feedbackCard: {
    minHeight: 70,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 7,
  },

  exerciseImage: {
    width: 58,
    height: 58,
    borderRadius: 8,
  },

  exerciseContent: {
    flex: 1,
    marginLeft: 9,
    marginRight: 7,
  },

  exerciseName: {
    fontSize: 11,
    fontWeight: "600",
  },

  exerciseMeta: {
    fontSize: 9,
    marginTop: 3,
  },

  difficultyPill: {
    minHeight: 31,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 7,
  },

  difficultyText: {
    fontSize: 9,
    fontWeight: "700",
  },
});
