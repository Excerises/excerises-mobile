import { Clock3, MoreVertical } from "lucide-react-native";

import { Image, Pressable, StyleSheet, View } from "react-native";

import UIButton from "@/components/ui/common/button";
import UIText from "@/components/ui/common/text";
import useThemeColor from "@/hooks/use-theme-color";

import type { Exercise } from "@/components/data/Exercise";

type WorkoutStatus = "completed" | "not_completed";

type WorkoutCurrentCardProps = {
  workout: Exercise;
  duration: string;
  status: WorkoutStatus;
  onContinue: () => void;
  onMenu: () => void;
};

export default function WorkoutCurrentCard({
  workout,
  duration,
  status,
  onContinue,
  onMenu,
}: WorkoutCurrentCardProps) {
  const themeColor = useThemeColor();

  const isCompleted = status === "completed";

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeColor.card,
          borderColor: themeColor.border,
        },
      ]}
    >
      {/* Exercise Image */}
      <View style={styles.imageContainer}>
        <Image source={workout.image} style={styles.image} />

        {/* Workout Status */}
        <View
          style={[
            styles.status,
            {
              backgroundColor: themeColor.card,
            },
          ]}
        >
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor: isCompleted ? "#22C55E" : themeColor.primary,
              },
            ]}
          />

          <UIText
            style={[
              styles.statusText,
              {
                color: isCompleted ? "#22C55E" : themeColor.primary,
              },
            ]}
          >
            {isCompleted ? "Completed" : "Not Completed"}
          </UIText>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Title + Menu */}
        <View style={styles.titleRow}>
          <UIText
            style={[
              styles.title,
              {
                color: themeColor.text,
              },
            ]}
            numberOfLines={1}
          >
            {workout.exercise_name}
          </UIText>

          <Pressable onPress={onMenu} style={styles.menuButton} hitSlop={8}>
            <MoreVertical size={20} color={themeColor.text} />
          </Pressable>
        </View>

        {/* Metadata */}
        <UIText variant="muted" style={styles.meta}>
          {workout.body_part} • {workout.equipment} • {workout.level}
        </UIText>

        {/* Bottom Row */}
        <View style={styles.bottomRow}>
          {/* Duration */}
          <View style={styles.duration}>
            <Clock3 size={15} color={themeColor.primary} />

            <UIText style={styles.durationText}>{duration}</UIText>
          </View>

          {/* Continue Button */}
          <UIButton
            label="Continue Workout →"
            variant="primary"
            style={styles.button}
            onPress={onContinue}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
  },

  imageContainer: {
    width: "100%",
    height: 160,
    position: "relative",
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  status: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 12,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },

  statusText: {
    fontSize: 9,
    fontWeight: "600",
  },

  content: {
    padding: 10,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
  },

  menuButton: {
    width: 32,
    height: 32,
    marginLeft: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  meta: {
    fontSize: 10,
    marginTop: 3,
  },

  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
  },

  duration: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  durationText: {
    fontSize: 13,
    fontWeight: "600",
  },

  button: {
    flex: 1,
    height: 38,
    minHeight: 38,
    marginTop: 0,
    paddingHorizontal: 6,
  },
});
