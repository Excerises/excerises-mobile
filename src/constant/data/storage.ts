import AsyncStorage from "@react-native-async-storage/async-storage";

export const asyncStorage = AsyncStorage;

export const STORAGE_KEYS = {
  hasOpenedApp: "has_opened_app",
  refreshToken: "refresh_token",
} as const;
