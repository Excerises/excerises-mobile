import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { useOnboardingContext } from "@/components/provider/onboarding-provider";
import UIButton from "@/components/ui/button";
import Selector from "@/components/ui/selector";
import FormGroup from "@/components/ui/form-group";
import Input from "@/components/ui/input";
import BMICard from "@/components/ui/onboarding/profile/bmi-card";
import DateInput from "@/components/ui/date-input";
import { Mars, Venus } from "lucide-react-native";
import StepIndicator from "@/components/ui/onboarding/profile/step-indicator";
import OptionSelector from "@/components/ui/option-selector";
import ToggleRow from "@/components/ui/toggle-row";
import UIText from "@/components/ui/text";
import useThemeColor from "@/hooks/use-theme-color";

export default function Profile() {
  const router = useRouter();
  const themeColor = useThemeColor();
  const { step, setStep } = useOnboardingContext();

  const [date, setDate] = useState<Date | null>(null);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [workoutFrequency, setWorkoutFrequency] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [workoutDays, setWorkoutDays] = useState<string[]>([]);
  const [reminderTime, setReminderTime] = useState("");
  const [reminderEnabled, setReminderEnabled] = useState(false);

  const currentStep =
    step === "profile" || step === "bmi"
      ? 1
      : step === "workout"
        ? 2
        : 3;

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
        <StepIndicator
          currentStep={currentStep}
          totalSteps={3}
        />
      </View>

      {step === "profile" && (
        <>
          <UIText style={styles.title}>Tell Us About You</UIText>

          <UIText style={styles.subtitle}>
            Enter your basic information to create a personalized workout
            plan.
          </UIText>

          <View style={styles.form}>
            <FormGroup label="Date of birth">
              <DateInput
                value={date}
                onChange={setDate}
              />
            </FormGroup>

            <FormGroup label="Gender">
              <OptionSelector
                options={["Male", "Female"]}
                value={gender === "male" ? "Male" : "Female"}
                onChange={(value) =>
                  setGender(value === "Male" ? "male" : "female")
                }
                icons={[
                  <Mars key="male" size={20} color="#FFFFFF" />,
                  <Venus key="female" size={20} color="#FFFFFF" />,
                ]}
              />
            </FormGroup>

            <FormGroup label="Height (cm)">
              <Input
                style={styles.input}
                placeholder="Enter the height"
                keyboardType="numeric"
              />
            </FormGroup>

            <FormGroup label="Weight (kg)">
              <Input
                style={styles.input}
                placeholder="Enter the weight"
                keyboardType="numeric"
              />
            </FormGroup>
          </View>

          <UIButton
            style={[
              styles.mainButton,
              {
                backgroundColor: themeColor.destructive,
              },
            ]}
            label="Continue"
            onPress={goToBMI}
          />
        </>
      )}


      {step === "bmi" && (
        <>
          <UIText style={styles.title}>Your BMI Result</UIText>

          <UIText style={styles.subtitle}>
            Based on your height and weight,
            {"\n"}
            here is your body mass index (BMI).
          </UIText>

          <BMICard
            value="23,4"
            status="Normal"
          />

          <UIButton
            style={[
              styles.mainButton,
              {
                backgroundColor: themeColor.destructive,
              },
            ]}
            label="Continue"
            onPress={goToWorkout}
          />
        </>
      )}


      {step === "workout" && (
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
                options={["1 day", "2 days", "3 days", "4 days", "5 days", "6 days"]}
                value={workoutFrequency}
                onChange={setWorkoutFrequency}
              />
            </FormGroup>

            <FormGroup label="Workout duration per Session">
              <Selector
                placeholder="Select duration"
                options={["15 minutes", "30 minutes", "45 minutes", "60 minutes"]}
                value={selectedDuration}
                onChange={setSelectedDuration}
              />
            </FormGroup>
          </View>

          <UIButton
            style={[
              styles.mainButton,
              {
                backgroundColor: themeColor.destructive,
              },
            ]}
            label="Continue"
            onPress={goToTime}
          />
        </>
      )}


      {step === "time" && (
        <>
          <UIText style={styles.title}>Set Your Time</UIText>

          <UIText style={styles.subtitle}>
            Help us personalize your workout plan.
          </UIText>

          <View style={styles.form}>
            <FormGroup label="Preferred workout days">
              <OptionSelector
                options={["Mon", "Tues", "Wed", "Thu", "Fri", "Sat", "Sun"]}
                value={workoutDays}
                onChange={setWorkoutDays}
                multiple
              />
            </FormGroup>

            <FormGroup label="Reminder Time">
              <UIText style={styles.reminderDescription}>
                We&apos;ll remind you to work out at
                {"\n"}
                your preferred time.
              </UIText>

              <Selector
                placeholder="Select time"
                options={["07:00", "09:00", "12:00", "16:00", "19:00", "21:00"]}
                value={reminderTime}
                onChange={setReminderTime}
              />
            </FormGroup>

            <ToggleRow
              label="Enable workout reminders"
              value={reminderEnabled}
              onChange={setReminderEnabled}
            />
          </View>

          <UIButton
            style={[
              styles.mainButton,
              {
                backgroundColor: themeColor.destructive,
              },
            ]}
            label="Continue"
            onPress={goToResult}
          />
        </>
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
  input: {
    height: 48,
    borderRadius: 6,
  },
  reminderDescription: {
    fontSize: 12,
    color: "#999999",
  },
  mainButton: {
    width: "100%",
    height: 48,
    marginTop: 30,
    borderRadius: 6,
  },
});