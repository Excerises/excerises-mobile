import { genderOptions } from "@/constant/gender";
import React, { createContext, useContext, useState } from "react";

export type ProfilingContext = {
  birthDate: string;
  gender: string;
  height: number;
  weight: number;
  bmi: number;
  workoutFrequencyPerWeek: number;
  workoutDurationPerSession: number;
  reminderDays: number[];
  reminderTime: string;
  setBirthDate: (v: string) => void;
  setGender: (v: "male" | "female") => void;
  setHeight: (v: number) => void;
  setWeight: (v: number) => void;
  calculateBmi: () => number;
  setWorkoutFrequencyPerWeek: (v: number) => void;
  setWorkoutDurationPerSession: (v: number) => void;
  setReminderDays: (v: number[]) => void;
  setReminderTime: (v: string) => void;
};

export const ProfilingContext = createContext<ProfilingContext>(
  {} as ProfilingContext,
);

export function useProfiling() {
  return useContext(ProfilingContext);
}

export interface ProfilingProviderProps {
  children: React.ReactNode;
}

export function ProfilingProvider({ children }: ProfilingProviderProps) {
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState(genderOptions[0].value);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [bmi, setBmi] = useState(0);
  const [workoutFrequencyPerWeek, setWorkoutFrequencyPerWeek] = useState(0);
  const [workoutDurationPerSession, setWorkoutDurationPerSession] = useState(0);
  const [reminderDays, setReminderDays] = useState<number[]>([]);
  const [reminderTime, setReminderTime] = useState("");

  function calculateBmi() {
    const heightMeter = height > 0 ? height / 100 : 0;
    const bmi = weight > 0 ? weight / Math.pow(heightMeter, 2) : 0;
    setBmi(bmi);

    return bmi;
  }

  return (
    <ProfilingContext.Provider
      value={{
        birthDate,
        gender,
        height,
        weight,
        bmi,
        workoutFrequencyPerWeek,
        workoutDurationPerSession,
        reminderDays,
        reminderTime,
        setBirthDate,
        setGender,
        setHeight,
        setWeight,
        calculateBmi,
        setWorkoutFrequencyPerWeek,
        setWorkoutDurationPerSession,
        setReminderDays,
        setReminderTime,
      }}
    >
      {children}
    </ProfilingContext.Provider>
  );
}
