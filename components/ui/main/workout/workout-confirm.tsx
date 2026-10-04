import { useConfirmWorkoutForm } from "@/hooks/form/start-workout/use-confirm-workout";
import FieldControl from "../../common/form/field-control";
import UIText from "../../common/text";
import StartWorkoutLayout from "./start-workout-layout";
import Input from "../../common/form/input";
import { useStartWorkout } from "@/components/provider/main/start-workout-provider";
import { StyleSheet, View } from "react-native";
import { ExerciseCard } from "../exercise/exercise-card";
import UIButton from "../../common/button";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "@/hooks/use-toast";
import moment from "moment";
import { useEffect } from "react";

export default function WorkoutConfirm() {
  const { selectedExercises } = useStartWorkout();

  const {
    form: { control, handleSubmit, setValue },
  } = useConfirmWorkoutForm();
  const toast = useToast();

  const onConfirm = handleSubmit((val) => {
    toast.success({
      title: "Workout Created",
      description: "You can start your workout now",
    });
  });

  useEffect(() => {
    const date = moment().format("YYYYMMDD");
    const name = `Workout #${date}`;
    setValue("name", name);
  }, []);

  return (
    <StartWorkoutLayout
      title="Confirm Workout"
      description="Review the exercises you selected before creating your package"
    >
      <View style={{ flex: 1, gap: 20 }}>
        <FieldControl
          control={control}
          name="name"
          label="Workout Name"
          render={({ field }) => (
            <Input
              placeholder="Enter workout name"
              value={field.value}
              onChangeText={(v) => field.onChange(v)}
            />
          )}
        />
        <View style={{ gap: 12 }}>
          <UIText style={styles.exerciseTitle}>
            Exercises ({selectedExercises.length})
          </UIText>
          <View style={{ gap: 10 }}>
            {selectedExercises.map((exercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
          </View>
        </View>
      </View>
      <SafeAreaView edges={["bottom"]}>
        <UIButton
          label="Save Workout and Start"
          variant="primary"
          onPress={onConfirm}
        />
      </SafeAreaView>
    </StartWorkoutLayout>
  );
}

const styles = StyleSheet.create({
  exerciseTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
