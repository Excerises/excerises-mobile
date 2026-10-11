import {
  Button,
  FormControl,
  FormGroup,
  Input,
  Label,
  Separator,
  Text,
  View,
} from "@/component/ui";
import { Fonts } from "@/constant/theme";
import { Alert, Image, Pressable, StyleSheet } from "react-native";
import GoogleIcon from "@/assets/images/auth/google.png";
import AppleIcon from "@/assets/images/auth/apple.png";
import { useRouter } from "expo-router";
import { useLoginForm } from "@/hook/form/auth/use-login-form";

function OauthButton({ icon, label }: { icon: any; label: string }) {
  function onPress() {
    Alert.alert("This feature will be available soon.");
  }

  return (
    <Button size="lg" variant="secondary" style={{ flex: 1 }} onPress={onPress}>
      <Image
        source={icon}
        style={{ width: Fonts.size.sm, height: Fonts.size.sm }}
      />
      <Text>{label}</Text>
    </Button>
  );
}

export default function Login() {
  const router = useRouter();
  const { control, handleSubmit } = useLoginForm();

  const handleLogin = handleSubmit((v) => {
    console.log(v);
  });

  return (
    <View style={styles.content}>
      <View variant="ghost">
        <Text size="xl3" weight="bold">
          Sign In
        </Text>
        <Text variant="muted">
          Glad to see you again! Enter your account to start.
        </Text>
      </View>
      <View variant="ghost" style={styles.form}>
        <FormControl
          control={control}
          name="email"
          label="Email"
          required
          render={({ field }) => (
            <Input
              placeholder="me@example.com"
              value={field.value}
              onChangeText={(v) => field.onChange(v)}
              keyboardType="email-address"
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
      </View>

      <Text weight="semibold" variant="primary">
        Forgot password?
      </Text>

      <Button size="lg" style={{ alignSelf: "stretch" }} onPress={handleLogin}>
        <Text weight="semibold" size="lg">
          LOGIN
        </Text>
      </Button>

      <View style={styles.or}>
        <Separator />
        <Text variant="muted">OR</Text>
        <Separator />
      </View>

      <View style={styles.or}>
        <OauthButton icon={GoogleIcon} label="Google" />
        <OauthButton icon={AppleIcon} label="Apple" />
      </View>

      <View style={styles.action}>
        <Text variant="muted">Doesn't have an account? </Text>
        <Pressable onPress={() => router.replace("/register")}>
          <Text variant="primary">Sign up</Text>
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
