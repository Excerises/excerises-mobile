import { useProfiling } from "@/components/provider/onboarding/profiling-provider";
import UIButton from "@/components/ui/common/button";
import FieldControl from "@/components/ui/common/form/field-control";
import Select, {
  SelectContent,
  SelectInput,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/common/form/select";
import UIText from "@/components/ui/common/text";
import { ProfilingLayout } from "@/components/ui/onboarding/profiling/profiling-layout";
import { workoutDurationOptions } from "@/constant/workout_duration";
import { useProfilingWorkoutRoutineForm } from "@/hooks/form/auth/profiling/use-profiling-workout-routine-form";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import Slider from "@react-native-community/slider";
import useThemeColor from "@/hooks/use-theme-color";

export default function WorkoutRoutine() {
  const color = useThemeColor();
  const router = useRouter();
  const p = useProfiling();
  const {
    form: { control, handleSubmit },
  } = useProfilingWorkoutRoutineForm();

  const onContinue = handleSubmit((val) => {
    p.setWorkoutFrequencyPerWeek(val.frequencyPerWeek);
    p.setWorkoutDurationPerSession(val.durationPerSession);
    p.setWaterIntakeDaily(val.waterIntakeDaily);

    router.push("/profiling/set-reminder");
  });

  return (
    <ProfilingLayout
      title="Set Your Workout Routine"
      description="Choose how often you doing workout. We will give recommendation based on your level."
      onContinue={onContinue}
      currentStep={3}
    >
      <View style={styles.container}>
        <FieldControl
          control={control}
          name="frequencyPerWeek"
          label="Frequency per Week"
          render={({ field }) => (
            <View style={styles.frequencyFlex}>
              {Array.from({ length: 6 }).map((_, i) => {
                const value = i + 1;
                const isActive = field.value === value;

                return (
                  <UIButton
                    style={styles.frequency}
                    variant={isActive ? "primary" : "default"}
                    key={i}
                    label={`${value} day${value > 1 ? "s" : ""}`}
                    onPress={() => field.onChange(value)}
                  />
                );
              })}
            </View>
          )}
        />

        <FieldControl
          control={control}
          name="durationPerSession"
          label="Duration per session"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(v) => field.onChange(v)}
            >
              <SelectTrigger>
                <SelectInput
                  placeholder="Select duration"
                  value={
                    field.value > 0
                      ? workoutDurationOptions.find(
                          (o) => o.value === field.value,
                        )?.label
                      : undefined
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {workoutDurationOptions.map((o, i) => (
                  <SelectItem key={i} value={o.value}>
                    <UIText>{o.label}</UIText>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        <FieldControl
          control={control}
          name="waterIntakeDaily"
          label="Water Consumtion Daily (liter)"
          render={({ field }) => (
            <View style={{ alignItems: "flex-end" }}>
              <Slider
                style={{ width: "100%" }}
                minimumValue={0}
                maximumValue={4}
                value={field.value}
                onValueChange={(v) => field.onChange(v)}
                minimumTrackTintColor={color.primary}
                maximumTrackTintColor={color.border}
              />
              <UIText>{field.value.toFixed(1)} liter</UIText>
            </View>
          )}
        />
      </View>
    </ProfilingLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
  },
  frequencyFlex: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  frequency: {
    width: "31.5%",
  },
});
