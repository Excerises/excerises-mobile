import AuthInput from "@/components/ui/auth/input";
import UIButton from "@/components/ui/button";
import UIText from "@/components/ui/text";
import useThemeColor from "@/hooks/use-theme-color";
import { getUser, loginUser } from "@/constant/storage";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

export default function Page() {
  const router = useRouter();
  const themeColor = useThemeColor();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <UIText style={styles.title}>
        Log In
      </UIText>

      <UIText style={styles.subtitle}>
        Welcome back!
      </UIText>

      <View style={styles.form}>
        <View style={styles.field}>
          <UIText style={styles.label}>
            Email
          </UIText>

          <AuthInput
            style={styles.input}
            placeholder="example@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.field}>
          <UIText style={styles.label}>
            Password
          </UIText>

          <AuthInput
            style={styles.input}
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            isPassword
          />
        </View>

        <Pressable>
          <UIText style={styles.redText}>
            Lupa password
          </UIText>
        </Pressable>
      </View>

      <UIButton
        style={[
          styles.loginButton,
          {
            backgroundColor: themeColor.destructive,
          },
        ]}
        label="LOGIN"
        onPress={async () => {
          try {
            const user = await getUser();

            if (!user) {
              Alert.alert(
                "Login Gagal",
                "Belum ada akun yang terdaftar."
              );
              return;
            }

            if (
              user.email === email &&
              user.password === password
            ) {
              await loginUser();

              Alert.alert(
                "Login Berhasil",
                `Selamat datang, ${user.fullname}!`,
                [
                  {
                    text: "OK",
                    onPress: () => router.replace("/dashboard"),
                  },
                ]
              );
            } else {
              Alert.alert(
                "Login Gagal",
                "Email atau password salah."
              );
            }
          } catch {
            Alert.alert(
              "Login Gagal",
              "Terjadi kesalahan saat login."
            );
          }
        }}
      />

      <View style={styles.divider}>
        <View
          style={[
            styles.line,
            {
              backgroundColor: themeColor.border,
            },
          ]}
        />

        <UIText
          style={[
            styles.orText,
            {
              color: themeColor.mutedForeground,
            },
          ]}
        >
          or login with
        </UIText>

        <View
          style={[
            styles.line,
            {
              backgroundColor: themeColor.border,
            },
          ]}
        />
      </View>

      <View style={styles.socialRow}>
        <Pressable
          style={[
            styles.socialButton,
            {
              backgroundColor: themeColor.card,
            },
          ]}
        >
          <FontAwesome
            name="google"
            size={18}
            color={themeColor.foreground}
          />

          <UIText
            style={[
              styles.socialText,
              {
                color: themeColor.foreground,
              },
            ]}
          >
            Google
          </UIText>
        </Pressable>

        <Pressable
          style={[
            styles.socialButton,
            {
              backgroundColor: themeColor.card,
            },
          ]}
        >
          <Ionicons
            name="logo-apple"
            size={20}
            color={themeColor.foreground}
          />

          <UIText
            style={[
              styles.socialText,
              {
                color: themeColor.foreground,
              },
            ]}
          >
            Apple
          </UIText>
        </Pressable>
      </View>

      <View style={styles.signupRow}>
        <UIText variant="muted">
          Don't have an account?{" "}
        </UIText>

        <Pressable
          onPress={() => router.replace("/register")}
        >
          <UIText style={styles.redText}>
            Sign up
          </UIText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 45,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },

  form: {
    marginTop: 28,
    gap: 14,
  },

  field: {
    gap: 6,
  },

  label: {
    fontSize: 14,
  },

  input: {
    height: 48,
    borderRadius: 6,
  },

  redText: {
    color: "#d00000",
  },

  loginButton: {
    width: "100%",
    height: 48,
    marginTop: 40,
    borderRadius: 6,
  },

  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },

  line: {
    flex: 1,
    height: 1,
  },

  orText: {
    marginHorizontal: 8,
    fontSize: 16,
  },

  socialRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 40,
  },

  socialButton: {
    flex: 1,
    height: 48,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  socialText: {
    fontSize: 15,
    fontWeight: "600",
  },

  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 18,
  },
});