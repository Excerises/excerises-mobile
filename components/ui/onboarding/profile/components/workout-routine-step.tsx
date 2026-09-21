import { StyleSheet, View } from "react-native";

import { durationOptions, workoutFrequencyOptions } from "@/components/data/onboarding-data";

import UIButton from "@/components/ui/common/button";

import FormGroup from "@/components/ui/common/form-group";

import OptionSelector from "@/components/ui/common/option-selector";

import Selector from "@/components/ui/common/selector";

import UIText from "@/components/ui/common/text";

type WorkoutRoutineStepProps = {
  workoutFrequency: string;
  selectedDuration: string;
  onWorkoutFrequencyChange: (value: string) => void;
  onDurationChange: (value: string) => void;
  onNext: () => void;
};

export default function WorkoutRoutineStep({
  workoutFrequency,
  selectedDuration,
  onWorkoutFrequencyChange,
  onDurationChange,
  onNext,
}: WorkoutRoutineStepProps) {
  return (
    <>
      <UIText style={styles.title}>Set Your Workout Routine</UIText>

      <UIText style={styles.subtitle}>
        Choose how often you want to
        {"\n"}
        work out and how long each session
        {"\n"}
        will be.
      </UIText>

      <View style={styles.form}>
        <FormGroup label="Workout frequency per week">
          <OptionSelector
            options={workoutFrequencyOptions}
            value={workoutFrequency}
            onChange={onWorkoutFrequencyChange}
          />
        </FormGroup>

        <FormGroup label="Workout duration per Session">
          <Selector
            placeholder="Select duration"
            options={durationOptions}
            value={selectedDuration}
            onChange={onDurationChange}
          />
        </FormGroup>
      </View>

      <UIButton
        style={styles.mainButton}
        label="Continue"
        variant="primary"
        onPress={onNext}
      />
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },

  form: {
    marginTop: 26,
    gap: 14,
  },

  mainButton: {
    width: "100%",
    height: 48,
    marginTop: 30,
    borderRadius: 6,
  },
});
