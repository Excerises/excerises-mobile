import { api } from "@/network/api";
import { ApiResponse } from "@/types/common/api";
import {
  Exercise,
  ExerciseBodyPart,
  ExerciseCategory,
  ExerciseDifficulty,
  ExerciseEquipment,
  ExerciseTarget,
} from "@/types/entity";
import { useMutation } from "@tanstack/react-query";

export interface RecommendExerciseRequest {
  body_part: ExerciseBodyPart;
  category: ExerciseCategory;
  difficulty: ExerciseDifficulty;
  equipment: ExerciseEquipment;
  target: ExerciseTarget;
  top_n: number;
}

export interface RecommendExerciseResponse {
  total: number;
  exercises: Exercise[];
}

export function useRecommendExercise() {
  const mutation = useMutation({
    mutationKey: ["recommend-exercise"],
    mutationFn: async (req: RecommendExerciseRequest) => {
      const res = await api.client.post<ApiResponse<RecommendExerciseResponse>>(
        "/recommend-exercise",
        req,
      );
      return res.data;
    },
  });

  return { mutation };
}
