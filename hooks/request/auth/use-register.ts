import { RegisterFormInput } from "@/hooks/form/use-register-form";
import { api } from "@/network/api";
import { ApiResponse } from "@/types/common/api";
import { useMutation } from "@tanstack/react-query";

export function useRegister() {
  const mutation = useMutation({
    mutationKey: ["register"],
    mutationFn: async (params: RegisterFormInput) => {
      const res = await api.client.post("/auth/register", params);
      const data = res.data as ApiResponse;

      return data;
    },
  });

  return { mutation };
}
