import AsyncStorage from "@react-native-async-storage/async-storage";

const key = "welcomed";

export function useWelcome() {
  async function isWelcomed() {
    const welcomed = await AsyncStorage.getItem(key);
    if (welcomed) {
      return true;
    }

    return false;
  }

  async function markWelcomed() {
    await AsyncStorage.setItem(key, "true");
  }

  return {
    isWelcomed,
    markWelcomed,
  };
}
