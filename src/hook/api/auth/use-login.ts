import { useMutation } from "@tanstack/react-query";
import { LoginRequest, LoginResponse } from "../../../../type/api/auth/login";
import { api } from "@/network/api";
import { ApiResponse } from "../../../../type/common/api";
import { useSetAuthToken } from "./use-set-auth-token";

export function useLogin() {
  const { setToken } = useSetAuthToken();

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (req: LoginRequest) => {
      const res = await api.client.post<ApiResponse<LoginResponse>>(
        "/auth/login",
        req,
      );

      await setToken(res.data.data);

      return res.data;
    },
  });

  return { mutation };
}
