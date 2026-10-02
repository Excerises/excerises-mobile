import UIView from "../../common/view";
import UIText from "../../common/text";
import { StyleSheet } from "react-native";
import UIButton from "../../common/button";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWorkoutPreferenceForm } from "@/hooks/form/start-workout/use-workout-preference-form";
import { useState } from "react";
import FieldControl from "../../common/form/field-control";
import Select, {
  SelectContent,
  SelectInput,
  SelectItem,
  SelectTrigger,
} from "../../common/form/select";
import {
  exerciseBodyPartOptions,
  exerciseCategoryOptions,
  exerciseEquipmentOptions,
  exerciseTargetOptions,
} from "@/constant/exercise";
import { useStartWorkout } from "@/components/provider/main/start-workout-provider";
import { useAuth } from "@/stores/auth-store";
import StartWorkoutLayout from "./start-workout-layout";
import { useRecommendExercise } from "@/hooks/request/exercise/use-recommend-exercises";

export default function WorkoutPreferenceStep() {
  const auth = useAuth();
  const { setPreference, preference, step, setStep, setRecommendedExercises } =
    useStartWorkout();
  const { mutation: recommendExercise } = useRecommendExercise();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    form: { control, handleSubmit },
  } = useWorkoutPreferenceForm();

  const onSubmit = handleSubmit(async (val) => {
    setIsSubmitting(true);

    const data = {
      ...preference,
      body_part: val.body_part as any,
      difficulty: (auth.user?.profile?.fitness_level || "beginner") as any,
      equipment: val.equipment as any,
      category: val.category as any,
      target: val.target as any,
    };

    setPreference(data);

    const res = await recommendExercise.mutateAsync({
      ...data,
      top_n: 5,
    });

    setRecommendedExercises(res.data.exercises);

    await new Promise((res) => setTimeout(res, 1000));
    setStep(step + 1);

    setIsSubmitting(false);
  });

  return (
    <StartWorkoutLayout
      title="Start a Workout"
      description="Choose your workout preferences based on your needs"
    >
      <UIView style={styles.content}>
        <FieldControl
          control={control}
          name="target"
          label="Target"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(v) => field.onChange(v)}
            >
              <SelectTrigger>
                <SelectInput placeholder="Select your target" />
              </SelectTrigger>
              <SelectContent>
                {exerciseTargetOptions.map((o) => (
                  <SelectItem value={o.value} key={o.value}>
                    <UIText>{o.label}</UIText>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        <FieldControl
          control={control}
          name="body_part"
          label="Body Part"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(v) => field.onChange(v)}
            >
              <SelectTrigger>
                <SelectInput placeholder="Select body part" />
              </SelectTrigger>
              <SelectContent>
                {exerciseBodyPartOptions.map((o) => (
                  <SelectItem value={o.value} key={o.value}>
                    <UIText>{o.label}</UIText>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        <FieldControl
          control={control}
          name="equipment"
          label="Equipment"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(v) => field.onChange(v)}
            >
              <SelectTrigger>
                <SelectInput placeholder="Select equipment" />
              </SelectTrigger>
              <SelectContent>
                {exerciseEquipmentOptions.map((o) => (
                  <SelectItem value={o.value} key={o.value}>
                    <UIText>{o.label}</UIText>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        <FieldControl
          control={control}
          name="category"
          label="Category"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(v) => field.onChange(v)}
            >
              <SelectTrigger>
                <SelectInput placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {exerciseCategoryOptions.map((o) => (
                  <SelectItem value={o.value} key={o.value}>
                    <UIText>{o.label}</UIText>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </UIView>
      <SafeAreaView edges={["bottom"]}>
        <UIButton
          disabled={isSubmitting}
          onPress={onSubmit}
          label={isSubmitting ? "Processing..." : "Find my Workout"}
          variant="primary"
        />
      </SafeAreaView>
    </StartWorkoutLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    gap: 10,
  },
});
