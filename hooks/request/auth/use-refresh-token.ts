import { api } from "@/network/api";
import { ApiResponse } from "@/types/common/api";
import { useMutation } from "@tanstack/react-query";
import { AuthResponse } from "./use-login";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface RefreshTokenInput {
  refresh_token: string;
}

const refreshTokenKey = "refresh_token";

export function useRefreshToken() {
  const mutation = useMutation({
    mutationKey: ["refresh-token"],
    mutationFn: async (values: RefreshTokenInput) => {
      const res = await api.client.post<ApiResponse<AuthResponse>>(
        "/auth/refresh-token",
        values,
      );

      return res.data;
    },
  });

  async function savedValue() {
    return await AsyncStorage.getItem(refreshTokenKey);
  }

  async function setValue(value: string) {
    await AsyncStorage.setItem(refreshTokenKey, value);
  }

  return { mutation, savedValue, setValue };
}
