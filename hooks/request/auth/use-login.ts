import { LoginInput } from "@/hooks/form/auth/use-login-form";
import { api } from "@/network/api";
import { ApiResponse } from "@/types/common/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRefreshToken } from "./use-refresh-token";

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export function useLogin() {
  const queryClient = useQueryClient();
  const { setToken: setRefreshToken } = useRefreshToken();

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (values: LoginInput) => {
      const res = await api.client.post<ApiResponse<AuthResponse>>(
        "/auth/login",
        values,
      );

      const { access_token, refresh_token } = res.data.data;

      api.setAccessToken(access_token);
      api.setRefreshToken(refresh_token);

      await setRefreshToken(refresh_token);

      await new Promise((res) => setTimeout(res, 400));
      queryClient.invalidateQueries({ queryKey: ["get-profile"] });

      return res.data;
    },
  });

  return { mutation };
}
