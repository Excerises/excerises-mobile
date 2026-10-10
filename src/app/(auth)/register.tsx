import { Button, FormGroup, Input, Label, Text, View } from "@/component/ui";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

export default function Register() {
  const router = useRouter();

  function register() {
    router.push("/onboarding");
  }

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
        <FormGroup>
          <Label required>Full Name</Label>
          <Input placeholder="Enter your full name" />
        </FormGroup>
        <FormGroup>
          <Label required>Email</Label>
          <Input placeholder="me@example.com" />
        </FormGroup>
        <FormGroup>
          <Label required>Password</Label>
          <Input placeholder="Enter Password" password />
        </FormGroup>
        <FormGroup>
          <Label required>Confirm Password</Label>
          <Input placeholder="Confirm Password" password />
        </FormGroup>
      </View>

      <Button size="lg" style={{ alignSelf: "stretch" }} onPress={register}>
        <Text weight="semibold" size="lg">
          REGISTER
        </Text>
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
