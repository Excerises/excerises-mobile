import AuthInput from "@/components/ui/auth/input";
import UIButton from "@/components/ui/button";
import UIText from "@/components/ui/text";
import useThemeColor from "@/hooks/use-theme-color";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { useLogin } from "@/hooks/auth/use-login";
import AuthFormGroup from "@/components/ui/auth/form-group";
import Separator from "@/components/ui/separator";

export default function Page() {
  const router = useRouter();
  const themeColor = useThemeColor();

  const { email, setEmail, password, setPassword, handleLogin } = useLogin();

  return (
    <View style={styles.container}>
      <UIText style={styles.title}>Log In</UIText>

      <UIText style={styles.subtitle}>Welcome back!</UIText>

      <View style={styles.form}>
        <AuthFormGroup label="Email">
          <AuthInput
            style={styles.input}
            placeholder="example@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </AuthFormGroup>

        <AuthFormGroup label="Password">
          <AuthInput
            style={styles.input}
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            isPassword
          />
        </AuthFormGroup>

        <Pressable>
          <UIText style={styles.redText}>Lupa password</UIText>
        </Pressable>
      </View>

      <UIButton
        style={{ marginTop: 28 }}
        label="LOGIN"
        variant="destructive"
        onPress={handleLogin}
      />

      <View style={styles.divider}>
        <Separator />

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

        <Separator />
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
          <FontAwesome name="google" size={18} color={themeColor.foreground} />

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
          <Ionicons name="logo-apple" size={20} color={themeColor.foreground} />

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
        <UIText variant="muted">Don{"'"}t have an account? </UIText>

        <Pressable onPress={() => router.replace("/register")}>
          <UIText style={styles.redText}>Sign up</UIText>
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

  input: {
    height: 48,
    borderRadius: 6,
  },

  redText: {
    color: "#d00000",
  },

  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
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
