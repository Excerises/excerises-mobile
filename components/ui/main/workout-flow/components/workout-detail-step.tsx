import { Dumbbell, Link, List, Target } from "lucide-react-native";
import { Image, StyleSheet, View } from "react-native";

import UIButton from "@/components/ui/common/button";
import UIText from "@/components/ui/common/text";
import useThemeColor from "@/hooks/use-theme-color";

import type { Workout } from "@/components/data/workout-data";

type WorkoutDetailStepProps = {
  workout: Workout;
  onStart: () => void;
};

export default function WorkoutDetailStep({
  workout,
  onStart,
}: WorkoutDetailStepProps) {
  const themeColor = useThemeColor();

  const secondaryMuscles = workout.secondaryMuscles
    .split(/[,•]+/)
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <View style={styles.container}>
      <UIText style={styles.title}>{workout.title}</UIText>

      <View style={styles.tags}>
        <View
          style={[
            styles.tag,
            {
              backgroundColor: themeColor.primary,
            },
          ]}
        >
          <UIText
            style={[
              styles.tagText,
              {
                color: themeColor.white,
              },
            ]}
          >
            {workout.bodyPart}
          </UIText>
        </View>

        <View
          style={[
            styles.tag,
            {
              backgroundColor: themeColor.card,
              borderColor: themeColor.border,
            },
          ]}
        >
          <UIText
            style={[
              styles.tagText,
              {
                color: themeColor.foreground,
              },
            ]}
          >
            {workout.difficulty}
          </UIText>
        </View>

        <View
          style={[
            styles.tag,
            {
              backgroundColor: themeColor.card,
              borderColor: themeColor.border,
            },
          ]}
        >
          <UIText
            style={[
              styles.tagText,
              {
                color: themeColor.foreground,
              },
            ]}
          >
            {workout.equipment}
          </UIText>
        </View>
      </View>

      <Image
        source={workout.image}
        style={[
          styles.detailImage,
          {
            borderColor: themeColor.border,
          },
        ]}
      />

      <UIText style={styles.sectionTitle}>About This Exercise</UIText>

      <UIText variant="muted" style={styles.description}>
        {workout.description}
      </UIText>

      <View style={styles.muscleRow}>
        <View
          style={[
            styles.muscleCard,
            {
              backgroundColor: themeColor.card,
              borderColor: themeColor.border,
            },
          ]}
        >
          <View style={styles.muscleHeader}>
            <Target size={22} color={themeColor.primary} />

            <UIText style={styles.muscleTitle}>Primary Muscles</UIText>
          </View>

          <View
            style={[
              styles.muscleTag,
              {
                backgroundColor: themeColor.destructive,
              },
            ]}
          >
            <UIText
              style={[
                styles.muscleTagText,
                {
                  color: themeColor.white,
                },
              ]}
            >
              {workout.bodyPart}
            </UIText>
          </View>
        </View>

        <View
          style={[
            styles.muscleCard,
            {
              backgroundColor: themeColor.card,
              borderColor: themeColor.border,
            },
          ]}
        >
          <View style={styles.muscleHeader}>
            <Link size={22} color={themeColor.primary} />

            <UIText style={styles.muscleTitle}>Secondary Muscles</UIText>
          </View>

          <View style={styles.muscleTags}>
            {secondaryMuscles.map((muscle) => (
              <View
                key={muscle}
                style={[
                  styles.muscleTag,
                  {
                    backgroundColor: themeColor.destructive,
                  },
                ]}
              >
                <UIText
                  style={[
                    styles.muscleTagText,
                    {
                      color: themeColor.white,
                    },
                  ]}
                >
                  {muscle}
                </UIText>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View
        style={[
          styles.infoCard,
          {
            backgroundColor: themeColor.card,
            borderColor: themeColor.border,
          },
        ]}
      >
        <Dumbbell size={28} color={themeColor.foreground} />

        <View style={styles.infoContent}>
          <UIText style={styles.infoTitle}>Equipment</UIText>

          <UIText variant="muted" style={styles.infoValue}>
            {workout.equipment}
          </UIText>
        </View>
      </View>

      <View
        style={[
          styles.instructionsCard,
          {
            backgroundColor: themeColor.card,
            borderColor: themeColor.border,
          },
        ]}
      >
        <View style={styles.instructionsHeader}>
          <List size={28} color={themeColor.foreground} />

          <UIText style={styles.instructionsTitle}>Instructions</UIText>
        </View>

        <View style={styles.instructions}>
          {workout.instructions.map((instruction, index) => (
            <View
              key={`${index}-${instruction}`}
              style={styles.instructionItem}
            >
              <View
                style={[
                  styles.number,
                  {
                    backgroundColor: themeColor.primary,
                  },
                ]}
              >
                <UIText
                  style={[
                    styles.numberText,
                    {
                      color: themeColor.white,
                    },
                  ]}
                >
                  {index + 1}
                </UIText>
              </View>

              <UIText variant="muted" style={styles.instructionText}>
                {instruction}
              </UIText>
            </View>
          ))}
        </View>
      </View>

      <UIButton
        style={styles.mainButton}
        label="Start Workout"
        variant="primary"
        onPress={onStart}
      />
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

  tags: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },

  tag: {
    minHeight: 38,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  tagText: {
    fontSize: 14,
  },

  detailImage: {
    width: "100%",
    height: 220,
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 18,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 24,
  },

  description: {
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },

  muscleRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 18,
  },

  muscleCard: {
    flex: 1,
    minHeight: 96,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    justifyContent: "space-between",
  },

  muscleHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  muscleTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
  },

  muscleTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 12,
  },

  muscleTag: {
    alignSelf: "flex-start",
    borderRadius: 16,
    paddingHorizontal: 11,
    paddingVertical: 6,
  },

  muscleTagText: {
    fontSize: 10,
  },

  infoCard: {
    minHeight: 90,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginTop: 14,
  },

  infoContent: {
    marginLeft: 14,
  },

  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  infoValue: {
    fontSize: 13,
    marginTop: 3,
  },

  instructionsCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginTop: 14,
  },

  instructionsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  instructionsTitle: {
    fontSize: 18,
    fontWeight: "600",
  },

  instructions: {
    marginTop: 16,
    gap: 10,
  },

  instructionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },

  number: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },

  numberText: {
    fontSize: 14,
    fontWeight: "600",
  },

  instructionText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
    paddingTop: 5,
  },

  mainButton: {
    width: "100%",
    height: 52,
    marginTop: 24,
    borderRadius: 10,
    marginBottom: 20,
  },
});
