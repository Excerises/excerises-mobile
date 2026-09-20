import { CheckCircle } from "lucide-react-native";
import { Image, StyleSheet, View } from "react-native";

import UIButton from "@/components/ui/common/button";
import UIText from "@/components/ui/common/text";
import useThemeColor from "@/hooks/use-theme-color";

import type { Workout } from "@/components/data/workout-data";

type WorkoutCompleteStepProps = {
  workout: Workout | null;
  elapsedTime: string;
  onDone: () => void;
};

export default function WorkoutCompleteStep({
  workout,
  elapsedTime,
  onDone,
}: WorkoutCompleteStepProps) {
  const themeColor = useThemeColor();

  return (
    <View style={styles.container}>
      <CheckCircle size={70} color={themeColor.primary} />

      <UIText style={styles.title}>Workout Complete!</UIText>

      <UIText style={styles.subtitle}>
        Great job! You have completed your workout.
      </UIText>

      {workout && <Image source={workout.image} style={styles.completeImage} />}

      <View
        style={[
          styles.completeCard,
          {
            backgroundColor: themeColor.card,
          },
        ]}
      >
        <UIText style={styles.detailLabel}>Duration</UIText>

        <UIText style={styles.detailValue}>{elapsedTime}</UIText>

        <UIText style={styles.detailLabel}>Status</UIText>

        <UIText style={styles.detailValue}>Completed</UIText>
      </View>

      <UIButton
        style={styles.mainButton}
        label="Done"
        variant="primary"
        onPress={onDone}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 18,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },

  completeImage: {
    width: "100%",
    height: 220,
    borderRadius: 6,
    marginTop: 24,
  },

  completeCard: {
    width: "100%",
    marginTop: 20,
    padding: 20,
    borderRadius: 6,
    gap: 6,
  },

  detailLabel: {
    fontSize: 12,
  },

  detailValue: {
    fontSize: 16,
    fontWeight: "600",
  },

  mainButton: {
    width: "100%",
    height: 48,
    marginTop: 30,
    borderRadius: 6,
  },
});
