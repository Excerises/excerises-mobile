import AuthFooter from "@/components/ui/auth/auth-footer";
import UIButton from "@/components/ui/button";
import AuthFormGroup from "@/components/ui/form-group";
import AuthInput from "@/components/ui/input";
import UIText from "@/components/ui/text";

import useThemeColor from "@/hooks/use-theme-color";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Page() {
  const themeColor = useThemeColor();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <UIText style={styles.title}>Create a New Account</UIText>

      <UIText style={styles.subtitle}>
        Let&apos;s start your fitness journey.
      </UIText>

      <View style={styles.form}>
        <AuthFormGroup label="Fullname">
          <AuthInput style={styles.input} placeholder="Enter your full name" />
        </AuthFormGroup>

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

        <AuthFormGroup label="Confirm Password">
          <AuthInput
            style={styles.input}
            placeholder="Confirm password"
            isPassword
          />
        </AuthFormGroup>
      </View>

      <UIButton
        style={[
          styles.mainButton,
          {
            backgroundColor: themeColor.destructive,
          },
        ]}
        label="REGISTER"
        onPress={() => router.replace("/login")}
      />

      <AuthFooter
        text="Already have an account?"
        actionText="Sign in"
        onPress={() => router.replace("/login")}
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

  mainButton: {
    width: "100%",
    height: 48,
    marginTop: 30,
    borderRadius: 6,
  },
});
