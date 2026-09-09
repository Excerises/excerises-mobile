import AuthInput from "@/components/ui/auth/input";
import OAuthButton from "@/components/ui/auth/oauth-button";
import AuthFormGroup from "@/components/ui/auth/form-group";
import AuthFooter from "@/components/ui/auth/auth-footer";
import UIButton from "@/components/ui/button";
import UIText from "@/components/ui/text";
import Separator from "@/components/ui/separator";

import useThemeColor from "@/hooks/use-theme-color";
import { useLogin } from "@/hooks/auth/use-login";

import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";

export default function Page() {
  const router = useRouter();
  const themeColor = useThemeColor();

  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
  } = useLogin();

  return (
    <View style={styles.container}>
      <UIText style={styles.title}>
        Log In
      </UIText>

      <UIText style={styles.subtitle}>
        Welcome back!
      </UIText>

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
          <UIText style={styles.redText}>
            Lupa password
          </UIText>
        </Pressable>
      </View>

      <UIButton
        style={styles.loginButton}
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
        <OAuthButton
          icon={
            <FontAwesome
              name="google"
              size={18}
              color={themeColor.foreground}
            />
          }
          label="Google"
        />

        <OAuthButton
          icon={
            <Ionicons
              name="logo-apple"
              size={20}
              color={themeColor.foreground}
            />
          }
          label="Apple"
        />
      </View>

      <AuthFooter
        text="Don't have an account?"
        actionText="Sign up"
        onPress={() => router.replace("/register")}
      />
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

  loginButton: {
    marginTop: 28,
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
});