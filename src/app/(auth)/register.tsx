import {
  Button,
  FormControl,
  FormGroup,
  Input,
  Label,
  Text,
  View,
} from "@/component/ui";
import { useRegister } from "@/hook/api/auth/use-register";
import { useRegisterForm } from "@/hook/form/auth/use-register-form";
import { getError } from "@/utils/common/error";
import { useRouter } from "expo-router";
import { ActivityIndicator, Pressable, StyleSheet } from "react-native";

export default function Register() {
  const router = useRouter();
  const { control, handleSubmit, setError } = useRegisterForm();
  const { mutation } = useRegister();

  const handleRegister = handleSubmit(async (v) => {
    if (v.password !== v.passwordConfirmation) {
      setError("passwordConfirmation", {
        message: "Password does not match",
      });
      return;
    }

    try {
      await mutation.mutateAsync({
        name: v.name,
        email: v.email,
        password: v.password,
      });
      router.replace("/onboarding");
    } catch (err: any) {
      setError("email", { message: getError(err) });
    }
  });

  return (
    <View style={styles.content}>
      <View variant="ghost">
        <Text size="xl3" weight="bold">
          Create Account
        </Text>
        <Text variant="muted">
          Let's start your fintess journey by registering an account.
        </Text>
      </View>
      <View variant="ghost" style={styles.form}>
        <FormControl
          control={control}
          name="name"
          label="Full Name"
          required
          render={({ field }) => (
            <Input
              placeholder="Enter your full name"
              value={field.value}
              onChangeText={(v) => field.onChange(v)}
            />
          )}
        />
        <FormControl
          control={control}
          name="email"
          label="Email"
          required
          render={({ field }) => (
            <Input
              placeholder="me@example.com"
              keyboardType="email-address"
              value={field.value}
              onChangeText={(v) => field.onChange(v)}
            />
          )}
        />
        <FormControl
          control={control}
          name="password"
          label="Password"
          required
          render={({ field }) => (
            <Input
              placeholder="Enter Password"
              password
              value={field.value}
              onChangeText={(v) => field.onChange(v)}
            />
          )}
        />
        <FormControl
          control={control}
          name="passwordConfirmation"
          label="Confirm Password"
          required
          render={({ field }) => (
            <Input
              placeholder="Confirm Password"
              password
              value={field.value}
              onChangeText={(v) => field.onChange(v)}
            />
          )}
        />
      </View>

      <Button
        size="lg"
        style={{ alignSelf: "stretch" }}
        onPress={() => handleRegister()}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text weight="semibold" size="lg">
            REGISTER
          </Text>
        )}
      </Button>

      <View style={styles.action}>
        <Text variant="muted">Already have an account? </Text>
        <Pressable onPress={() => router.replace("/login")}>
          <Text variant="primary">Sign in</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 26,
  },
  form: {
    gap: 14,
  },
  or: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  action: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
