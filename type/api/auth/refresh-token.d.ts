import { LoginResponse } from "./login";

export interface RefreshTokenRequest {
  refresh_token: string;
}

export type RefreshTokenResponse = LoginResponse;
