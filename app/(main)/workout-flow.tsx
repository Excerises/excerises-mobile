import { useLocalSearchParams, useRouter } from "expo-router";

import { useEffect, useState } from "react";

import { ScrollView, StyleSheet, View } from "react-native";

import { exercises, type Exercise } from "@/components/data/Exercise";

import { useWorkoutContext } from "@/components/provider/workout-provider";

import WorkoutCompleteStep from "@/components/ui/main/workout-flow/workout-complete-step";

import WorkoutDetailStep from "@/components/ui/main/workout-flow/workout-detail-step";

import WorkoutPreferenceStep from "@/components/ui/main/workout-flow/workout-preference-step";

import WorkoutRecommendationStep from "@/components/ui/main/workout-flow/workout-recommendation-step";

import WorkoutSessionStep from "@/components/ui/main/workout-flow/workout-session-step";

import useThemeColor from "@/hooks/use-theme-color";

type WorkoutStep = "type" | "recommend" | "detail" | "session" | "complete";

export default function WorkoutFlow() {
  const router = useRouter();
  const themeColor = useThemeColor();

  const { workoutId } = useLocalSearchParams<{
    workoutId?: string;
  }>();

  const { setHasCompletedWorkout } = useWorkoutContext();

  const initialWorkout = exercises.find(
    (workout) => workout.exercise_id === workoutId,
  );

  const [step, setStep] = useState<WorkoutStep>(
    initialWorkout ? "detail" : "type",
  );

  const [bodyPart, setBodyPart] = useState("");
  const [equipment, setEquipment] = useState("");
  const [category, setCategory] = useState("");
  const [target, setTarget] = useState("");

  const [selectedWorkout, setSelectedWorkout] = useState<Exercise | null>(
    initialWorkout ?? null,
  );

  const [isPaused, setIsPaused] = useState(false);

  const [elapsedTime, setElapsedTime] = useState(0);

  const recommendedWorkouts = exercises.filter((workout) => {
    const bodyPartMatch = !bodyPart || workout.body_part === bodyPart;

    const equipmentMatch = !equipment || workout.equipment === equipment;

    const categoryMatch = !category || workout.exercise_category === category;

    const targetMatch = !target || workout.target === target;

    return bodyPartMatch && equipmentMatch && categoryMatch && targetMatch;
  });

  const displayedWorkouts =
    recommendedWorkouts.length > 0 ? recommendedWorkouts : exercises;

  useEffect(() => {
    if (step !== "session" || isPaused) {
      return;
    }

    const timer = setInterval(() => {
      setElapsedTime((previous) => previous + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [step, isPaused]);

  const goToRecommend = () => {
    setStep("recommend");
  };

  const goToDetail = (workout: Exercise) => {
    setSelectedWorkout(workout);
    setStep("detail");
  };

  const goToSession = () => {
    setElapsedTime(0);
    setIsPaused(false);
    setStep("session");
  };

  const goToComplete = () => {
    setHasCompletedWorkout(true);
    setStep("complete");
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds,
    ).padStart(2, "0")}`;
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeColor.background,
        },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {step === "type" && (
          <WorkoutPreferenceStep
            bodyPart={bodyPart}
            equipment={equipment}
            category={category}
            target={target}
            onBodyPartChange={setBodyPart}
            onEquipmentChange={setEquipment}
            onCategoryChange={setCategory}
            onTargetChange={setTarget}
            onNext={goToRecommend}
          />
        )}

        {step === "recommend" && (
          <WorkoutRecommendationStep
            workouts={displayedWorkouts}
            onSelect={goToDetail}
          />
        )}

        {step === "detail" && selectedWorkout && (
          <WorkoutDetailStep workout={selectedWorkout} onStart={goToSession} />
        )}

        {step === "session" && selectedWorkout && (
          <WorkoutSessionStep
            workout={selectedWorkout}
            elapsedTime={formatTime(elapsedTime)}
            isPaused={isPaused}
            onTogglePause={() => setIsPaused((current) => !current)}
            onFinish={goToComplete}
          />
        )}

        {step === "complete" && (
          <WorkoutCompleteStep
            workout={selectedWorkout}
            elapsedTime={formatTime(elapsedTime)}
            onDone={() => router.replace("/(main)/home")}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 30,
  },
});
