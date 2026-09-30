import { api } from "@/network/api";
import { useAuth } from "@/stores/auth-store";
import { ApiResponse } from "@/types/common/api";
import { User } from "@/types/entity";
import { useMutation } from "@tanstack/react-query";

export interface UpdateProfileRequest {
  birth_date: string;
  gender: string;
  height: number;
  weight: number;
  bmi: number;
  workout_freq_per_week: number;
  workout_duration_per_day: number;
  water_intake_daily: number;
  reminder_days: number[];
  reminder_time: string;
}

export function useUpdateProfile() {
  const auth = useAuth();

  const mutation = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: async (data: UpdateProfileRequest) => {
      const res = await api.client.patch<ApiResponse<User>>("/profile", data);
      auth.setUser(res.data.data);
      return res.data;
    },
  });

  return { mutation };
}
