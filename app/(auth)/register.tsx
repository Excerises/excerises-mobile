import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import AuthFooter from "@/components/ui/auth/auth-footer";
import UIButton from "@/components/ui/common/button";
import Input from "@/components/ui/common/input";
import StepHeader from "@/components/ui/common/step-header";
import { useRegisterForm } from "@/hooks/form/auth/use-register-form";
import FieldControl from "@/components/ui/common/form/field-control";
import { useRegister } from "@/hooks/request/auth/use-register";
import { useToast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/utils/error";

export default function Register() {
  const router = useRouter();
  const toast = useToast();

  const {
    form: { control, handleSubmit, setError },
  } = useRegisterForm();
  const { mutation: register } = useRegister();

  const goToLogin = () => {
    router.replace("/login");
  };

  const onRegister = handleSubmit(async (values) => {
    if (values.password !== values.passwordConfirm) {
      setError("passwordConfirm", { message: "Password not match" });
    }

    try {
      await register.mutateAsync(values);

      toast.success({
        title: "Account registered",
        description: "Your account successfully registered",
      });

      router.replace("/home");
    } catch (err: any) {
      toast.error({
        title: "Failed",
        description: getErrorMessage(err),
      });
    }
  });

  return (
    <View style={styles.container}>
      <StepHeader
        title="Create a New Account"
        subtitle="Let's start your fitness journey."
      />

      <View style={styles.form}>
        <FieldControl
          control={control}
          name="name"
          label="Full Name"
          render={({ field }) => (
            <Input
              placeholder="Enter your full name"
              value={field.value}
              onChangeText={(v) => field.onChange(v)}
            />
          )}
        />

        <FieldControl
          control={control}
          name="email"
          label="Email"
          render={({ field }) => (
            <Input
              placeholder="example@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={field.value}
              onChangeText={(v) => field.onChange(v)}
            />
          )}
        />

        <FieldControl
          control={control}
          name="password"
          label="Password"
          render={({ field }) => (
            <Input
              placeholder="Enter password"
              isPassword
              value={field.value}
              onChangeText={(v) => field.onChange(v)}
            />
          )}
        />

        <FieldControl
          control={control}
          name="passwordConfirm"
          label="Confirm Password"
          render={({ field }) => (
            <Input
              placeholder="Confirm password"
              isPassword
              value={field.value}
              onChangeText={(v) => field.onChange(v)}
            />
          )}
        />
      </View>

      <UIButton
        style={styles.registerButton}
        label="Register"
        variant="primary"
        onPress={onRegister}
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
