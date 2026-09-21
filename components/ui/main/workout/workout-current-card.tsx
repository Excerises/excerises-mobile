import { Clock3 } from "lucide-react-native";

import { Image, StyleSheet, View } from "react-native";

import UIButton from "@/components/ui/common/button";

import UIText from "@/components/ui/common/text";

import useThemeColor from "@/hooks/use-theme-color";

import type { Workout } from "@/components/data/workout-data";

type WorkoutCurrentCardProps = {
  workout: Workout;
  duration: string;
  onContinue: () => void;
};

export default function WorkoutCurrentCard({
  workout,
  duration,
  onContinue,
}: WorkoutCurrentCardProps) {
  const themeColor = useThemeColor();

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
      <View style={styles.imageContainer}>
        <Image source={workout.image} style={styles.image} />

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
                backgroundColor: themeColor.primary,
              },
            ]}
          />

          <UIText style={styles.statusText}>In Progress</UIText>
        </View>
      </View>

      <View style={styles.content}>
        <UIText style={styles.title}>{workout.title}</UIText>

        <UIText variant="muted" style={styles.meta}>
          {workout.bodyPart} • {workout.equipment} • {workout.difficulty}
        </UIText>

        <View style={styles.bottomRow}>
          <View style={styles.duration}>
            <Clock3 size={15} color={themeColor.primary} />

            <UIText style={styles.durationText}>{duration}</UIText>
          </View>

          <UIButton
            label="Continue Workout  →"
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
    borderRadius: 7,
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

  title: {
    fontSize: 14,
    fontWeight: "600",
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
