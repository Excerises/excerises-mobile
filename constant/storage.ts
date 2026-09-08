import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_KEY = "user";
const LOGIN_KEY = "isLoggedIn";

export async function saveUser(user: object) {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}

export async function getUser() {
  const data = await AsyncStorage.getItem(USER_KEY);

  if (!data) {
    return null;
  }

  return JSON.parse(data);
}

export async function loginUser() {
  await AsyncStorage.setItem(LOGIN_KEY, "true");
}

export async function isLoggedIn() {
  const value = await AsyncStorage.getItem(LOGIN_KEY);
  return value === "true";
}

export async function logoutUser() {
  await AsyncStorage.removeItem(LOGIN_KEY);
}

export async function clearUser() {
  await AsyncStorage.multiRemove([
    USER_KEY,
    LOGIN_KEY,
  ]);
}