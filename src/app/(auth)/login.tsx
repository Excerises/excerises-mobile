import { Button, Input, Separator, Text, View } from "@/component/ui";
import { FormGroup } from "@/component/ui/form/group";
import { Fonts } from "@/constant/theme";
import { Image, StyleSheet } from "react-native";
import GoogleIcon from "@/assets/images/auth/google.png";
import AppleIcon from "@/assets/images/auth/apple.png";

function OauthButton({ icon, label }: { icon: any; label: string }) {
  return (
    <Button size="lg" variant="secondary" style={{ flex: 1 }}>
      <Image
        source={icon}
        style={{ width: Fonts.size.sm, height: Fonts.size.sm }}
      />
      <Text>{label}</Text>
    </Button>
  );
}

export default function Login() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View variant="ghost">
          <Text size="xl3" weight="bold">
            Welcome Back
          </Text>
          <Text variant="muted">
            Glad to see you again! Enter your account to start.
          </Text>
        </View>
        <View variant="ghost" style={styles.form}>
          <FormGroup>
            <Text>Email</Text>
            <Input placeholder="me@example.com" />
          </FormGroup>
          <FormGroup>
            <Text>Password</Text>
            <Input placeholder="Enter Password" />
          </FormGroup>
        </View>

        <Text weight="semibold" variant="primary">
          Forgot password?
        </Text>

        <Button size="lg" style={{ alignSelf: "stretch" }}>
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
          <Text variant="muted">Doesn't have an account yet? </Text>
          <Text variant="primary">Register here</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
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
