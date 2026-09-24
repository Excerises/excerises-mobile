import { useLocalSearchParams, useRouter } from "expo-router";

import { useEffect, useState } from "react";

import { ScrollView, StyleSheet, View } from "react-native";

import { exercises, type Exercise } from "@/components/data/Exercise";
import { histories } from "@/components/data/History";
import { currentUser } from "@/components/data/User";
import {
  useWorkoutContext,
  type WorkoutPackage,
} from "@/components/provider/workout-provider";

import WorkoutConfirmStep from "@/components/ui/main/workout-flow/workout-confirm-step";
import WorkoutDetailStep from "@/components/ui/main/workout-flow/workout-detail-step";
import WorkoutPackageCreatedStep from "@/components/ui/main/workout-flow/workout-package-created-step";
import WorkoutPreferenceStep from "@/components/ui/main/workout-flow/workout-preference-step";
import WorkoutRecommendationStep from "@/components/ui/main/workout-flow/workout-recommendation-step";
import WorkoutRestStep, { type Difficulty } from "@/components/ui/main/workout-flow/workout-rest-step";
import WorkoutSessionStep from "@/components/ui/main/workout-flow/workout-session-step";
import WorkoutSummaryStep from "@/components/ui/main/workout-flow/workout-summary-step";

import useThemeColor from "@/hooks/use-theme-color";

type WorkoutStep =
  | "type"
  | "recommend"
  | "confirm"
  | "created"
  | "detail"
  | "session"
  | "rest"
  | "summary";


const createHistoryPackage = (workoutId: string): WorkoutPackage | null => {
  if (workoutId.startsWith("WORKOUT-")) {
    const number = Number(workoutId.replace("WORKOUT-", ""));

    if (!Number.isInteger(number) || number < 1) {
      return null;
    }

    const completedHistory = histories
      .filter(
        (item) =>
          item.user_id === currentUser.user_id &&
          item.status === "completed",
      )
      .sort(
        (first, second) =>
          new Date(second.created_at).getTime() -
          new Date(first.created_at).getTime(),
      );

    const group = completedHistory.slice(
      (number - 1) * 3,
      number * 3,
    );

    const packageExercises = group
      .map((item) =>
        exercises.find((exercise) => exercise.exercise_id === item.exercise_id),
      )
      .filter(Boolean) as Exercise[];

    if (packageExercises.length === 0) {
      return null;
    }

    const firstExercise = packageExercises[0];

    return {
      id: workoutId,
      name: `My Workout #${number}`,
      target: firstExercise.target,
      bodyPart: firstExercise.body_part,
      equipment: firstExercise.equipment,
      category: firstExercise.exercise_category,
      exercises: packageExercises,
    };
  }

  const exercise = exercises.find(
    (item) => item.exercise_id === workoutId,
  );

  if (!exercise) {
    return null;
  }

  return {
    id: workoutId,
    name: exercise.exercise_name,
    target: exercise.target,
    bodyPart: exercise.body_part,
    equipment: exercise.equipment,
    category: exercise.exercise_category,
    exercises: [exercise],
  };
};

export default function WorkoutFlow() {
  const router = useRouter();
  const themeColor = useThemeColor();

  const { workoutId, step: stepParam } = useLocalSearchParams<{
    workoutId?: string;
    step?: WorkoutStep;
  }>();

  const {
    setHasWorkoutPlan,
    workoutPackage,
    setWorkoutPackage,
  } = useWorkoutContext();

  const routeWorkoutId = typeof workoutId === "string" ? workoutId : undefined;
  const routePackage = routeWorkoutId
    ? workoutPackage?.id === routeWorkoutId
      ? workoutPackage
      : createHistoryPackage(routeWorkoutId)
    : null;

  const [bodyPart, setBodyPart] = useState("");
  const [equipment, setEquipment] = useState("");
  const [category, setCategory] = useState("");
  const [target, setTarget] = useState("");
  const [workoutName, setWorkoutName] = useState("My Workout #1");

  const [selectedWorkouts, setSelectedWorkouts] = useState<Exercise[]>([]);
  const [activePackage, setActivePackage] = useState<WorkoutPackage | null>(
    routePackage,
  );

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [difficultyFeedback, setDifficultyFeedback] = useState<
    Record<string, Difficulty>
  >({});

  const step: WorkoutStep =
    stepParam ?? (routePackage ? "detail" : "type");

  const changeStep = (nextStep: WorkoutStep) => {
    router.setParams({
      step: nextStep,
    });
  };


  const recommendedWorkouts = exercises.filter((workout) => {
    const bodyPartMatch = !bodyPart || workout.body_part === bodyPart;
    const equipmentMatch = !equipment || workout.equipment === equipment;
    const categoryMatch = !category || workout.exercise_category === category;
    const targetMatch = !target || workout.target === target;

    return bodyPartMatch && equipmentMatch && categoryMatch && targetMatch;
  });

  const displayedWorkouts =
    recommendedWorkouts.length > 0 ? recommendedWorkouts : exercises;

  const activeExercises = activePackage?.exercises ?? selectedWorkouts;
  const currentExercise = activeExercises[currentExerciseIndex];

  useEffect(() => {
    if (step !== "session" && step !== "rest") {
      return;
    }

    if (isPaused) {
      return;
    }

    const timer = setInterval(() => {
      setElapsedTime((previous) => previous + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [step, isPaused]);

  const goToRecommend = () => {
    setSelectedWorkouts([]);
    changeStep("recommend");
  };

  const toggleWorkout = (workout: Exercise) => {
    setSelectedWorkouts((current) => {
      const exists = current.some(
        (item) => item.exercise_id === workout.exercise_id,
      );

      if (exists) {
        return current.filter(
          (item) => item.exercise_id !== workout.exercise_id,
        );
      }

      return [...current, workout];
    });
  };

  const clearSelectedWorkouts = () => {
    setSelectedWorkouts([]);
  };

  const goToConfirm = () => {
    if (selectedWorkouts.length === 0) {
      return;
    }

    changeStep("confirm");
  };

  const createPackage = () => {
    if (!workoutName.trim() || selectedWorkouts.length === 0) {
      return;
    }

    const createdPackage: WorkoutPackage = {
      id: `PACKAGE-${Date.now()}`,
      name: workoutName.trim(),
      target,
      bodyPart,
      equipment,
      category,
      exercises: selectedWorkouts,
    };

    setWorkoutPackage(createdPackage);
    setHasWorkoutPlan(true);
    setActivePackage(createdPackage);
    setCurrentExerciseIndex(0);
    setDifficultyFeedback({});
    setElapsedTime(0);
    setIsPaused(false);

    router.setParams({
      workoutId: createdPackage.id,
      step: "created",
      source: "created",
    });
  };

  const startWorkout = () => {
    setCurrentExerciseIndex(0);
    setElapsedTime(0);
    setIsPaused(false);
    setDifficultyFeedback({});
    changeStep("session");
  };

  const finishExercise = () => {
    setIsPaused(false);
    changeStep("rest");
  };

  const continueAfterRest = () => {
    if (!currentExercise) {
      return;
    }

    if (currentExerciseIndex >= activeExercises.length - 1) {
      changeStep("summary");
      return;
    }

    setCurrentExerciseIndex((current) => current + 1);
    setIsPaused(false);
    changeStep("session");
  };

  const goToHome = () => {
    router.replace("/(main)/home");
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
        { backgroundColor: themeColor.background },
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
            selectedWorkouts={selectedWorkouts}
            onToggleSelect={toggleWorkout}
            onClear={clearSelectedWorkouts}
            onConfirm={goToConfirm}
          />
        )}

        {step === "confirm" && (
          <WorkoutConfirmStep
            workoutName={workoutName}
            target={target}
            bodyPart={bodyPart}
            equipment={equipment}
            category={category}
            workouts={selectedWorkouts}
            onNameChange={setWorkoutName}
            onCreate={createPackage}
          />
        )}

        {step === "created" && activePackage && (
          <WorkoutPackageCreatedStep
            workoutPackage={activePackage}
            onStart={() => changeStep("detail")}
            onHome={goToHome}
          />
        )}

        {step === "detail" && activePackage && (
          <WorkoutDetailStep
            workoutPackage={activePackage}
            onStart={startWorkout}
          />
        )}

        {step === "session" && currentExercise && (
          <WorkoutSessionStep
            workout={currentExercise}
            exerciseIndex={currentExerciseIndex}
            totalExercises={activeExercises.length}
            elapsedTime={formatTime(elapsedTime)}
            isPaused={isPaused}
            onTogglePause={() => setIsPaused((current) => !current)}
            onFinishExercise={finishExercise}
          />
        )}

        {step === "rest" && currentExercise && (
          <WorkoutRestStep
            key={`rest-${currentExercise.exercise_id}`}
            workout={currentExercise}
            exerciseIndex={currentExerciseIndex}
            totalExercises={activeExercises.length}
            selectedDifficulty={
              difficultyFeedback[currentExercise.exercise_id]
            }
            onDifficultyChange={(value) =>
              setDifficultyFeedback((current) => ({
                ...current,
                [currentExercise.exercise_id]: value,
              }))
            }
            onContinue={continueAfterRest}
          />
        )}

        {step === "summary" && activePackage && (
          <WorkoutSummaryStep
            workoutName={activePackage.name}
            exercises={activePackage.exercises}
            difficultyFeedback={difficultyFeedback}
            elapsedTime={formatTime(elapsedTime)}
            onDone={goToHome}
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
