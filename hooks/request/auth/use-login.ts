import { LoginInput } from "@/hooks/form/auth/use-login-form";
import { api } from "@/network/api";
import { ApiResponse } from "@/types/common/api";
import { useMutation } from "@tanstack/react-query";

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export function useLogin() {
  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (values: LoginInput) => {
      const res = await api.client.post<ApiResponse<AuthResponse>>(
        "/auth/login",
        values,
      );

      return res.data;
    },
  });

  return { mutation };
}
