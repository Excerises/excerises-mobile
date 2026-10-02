import { RecommendExerciseRequest } from "@/hooks/request/exercise/use-recommend-exercises";
import { useAuth } from "@/stores/auth-store";
import { Exercise } from "@/types/entity";
import React, { createContext, useContext, useState } from "react";

type StartWorkoutPreference = Omit<RecommendExerciseRequest, "top_n">;

export interface StartWorkoutContext {
  step: number;
  preference: StartWorkoutPreference;
  recommendedExercises: Exercise[];
  setPreference: (preference: StartWorkoutPreference) => void;
  setStep: (step: number) => void;
  setRecommendedExercises: (exercises: Exercise[]) => void;
}

export const StartWorkoutContext = createContext({} as StartWorkoutContext);

export function useStartWorkout() {
  return useContext(StartWorkoutContext);
}

export function StartWorkoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuth();
  const [step, setStep] = useState(1);
  const [recommendedExercises, setRecommendedExercises] = useState<Exercise[]>(
    [],
  );
  const [preference, setPreference] = useState<StartWorkoutPreference>({
    body_part: "" as any,
    category: "" as any,
    equipment: "" as any,
    target: "" as any,
    difficulty: (auth.user?.profile?.fitness_level || "beginner") as any,
  });

  return (
    <StartWorkoutContext.Provider
      value={{
        preference,
        step,
        recommendedExercises,
        setPreference,
        setStep,
        setRecommendedExercises,
      }}
    >
      {children}
    </StartWorkoutContext.Provider>
  );
}
