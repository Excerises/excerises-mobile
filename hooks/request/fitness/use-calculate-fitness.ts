import { api } from "@/network/api";
import { ApiResponse } from "@/types/common/api";
import { UserFitnessLevel, UserGender } from "@/types/entity";
import { useMutation } from "@tanstack/react-query";

export interface CalculateFitnessLevelInput {
  age: number;
  gender: UserGender;
  height: number;
  weight: number;
  workout_freq_per_week: number;
  workout_duration_per_day: number;
  water_intake_daily: number;
}

export interface CalculateFitnessLevelResponse {
  level: UserFitnessLevel;
}

export function useCalculateFitness() {
  const mutation = useMutation({
    mutationKey: ["calculate-fitness"],
    mutationFn: async (data: CalculateFitnessLevelInput) => {
      const res = await api.client.post<
        ApiResponse<CalculateFitnessLevelResponse>
      >("/calculate-fitness", data);
      return res.data;
    },
  });

  return {
    mutation,
  };
}
