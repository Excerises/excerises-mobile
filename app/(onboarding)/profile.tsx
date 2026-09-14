import AuthFormGroup from "@/components/ui/form-group";
import AuthInput from "@/components/ui/input";

import {
  useOnboardingContext,
} from "@/components/provider/onboarding-provider";

import { useRouter } from "expo-router";

import BMICategoryCard from "@/components/ui/onboarding/profile/bmi-category-card";
import BMIResult from "@/components/ui/onboarding/profile/bmi-result";
import DateInput from "@/components/ui/onboarding/profile/date-input";
import GenderSelector from "@/components/ui/onboarding/profile/gender-selector";
import StepIndicator from "@/components/ui/onboarding/profile/step-indicator";
import WorkoutDaysSelector from "@/components/ui/onboarding/profile/workout-days-selector";
import WorkoutFrequencySelector from "@/components/ui/onboarding/profile/workout-frequency-selector";

import UIButton from "@/components/ui/button";
import DurationSelector from "@/components/ui/duration-selector";
import UIText from "@/components/ui/text";
import TimeSelector from "@/components/ui/time-selector";
import ToggleRow from "@/components/ui/toggle-row";

import useThemeColor from "@/hooks/use-theme-color";

import { useState } from "react";

import {
  StyleSheet,
  View,
} from "react-native";

export default function Page() {
  const themeColor = useThemeColor();

  const router = useRouter();

  const { step, setStep } =
    useOnboardingContext();

  const [date, setDate] =
    useState(new Date());

  const [showDatePicker, setShowDatePicker] =
    useState(false);

  const [gender, setGender] =
    useState<"male" | "female">("male");

  const [workoutFrequency, setWorkoutFrequency] =
    useState<number>();

  const [workoutDays, setWorkoutDays] =
    useState<string[]>([]);

  const [reminderEnabled, setReminderEnabled] =
    useState(false);

  return (
    <View style={styles.container}>
    
      <View style={styles.stepContainer}>
        <StepIndicator
          currentStep={
            step === "profile" ||
            step === "bmi"
              ? 1
              : step === "workout"
                ? 2
                : 3
          }
          totalSteps={3}
        />
      </View>

      {step === "profile" && (
        <>
          <UIText style={styles.title}>
            Tell Us About You
          </UIText>

          <UIText style={styles.subtitle}>
            Enter your basic information to create a
            personalized workout plan.
          </UIText>

          <View style={styles.form}>
            <AuthFormGroup label="Date of birth">
              <DateInput
                value=""
                selectedDate={date}
                showPicker={showDatePicker}
                onOpen={() =>
                  setShowDatePicker(true)
                }
                onChange={(selectedDate) => {
                  setDate(selectedDate);
                  setShowDatePicker(false);
                }}
              />
            </AuthFormGroup>

            <AuthFormGroup label="Gender">
              <GenderSelector
                value={gender}
                onChange={setGender}
              />
            </AuthFormGroup>

            <AuthFormGroup label="Height (cm)">
              <AuthInput
                style={styles.input}
                placeholder="Enter the height"
                keyboardType="numeric"
              />
            </AuthFormGroup>

            <AuthFormGroup label="Weight (kg)">
              <AuthInput
                style={styles.input}
                placeholder="Enter the weight"
                keyboardType="numeric"
              />
            </AuthFormGroup>
          </View>

          <UIButton
            style={[
              styles.mainButton,
              {
                backgroundColor:
                  themeColor.destructive,
              },
            ]}
            label="CONTINUE"
            onPress={() =>
              setStep("bmi")
            }
          />
        </>
      )}


      {step === "bmi" && (
        <>
          <UIText style={styles.title}>
            Your BMI Result
          </UIText>

          <UIText style={styles.subtitle}>
            Based on your height and weight,
            {"\n"}
            here is your body mass index (BMI).
          </UIText>

          <BMIResult
            value="23,4"
            status="Normal"
          />

          <BMICategoryCard />

          <UIButton
            style={[
              styles.mainButton,
              {
                backgroundColor:
                  themeColor.destructive,
              },
            ]}
            label="CONTINUE"
            onPress={() =>
              setStep("workout")
            }
          />
        </>
      )}


      {step === "workout" && (
        <>
          <UIText style={styles.title}>
            Set Your Workout Routine
          </UIText>

          <UIText style={styles.subtitle}>
            Choose how often you want to
            {"\n"}
            work out and how long each session
            {"\n"}
            will be.
          </UIText>

          <View style={styles.form}>
            <AuthFormGroup label="Workout frequency per week">
              <WorkoutFrequencySelector
                value={workoutFrequency}
                onChange={setWorkoutFrequency}
              />
            </AuthFormGroup>

            <AuthFormGroup label="Workout duration per Session">
              <DurationSelector
                placeholder="Select duration"
                onPress={() => {}}
              />
            </AuthFormGroup>
          </View>

          <UIButton
            style={[
              styles.mainButton,
              {
                backgroundColor:
                  themeColor.destructive,
              },
            ]}
            label="CONTINUE"
            onPress={() =>
              setStep("time")
            }
          />
        </>
      )}


      {step === "time" && (
        <>
          <UIText style={styles.title}>
            Set Your Time
          </UIText>

          <UIText style={styles.subtitle}>
            Help us personalize your workout plan.
          </UIText>

          <View style={styles.form}>
            <AuthFormGroup label="Preferred workout days">
              <WorkoutDaysSelector
                value={workoutDays}
                onChange={setWorkoutDays}
              />
            </AuthFormGroup>

            <AuthFormGroup label="Reminder Time">
              <UIText
                style={
                  styles.reminderDescription
                }
              >
                We&apos;ll remind you to work out at
                {"\n"}
                your preferred time.
              </UIText>

              <TimeSelector
                placeholder="Select time"
                onPress={() => {}}
              />
            </AuthFormGroup>

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
                backgroundColor:
                  themeColor.destructive,
              },
            ]}
            label="CONTINUE"
            onPress={() =>
              router.push("/result")
            }
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
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

  infoContainer: {
    marginTop: 14,
  },

  reminderDescription: {
    fontSize: 11,
    color: "#999999",
    marginBottom: 10,
  },

  mainButton: {
    width: "100%",
    height: 48,
    marginTop: 30,
    borderRadius: 6,
  },
});