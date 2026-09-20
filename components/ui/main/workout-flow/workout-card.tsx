import { Image, Pressable, StyleSheet, View } from "react-native";

import UIText from "@/components/ui/common/text";
import useThemeColor from "@/hooks/use-theme-color";

import type { Workout } from "@/components/data/workout-data";

type WorkoutCardProps = {
  workout: Workout;
  onPress: () => void;
};

export default function WorkoutCard({ workout, onPress }: WorkoutCardProps) {
  const themeColor = useThemeColor();

  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: themeColor.card,
          borderColor: themeColor.border,
        },
      ]}
      onPress={onPress}
    >
      <Image source={workout.image} style={styles.image} />

      <View style={styles.content}>
        <UIText style={styles.title}>{workout.title}</UIText>

        <UIText style={styles.meta}>
          {workout.bodyPart} • {workout.difficulty}
        </UIText>

        <UIText style={styles.meta}>{workout.equipment}</UIText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 100,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 6,
    overflow: "hidden",
  },

  image: {
    width: 100,
    height: 100,
  },

  content: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
  },

  meta: {
    fontSize: 12,
    marginTop: 4,
  },
});
