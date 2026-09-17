import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { useOnboardingContext } from "@/components/provider/onboarding-provider";

import BMIStep from "@/components/ui/onboarding/profile/components/bmi-step";
import ProfileStep from "@/components/ui/onboarding/profile/components/profile-step";
import WorkoutRoutineStep from "@/components/ui/onboarding/profile/components/workout-routine-step";
import WorkoutTimeStep from "@/components/ui/onboarding/profile/components/workout-time-step";
import StepIndicator from "@/components/ui/onboarding/profile/step-indicator";

export default function Profile() {
  const router = useRouter();
  const { step, setStep } = useOnboardingContext();

  const [date, setDate] = useState<Date | null>(null);
  const [gender, setGender] = useState<"male" | "female">("male");

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const [workoutFrequency, setWorkoutFrequency] = useState("");

  const [selectedDuration, setSelectedDuration] = useState("");

  const [workoutDays, setWorkoutDays] = useState<string[]>([]);

  const [reminderTime, setReminderTime] = useState("");

  const [reminderEnabled, setReminderEnabled] = useState(false);

  const calculateBMI = () => {
    const heightInMeters = parseFloat(height) / 100;

    const weightInKg = parseFloat(weight);

    if (heightInMeters > 0 && weightInKg > 0) {
      const bmi = weightInKg / (heightInMeters * heightInMeters);

      return bmi.toFixed(1);
    }

    return "0.0";
  };

  const getBMIStatus = (bmiValue: string) => {
    const value = parseFloat(bmiValue);

    if (value <= 0) {
      return "-";
    }

    if (value < 18.5) {
      return "Underweight";
    }

    if (value < 25) {
      return "Normal";
    }

    if (value < 30) {
      return "Overweight";
    }

    return "Obese";
  };

  const currentStep =
    step === "profile" || step === "bmi" ? 1 : step === "workout" ? 2 : 3;

  const bmi = calculateBMI();
  const bmiStatus = getBMIStatus(bmi);

  const goToBMI = () => {
    setStep("bmi");
  };

  const goToWorkout = () => {
    setStep("workout");
  };

  const goToTime = () => {
    setStep("time");
  };

  const goToResult = () => {
    router.push("/result");
  };

  return (
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        <StepIndicator currentStep={currentStep} totalSteps={3} />
      </View>

      {step === "profile" && (
        <ProfileStep
          date={date}
          gender={gender}
          height={height}
          weight={weight}
          onDateChange={setDate}
          onGenderChange={setGender}
          onHeightChange={setHeight}
          onWeightChange={setWeight}
          onNext={goToBMI}
        />
      )}

      {step === "bmi" && (
        <BMIStep value={bmi} status={bmiStatus} onNext={goToWorkout} />
      )}

      {step === "workout" && (
        <WorkoutRoutineStep
          workoutFrequency={workoutFrequency}
          selectedDuration={selectedDuration}
          onWorkoutFrequencyChange={setWorkoutFrequency}
          onDurationChange={setSelectedDuration}
          onNext={goToTime}
        />
      )}

      {step === "time" && (
        <WorkoutTimeStep
          workoutDays={workoutDays}
          reminderTime={reminderTime}
          reminderEnabled={reminderEnabled}
          onWorkoutDaysChange={setWorkoutDays}
          onReminderTimeChange={setReminderTime}
          onReminderEnabledChange={setReminderEnabled}
          onNext={goToResult}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },

  stepContainer: {
    marginBottom: 18,
  },
});
