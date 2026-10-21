import { useMutation } from "@tanstack/react-query";
import {
  RecommendExercisesRequest,
  RecommendExercisesResponse,
} from "../../../../type/api/public/recommend-exercises";
import { api } from "@/network/api";
import { ApiResponse } from "../../../../type/common/api";

export function useRecommendExercises() {
  const mutation = useMutation({
    mutationKey: ["recommend-exercises"],
    mutationFn: async (req: RecommendExercisesRequest) => {
      const res = await api.client.post<
        ApiResponse<RecommendExercisesResponse>
      >("/recommend-exercise", req);
      return res.data;
    },
  });

  return { mutation };
}
