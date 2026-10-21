import { asyncStorage } from "@/constant/data/storage";
import { useRefreshToken } from "@/hook/api/auth/use-refresh-token";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

const REFRESH_TOKEN_KEY = "refresh_token";

class ApiNetwork {
  client: AxiosInstance;

  constructor(baseUrl?: string) {
    if (!baseUrl) {
      baseUrl = "https://api-excerises.izzaalfiansyah.my.id";
    }

    this.client = axios.create({
      baseURL: baseUrl,
      withCredentials: true,
    });
    this.setInterceptor();
  }

  setInterceptor() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { mutation: refreshTokenMutation } = useRefreshToken();

    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error instanceof AxiosError) {
          const config = error.config as AxiosRequestConfig & {
            _retried?: boolean;
          };
          const shouldRefresh =
            error.response?.status === 401 &&
            !(config.url || "").includes("/auth/refresh");

          if (config && !config._retried && shouldRefresh) {
            config._retried = true;
            const token = await this.getSavedRefreshToken();

            if (token) {
              const res = await refreshTokenMutation.mutateAsync({
                refresh_token: token,
              });
              config._retried = false;
              config.headers!.Authorization = `Bearer ${res.data.access_token}`;

              return api.client(config);
            }
          }
        }

        return Promise.reject(error);
      },
    );
  }

  async setToken(type: "access" | "refresh", token?: string) {
    switch (type) {
      case "access":
        this.client.defaults.headers.common["Authorization"] = token
          ? `Bearer ${token}`
          : undefined;
        break;
      case "refresh":
        if (token) {
          await asyncStorage.setItem(REFRESH_TOKEN_KEY, token);
        } else {
          await asyncStorage.removeItem(REFRESH_TOKEN_KEY);
        }
        break;
    }
  }

  async getSavedRefreshToken() {
    const token = await asyncStorage.getItem(REFRESH_TOKEN_KEY);

    return token || undefined;
  }
}

export const api = new ApiNetwork();
