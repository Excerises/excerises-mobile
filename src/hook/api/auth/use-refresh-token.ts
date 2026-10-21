import { useMutation } from "@tanstack/react-query";
import {
  RefreshTokenRequest,
  RefreshTokenResponse,
} from "../../../../type/api/auth/refresh-token";
import { api } from "@/network/api";
import { ApiResponse } from "../../../../type/common/api";
import { useSetAuthToken } from "./use-set-auth-token";

export function useRefreshToken() {
  const { setToken } = useSetAuthToken();

  const mutation = useMutation({
    mutationKey: ["refresh-token"],
    retry: false,
    mutationFn: async (req: RefreshTokenRequest) => {
      const res = await api.client.post<ApiResponse<RefreshTokenResponse>>(
        "/auth/refresh",
        req,
      );

      await setToken(res.data.data);

      return res.data;
    },
  });

  return { mutation };
}
