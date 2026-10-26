import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginRequest, LoginResponse } from "../../../../type/api/auth/login";
import { api } from "@/network/api";
import { ApiResponse } from "../../../../type/common/api";
import { useSetAuthToken } from "./use-set-auth-token";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "expo-router";

export function useLogin() {
  const { setToken } = useSetAuthToken();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (req: LoginRequest) => {
      const res = await api.client.post<ApiResponse<LoginResponse>>(
        "/auth/login",
        req,
      );

      await setToken(res.data.data);
      queryClient.invalidateQueries({ queryKey: ["get-profile"] });

      return res.data;
    },
  });

  return { mutation };
}

export function useLogout() {
  const { setToken } = useSetAuthToken();
  const { setUser } = useAuth();
  const router = useRouter();

  const mutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      await setToken({
        access_token: "",
        refresh_token: "",
        token_type: "bearer",
      });
      setUser(null);
      router.replace("/login");
    },
  });

  return { mutation };
}
