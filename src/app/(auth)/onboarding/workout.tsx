import { OnboardingScreen } from "@/component/screen/onboarding-screen";
import {
  Button,
  FormControl,
  Select,
  SelectContent,
  SelectInput,
  SelectItem,
  SelectTrigger,
  Text,
  View,
} from "@/component/ui";
import { workoutDurationOptions } from "@/constant/fitness/workout-duration-per-session";
import { useOnboarding } from "@/context/onboarding-context";
import { useOnboardingWorkoutForm } from "@/hook/form/onboarding/use-onboarding-workout-form";
import { useEffect } from "react";
import { StyleSheet } from "react-native";

export default function Page() {
  const { setStep, setData } = useOnboarding();
  const { control, handleSubmit } = useOnboardingWorkoutForm();

  useEffect(() => {
    setStep(3);
  }, []);

  const onContinue = handleSubmit((v) => {
    setData("workout_freq_per_week", v.workoutFreqPerWeek);
    setData("workout_duration_per_day", v.workoutDurationPerSession);

    console.log(v);
  });

  return (
    <OnboardingScreen
      title="Your Workout Routine"
      description="How often you did workout, we will specified exercise recommendation for you."
      onContinue={onContinue}
    >
      <View variant="ghost" style={styles.form}>
        <FormControl
          control={control}
          name="workoutFreqPerWeek"
          label="Frequency per week"
          required
          render={({ field }) => (
            <View style={styles.freqFlex} variant="ghost">
              {Array.from({ length: 6 }).map((_, i) => {
                const value = i + 1;
                return (
                  <Button
                    key={i}
                    variant={field.value == value ? "default" : "secondary"}
                    size="lg"
                    onPress={() => field.onChange(value)}
                    style={{ width: "31%" }}
                  >
                    <Text>
                      {value} day{value == 1 ? "" : "s"}
                    </Text>
                  </Button>
                );
              })}
            </View>
          )}
        />

        <FormControl
          control={control}
          name="workoutDurationPerSession"
          label="Duration per session"
          required
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(v) => field.onChange(v)}
            >
              <SelectTrigger>
                <SelectInput
                  value={
                    workoutDurationOptions.find((o) => o.value == field.value)
                      ?.label
                  }
                  placeholder="Select duration"
                />
              </SelectTrigger>
              <SelectContent>
                {workoutDurationOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    <Text>{o.label}</Text>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  freqFlex: {
    gap: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  form: {
    gap: 14,
  },
});
