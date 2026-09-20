import { Image, StyleSheet, View } from "react-native";

import UIButton from "@/components/ui/common/button";
import UIText from "@/components/ui/common/text";
import useThemeColor from "@/hooks/use-theme-color";

import type { Workout } from "@/components/data/workout-data";

type WorkoutRecommendedCardProps = {
  workout: Workout;
  onPress: () => void;
};

export default function WorkoutRecommendedCard({
  workout,
  onPress,
}: WorkoutRecommendedCardProps) {
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
      <Image source={workout.image} style={styles.image} />

      <View style={styles.content}>
        <UIText style={styles.title} numberOfLines={1}>
          {workout.title}
        </UIText>

        <UIText variant="muted" style={styles.meta} numberOfLines={1}>
          {workout.bodyPart} • {workout.equipment}
        </UIText>

        <UIText variant="muted" style={styles.difficulty}>
          {workout.difficulty}
        </UIText>

        <UIButton
          label="VIEW"
          style={[
            styles.button,
            {
              borderColor: themeColor.primary,
            },
          ]}
          labelStyle={{
            color: themeColor.primary,
            fontSize: 10,
          }}
          onPress={onPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "48.5%",
    borderWidth: 1,
    borderRadius: 6,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 82,
  },

  content: {
    padding: 8,
  },

  title: {
    fontSize: 10,
    fontWeight: "600",
  },

  meta: {
    fontSize: 8,
    marginTop: 3,
  },

  difficulty: {
    fontSize: 8,
    marginTop: 2,
  },

  button: {
    width: "100%",
    height: 30,
    minHeight: 30,
    marginTop: 7,
    paddingHorizontal: 4,
    borderRadius: 5,
  },
});
