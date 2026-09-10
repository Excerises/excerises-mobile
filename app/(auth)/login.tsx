import AuthFooter from "@/components/ui/auth/auth-footer";
import OAuthButton from "@/components/ui/auth/oauth-button";
import UIButton from "@/components/ui/button";
import AuthFormGroup from "@/components/ui/form-group";
import AuthInput from "@/components/ui/input";
import Separator from "@/components/ui/separator";
import UIText from "@/components/ui/text";

import useThemeColor from "@/hooks/use-theme-color";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

export default function Page() {
  const themeColor = useThemeColor();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <UIText style={styles.title}>Log In</UIText>

      <UIText style={styles.subtitle}>Welcome back!</UIText>

      <View style={styles.form}>
        <AuthFormGroup label="Email">
          <AuthInput
            style={styles.input}
            placeholder="example@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </AuthFormGroup>

        <AuthFormGroup label="Password">
          <AuthInput
            style={styles.input}
            placeholder="Enter password"
            isPassword
          />
        </AuthFormGroup>

        <Pressable>
          <UIText style={styles.redText}>Lupa password</UIText>
        </Pressable>
      </View>

      <UIButton
        style={styles.loginButton}
        label="LOGIN"
        variant="destructive"
        onPress={() => router.push("/profile")}
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
        text={"Don't have an account?"}
        actionText="Sign up"
        onPress={() => router.replace("/register")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 10,
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
    marginTop: 26,
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
