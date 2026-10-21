import { useMutation } from "@tanstack/react-query";
import {
  CalculateFitnessRequest,
  CalculateFitnessResponse,
} from "../../../../type/api/public/calculate-fitness-level";
import { api } from "@/network/api";
import { ApiResponse } from "../../../../type/common/api";

export function useCalculateFitness() {
  const mutation = useMutation({
    mutationKey: ["calculate-fitness"],
    mutationFn: async (req: CalculateFitnessRequest) => {
      const res = await api.client.post<ApiResponse<CalculateFitnessResponse>>(
        "/calculate-fitness",
        req,
      );
      return res.data;
    },
  });

  return { mutation };
}
