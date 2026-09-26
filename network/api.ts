import { apiConfig } from "@/core/config";
import { logger } from "@/core/config/log";
import {
  create,
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
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

    this.client.interceptors.response.use(
      (response) => {
        logger.info(this.logFormat(response.config));

        return response;
      },
      (err: AxiosError) => {
        try {
          if (err.config) {
            logger.error(this.logFormat(err.config));
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

  private logFormat(config: InternalAxiosRequestConfig) {
    return `[${(config.method || "get").toUpperCase()}] ${config.url}`;
  }
}

export const api = new NetworkApi();
