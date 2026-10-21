import axios, { AxiosError, AxiosInstance } from "axios";

class ApiNetwork {
  client: AxiosInstance;
  accessToken?: string;
  refreshToken?: string;

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
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            // resend auth token here
          }
        }

        return Promise.reject(error);
      },
    );
  }

  async setToken(type: "access" | "refresh", token?: string) {
    switch (type) {
      case "access":
        this.accessToken = token;
        this.client.defaults.headers.common["Authorization"] = token
          ? `Bearer ${token}`
          : undefined;
        break;
      case "refresh":
        this.refreshToken = token;
        break;
    }
  }
}

export const api = new ApiNetwork();
