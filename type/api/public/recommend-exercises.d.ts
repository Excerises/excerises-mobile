import {
  Exercise,
  ExerciseBodyPart,
  ExerciseCategory,
  ExerciseDifficulty,
  ExerciseEquipment,
  ExerciseTarget,
} from "../../entity";

export interface RecommendExercisesRequest {
  body_part: ExerciseBodyPart;
  equipment: ExerciseEquipment;
  target: ExerciseTarget;
  difficulty: ExerciseDifficulty;
  category: ExerciseCategory;
  top_n?: number;
}

export interface RecommendExercisesResponse {
  total: number;
  exercises: Exercise[];
}
