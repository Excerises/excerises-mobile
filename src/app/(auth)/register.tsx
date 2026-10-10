import { Button, Input, Text, View } from "@/component/ui";
import { FormGroup } from "@/component/ui/form/group";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

export default function Register() {
  const router = useRouter();

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
          <Text>Full Name</Text>
          <Input placeholder="Enter your full name" />
        </FormGroup>
        <FormGroup>
          <Text>Email</Text>
          <Input placeholder="me@example.com" />
        </FormGroup>
        <FormGroup>
          <Text>Password</Text>
          <Input placeholder="Enter Password" />
        </FormGroup>
        <FormGroup>
          <Text>Confirm Password</Text>
          <Input placeholder="Confirm Password" />
        </FormGroup>
      </View>

      <Button size="lg" style={{ alignSelf: "stretch" }}>
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
