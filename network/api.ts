import { apiConfig } from "@/core/config";
import { logger } from "@/core/config/log";
import {
  create,
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

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

    this.client.interceptors.request.use((config) => {
      (config as any).metadata = {
        startTime: Date.now(),
      };

      return config;
    });

    this.client.interceptors.response.use(
      (response) => {
        logger.info(this.logFormat(response));

        return response;
      },
      (err: AxiosError) => {
        try {
          if (err.response) {
            logger.error(this.logFormat(err.response));
          }
        } finally {
          console.log(err);
        }

        return Promise.reject(err);
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

  private logFormat(res: AxiosResponse) {
    const config = res.config;
    const startTime = (res.config as any).metadata?.startTime;
    const duration = startTime ? Date.now() - startTime : 0;
    return `[${(config.method || "get").toUpperCase()}] ${config.url} in ${duration}ms`;
  }
}

export const api = new NetworkApi();
