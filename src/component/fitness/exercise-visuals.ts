import { ExerciseCategory, ExerciseDifficulty } from "@/../type/entity";
import { ComponentType } from "react";
import {
  Cross,
  Dumbbell,
  HeartPulse,
  LucideProps,
  PersonStanding,
  Scale,
  StretchHorizontal,
  Zap,
} from "lucide-react-native";

export const difficultyColors: Record<ExerciseDifficulty, string> = {
  beginner: "#16C84E",
  intermediate: "#f9a237",
  advanced: "#FF2C2C",
};

export const categoryIcons: Record<
  ExerciseCategory,
  ComponentType<LucideProps>
> = {
  strength: Dumbbell,
  cardio: HeartPulse,
  balance: Scale,
  rehabilitation: Cross,
  mobility: PersonStanding,
  plyometrics: Zap,
  stretching: StretchHorizontal,
};

export const categoryLabels: Record<ExerciseCategory, string> = {
  strength: "Strength",
  cardio: "Cardio",
  balance: "Balance",
  rehabilitation: "Rehab",
  mobility: "Mobility",
  plyometrics: "Plyometrics",
  stretching: "Stretching",
};
