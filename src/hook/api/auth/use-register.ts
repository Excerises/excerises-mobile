import { useMutation } from "@tanstack/react-query";
import {
  RegisterRequest,
  RegisterResponse,
} from "../../../../type/api/auth/register";
import { api } from "@/network/api";
import { ApiResponse } from "../../../../type/common/api";
import { useLogin } from "./use-login";

export function useRegister() {
  const { mutation: loginMutation } = useLogin();

  const mutation = useMutation({
    mutationKey: ["register"],
    mutationFn: async (req: RegisterRequest) => {
      const res = await api.client.post<ApiResponse<RegisterResponse>>(
        "/auth/register",
        req,
      );

      await loginMutation.mutateAsync({
        email: req.email,
        password: req.password,
      });

      return res.data;
    },
  });

  return { mutation };
}
