import { apiConfig } from "@/core/config";
import { create, AxiosInstance } from "axios";

class NetworkApi {
  public client: AxiosInstance = create({
    baseURL: apiConfig.baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  constructor(baseUrl?: string) {
    if (baseUrl) {
      this.client.defaults.baseURL = baseUrl;
    }
  }

  public setToken(token: string) {
    this.client.defaults.headers.common["Authorization"] =
      `${apiConfig.authType} ${token}`;
  }
}

export const api = new NetworkApi();
