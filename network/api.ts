import { apiConfig } from "@/core/config";
import { AuthResponse } from "@/hooks/request/auth/use-login";
import { ApiResponse } from "@/types/common/api";
import { create, AxiosInstance, AxiosError } from "axios";

class NetworkApi {
  public client: AxiosInstance;
  public refreshToken: string | undefined;

  constructor(baseUrl?: string) {
    this.client = create({
      baseURL: baseUrl || apiConfig.baseURL,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const config = error.config;
        if (!config) {
          return Promise.reject(error);
        }

        const statusCode = error.response?.status;
        if (
          statusCode == 401 &&
          !config.url?.includes("/refresh") &&
          this.refreshToken
        ) {
          const res = await this.client.post<ApiResponse<AuthResponse>>(
            "/auth/refresh",
            { refresh_token: this.refreshToken },
          );
          const { access_token, refresh_token } = res.data.data;

          this.setAccessToken(access_token);
          this.setRefreshToken(refresh_token);

          return this.client.request(config);
        }

        return Promise.reject(error);
      },
    );
  }

  public setAccessToken(token: string) {
    this.client.defaults.headers.common["Authorization"] =
      `${apiConfig.authType} ${token}`;
  }

  public setRefreshToken(token: string) {
    this.refreshToken = token;
  }
}

export const api = new NetworkApi();
