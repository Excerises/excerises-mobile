import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

import AuthFooter from "@/components/ui/auth/auth-footer";
import UIButton from "@/components/ui/button";
import FormGroup from "@/components/ui/form-group";
import Input from "@/components/ui/input";
import UIText from "@/components/ui/text";
import useThemeColor from "@/hooks/use-theme-color";

export default function Register() {
  const router = useRouter();
  const themeColor = useThemeColor();

  const goToLogin = () => {
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <UIText style={styles.title}>Create a New Account</UIText>

      <UIText style={styles.subtitle}>
        Let&apos;s start your fitness journey.
      </UIText>

      <View style={styles.form}>
        <FormGroup label="Fullname">
          <Input
            style={styles.input}
            placeholder="Enter your full name"
          />
        </FormGroup>

        <FormGroup label="Email">
          <Input
            style={styles.input}
            placeholder="example@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </FormGroup>

        <FormGroup label="Password">
          <Input
            style={styles.input}
            placeholder="Enter password"
            isPassword
          />
        </FormGroup>

        <FormGroup label="Confirm Password">
          <Input
            style={styles.input}
            placeholder="Confirm password"
            isPassword
          />
        </FormGroup>
      </View>

      <UIButton
        style={[
          styles.mainButton,
          {
            backgroundColor: themeColor.primary,
          },
        ]}
        label="Register"
        onPress={goToLogin}
      />

      <AuthFooter
        text="Already have an account?"
        actionText="Sign in"
        onPress={goToLogin}
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