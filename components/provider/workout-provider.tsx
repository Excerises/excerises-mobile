import { createContext, useContext, useState } from "react";

type WorkoutContextType = {
  hasCompletedWorkout: boolean;
  setHasCompletedWorkout: (value: boolean) => void;
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
  children: React.ReactNode;
}) {
  const [hasCompletedWorkout, setHasCompletedWorkout] = useState(false);

  return (
    <WorkoutContext.Provider
      value={{
        hasCompletedWorkout,
        setHasCompletedWorkout,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}
