import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import StartWorkoutLayout from "./start-workout-layout";
import { SafeAreaView } from "react-native-safe-area-context";
import UIButton from "../../common/button";
import UIText from "../../common/text";
import { useStartWorkout } from "@/components/provider/main/start-workout-provider";
import UIView from "../../common/view";
import { Exercise, ExerciseCategory } from "@/types/entity";
import useThemeColor from "@/hooks/use-theme-color";
import { Checkbox } from "expo-checkbox";
import { useMemo } from "react";
import {
  ActivityIcon,
  BoneIcon,
  DnaIcon,
  LucideIcon,
  PillIcon,
  SportShoeIcon,
  TextCursorIcon,
  WeightIcon,
  ZapIcon,
} from "lucide-react-native";

function ExerciseCard({
  exercise,
  onPress,
  isSelected,
}: {
  exercise: Exercise;
  isSelected?: boolean;
  onPress?: () => void;
}) {
  const color = useThemeColor();
  const Icon = useMemo(() => {
    const availables: Record<ExerciseCategory, LucideIcon> = {
      stretching: DnaIcon,
      cardio: SportShoeIcon,
      balance: WeightIcon,
      mobility: ZapIcon,
      rehabilitation: PillIcon,
      strength: ActivityIcon,
      plyometrics: BoneIcon,
    };

    return availables[exercise.category];
  }, []);

  return (
    <Pressable onPress={onPress}>
      <UIView
        variant="card"
        style={[
          styles.exerciseCard,
          {
            borderWidth: 1,
            borderColor: isSelected ? color.primary : "transparent",
          },
        ]}
      >
        <UIView style={styles.exerciseCardIconContainer}>
          <Icon color={color.primary} size={30} />
        </UIView>
        <View style={styles.exerciseCardContent}>
          <UIText style={styles.exerciseCardContentTitle} numberOfLines={1}>
            {exercise.name}
          </UIText>
          <UIText variant="muted">
            {exercise.target} - {exercise.equipment}
          </UIText>
        </View>
        <Checkbox
          value={isSelected}
          color={color.primary}
          onValueChange={onPress}
          style={{ borderWidth: 1.2 }}
        />
      </UIView>
    </Pressable>
  );
}

export default function WorkoutSelectExercises() {
  const { recommendedExercises, selectedExercises, setSelectedExercises } =
    useStartWorkout();

  function handleToggleSelected(exercise: Exercise) {
    if (selectedExercises.map((s) => s.id).includes(exercise.id)) {
      setSelectedExercises(
        selectedExercises.filter((s) => s.id !== exercise.id),
      );
    } else {
      setSelectedExercises([...selectedExercises, exercise]);
    }
  }

  return (
    <StartWorkoutLayout
      title="Select Exercises"
      description="Choose several exercises for your workout plans."
    >
      <View style={styles.preview}>
        <UIText variant="muted">Based on your preferences</UIText>
        <UIText variant="muted">{recommendedExercises.length} exercises</UIText>
      </View>
      {recommendedExercises.length <= 0 ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <UIText>No recommended workout exists.</UIText>
        </View>
      ) : (
        <ScrollView style={styles.content}>
          <View style={{ gap: 10 }}>
            {recommendedExercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                onPress={() => handleToggleSelected(exercise)}
                isSelected={selectedExercises
                  .map((s) => s.id)
                  .includes(exercise.id)}
              />
            ))}
          </View>
        </ScrollView>
      )}
      <View style={styles.preview}>
        <UIText>Selected exercises ({selectedExercises.length})</UIText>
      </View>
      <SafeAreaView edges={["bottom"]}>
        <UIButton
          disabled={selectedExercises.length <= 0}
          label="Confirm Workout"
          variant="primary"
        />
      </SafeAreaView>
    </StartWorkoutLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  preview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  exerciseCard: {
    padding: 10,
    borderRadius: 6,
    gap: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  exerciseCardIconContainer: {
    height: 60,
    width: 60,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  exerciseCardContent: {
    flex: 1,
  },
  exerciseCardContentTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    width: 200,
  },
});
