import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

import AuthFooter from "@/components/ui/auth/auth-footer";
import UIButton from "@/components/ui/common/button";
import FormGroup from "@/components/ui/common/form-group";
import Input from "@/components/ui/common/input";
import UIText from "@/components/ui/common/text";

export default function Register() {
  const router = useRouter();

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
          <Input placeholder="Enter your full name" />
        </FormGroup>

        <FormGroup label="Email">
          <Input
            placeholder="example@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </FormGroup>

        <FormGroup label="Password">
          <Input placeholder="Enter password" isPassword />
        </FormGroup>

        <FormGroup label="Confirm Password">
          <Input placeholder="Confirm password" isPassword />
        </FormGroup>
      </View>

      <UIButton
        style={styles.registerButton}
        label="Register"
        variant="primary"
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

  registerButton: {
    width: "100%",
    height: 48,
    marginTop: 30,
  },
});
