import { createContext, useContext, useState } from "react";

import type { ReactNode } from "react";

import type { Exercise } from "@/components/data/Exercise";

export type WorkoutPackage = {
  id: string;
  name: string;
  target: string;
  bodyPart: string;
  equipment: string;
  category: string;
  exercises: Exercise[];
};

type WorkoutContextType = {
  hasWorkoutPlan: boolean;
  setHasWorkoutPlan: (value: boolean) => void;
  workoutPackage: WorkoutPackage | null;
  setWorkoutPackage: (value: WorkoutPackage | null) => void;
};

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function useWorkoutContext() {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error("useWorkoutContext must be used inside WorkoutProvider");
  }

  return context;
}

export default function WorkoutProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [hasWorkoutPlan, setHasWorkoutPlan] = useState(false);
  const [workoutPackage, setWorkoutPackage] = useState<WorkoutPackage | null>(null);

  return (
    <WorkoutContext.Provider
      value={{
        hasWorkoutPlan,
        setHasWorkoutPlan,
        workoutPackage,
        setWorkoutPackage,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}
