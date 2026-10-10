export type ExerciseBodyPart =
  | "waist"
  | "shoulders"
  | "upper legs"
  | "upper arms"
  | "lower arms"
  | "lower legs"
  | "back"
  | "chest"
  | "neck"
  | "cardio";

export type ExerciseEquipment =
  | "assisted"
  | "barbell"
  | "rope"
  | "body weight"
  | "medicine ball"
  | "cable"
  | "leverage machine"
  | "assisted (towel)"
  | "stability ball"
  | "dumbbell"
  | "ez barbell"
  | "kettlebell"
  | "body weight (with resistance band)"
  | "olympic barbell"
  | "weighted"
  | "bosu ball"
  | "sled machine"
  | "smith machine"
  | "wheel roller"
  | "trap bar"
  | "band";

export type ExerciseTarget =
  | "abs"
  | "delts"
  | "glutes"
  | "quads"
  | "forearms"
  | "biceps"
  | "calves"
  | "triceps"
  | "hamstrings"
  | "upper back"
  | "pectorals"
  | "lats"
  | "adductors"
  | "traps"
  | "serratus anterior"
  | "levator scapulae"
  | "spine"
  | "cardiovascular system"
  | "abductors";

export type ExerciseDifficulty = "beginner" | "intermediate" | "advanced";

export type ExerciseCategory =
  | "strength"
  | "cardio"
  | "balance"
  | "rehabilitation"
  | "mobility"
  | "plyometrics"
  | "stretching";

export interface Exercise {
  id: any;
  name: string;
  description: string;
  body_part: ExerciseBodyPart;
  equipment: ExerciseEquipment;
  target: ExerciseTarget;
  secondary_muscles: string[];
  instruction: string[];
  difficulty: ExerciseDifficulty;
  category: ExerciseCategory;
  created_at: string;
  updated_at: string;
}
