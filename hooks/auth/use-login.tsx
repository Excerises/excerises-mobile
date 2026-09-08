import { getUser, loginUser } from "@/constant/storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

export function useLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const user = await getUser();

      if (!user) {
        Alert.alert("Login Gagal", "Belum ada akun yang terdaftar.");
        return;
      }

      if (user.email === email && user.password === password) {
        await loginUser();

        Alert.alert("Login Berhasil", `Selamat datang, ${user.fullname}!`, [
          {
            text: "OK",
            onPress: () => router.replace("/dashboard"),
          },
        ]);
      } else {
        Alert.alert("Login Gagal", "Email atau password salah.");
      }
    } catch {
      Alert.alert("Login Gagal", "Terjadi kesalahan saat login.");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
  };
}
