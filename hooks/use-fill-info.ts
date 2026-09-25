import AsyncStorage from "@react-native-async-storage/async-storage";

const key = "introduced";

export function useFillInfo() {
  async function isFillInfo() {
    return await AsyncStorage.getItem(key);
  }

  async function markAlreadyFill() {
    await AsyncStorage.setItem(key, "1");
  }

  return {
    isFillInfo,
    markAlreadyFill,
  };
}
