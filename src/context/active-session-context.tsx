import { Exercise } from "@/../type/entity";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const BREAK_SECONDS = 30;

export type SessionPhase = "workout" | "break" | "finished";

type ActiveSessionContextValue = {
  exercises: Exercise[];
  currentIndex: number;
  phase: SessionPhase;
  currentElapsed: number;
  totalElapsed: number;
  breakRemaining: number;
  initialized: boolean;
  paused: boolean;
  setPaused: (paused: boolean) => void;
  initSession: (exercises: Exercise[]) => void;
  startWorkout: (sessionId: string) => void;
  completeWorkout: () => void;
  advanceFromBreak: () => boolean;
  endSession: () => void;
};

const ActiveSessionContext = createContext({} as ActiveSessionContextValue);

export function useActiveSession() {
  return useContext(ActiveSessionContext);
}

export function ActiveSessionProvider({ children }: { children: ReactNode }) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<SessionPhase>("workout");
  const [currentElapsed, setCurrentElapsed] = useState(0);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const [breakRemaining, setBreakRemaining] = useState(BREAK_SECONDS);
  const [initialized, setInitialized] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    if (phase === "workout") {
      const interval = setInterval(() => {
        setCurrentElapsed((value) => value + 1);
      }, 1000);
      return () => clearInterval(interval);
    }

    if (phase === "break") {
      const interval = setInterval(() => {
        setBreakRemaining((value) => (value > 0 ? value - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }

    return;
  }, [phase, paused]);

  const initSession = useCallback((list: Exercise[]) => {
    setExercises(list);
    setCurrentIndex(0);
    setPhase("workout");
    setCurrentElapsed(0);
    setTotalElapsed(0);
    setBreakRemaining(BREAK_SECONDS);
    setPaused(false);
    setInitialized(true);
  }, []);

  const startWorkout = useCallback(
    (sessionId: string) => {
      const index = exercises.findIndex(
        (exercise) => String(exercise.id) === sessionId,
      );
      if (index < 0) return;

      setCurrentIndex(index);
      setCurrentElapsed(0);
      setPhase("workout");
      setPaused(false);
    },
    [exercises],
  );

  const completeWorkout = useCallback(() => {
    setTotalElapsed((value) => value + currentElapsed);
    setCurrentElapsed(0);
    setBreakRemaining(BREAK_SECONDS);
    setPhase("break");
    setPaused(false);
  }, [currentElapsed]);

  const advanceFromBreak = useCallback(() => {
    if (currentIndex >= exercises.length - 1) {
      setPhase("finished");
      return false;
    }

    setCurrentIndex((value) => value + 1);
    setCurrentElapsed(0);
    setBreakRemaining(BREAK_SECONDS);
    setPhase("workout");
    setPaused(false);
    return true;
  }, [currentIndex, exercises.length]);

  const endSession = useCallback(() => {
    setPhase("finished");
    setPaused(false);
  }, []);

  const value = useMemo(
    () => ({
      exercises,
      currentIndex,
      phase,
      currentElapsed,
      totalElapsed,
      breakRemaining,
      initialized,
      paused,
      setPaused,
      initSession,
      startWorkout,
      completeWorkout,
      advanceFromBreak,
      endSession,
    }),
    [
      exercises,
      currentIndex,
      phase,
      currentElapsed,
      totalElapsed,
      breakRemaining,
      initialized,
      paused,
      setPaused,
      initSession,
      startWorkout,
      completeWorkout,
      advanceFromBreak,
      endSession,
    ],
  );

  return (
    <ActiveSessionContext.Provider value={value}>
      {children}
    </ActiveSessionContext.Provider>
  );
}
