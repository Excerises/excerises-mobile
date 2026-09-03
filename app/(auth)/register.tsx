import AuthForm from "@/components/ui/auth/form";
import AuthTextInput from "@/components/ui/auth/input";
import UIButton from "@/components/ui/button";
import UIText from "@/components/ui/text";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

export default function Page() {
  const router = useRouter();

  return (
    <AuthForm
      title="Create Account"
      description="Create a new account to get started with your fitness journey."
    >
      <View style={styles.group}>
        <AuthTextInput placeholder="Enter Full Name" />
        <AuthTextInput placeholder="Birth Date" />
        <AuthTextInput placeholder="Gender" />
        <AuthTextInput
          style={{ height: 100, borderRadius: 20 }}
          multiline
          placeholder="Address"
        />
        <AuthTextInput placeholder="Email" keyboardType="email-address" />
      </View>
      <UIButton style={styles.button} label="Register"></UIButton>
      <View style={styles.actionView}>
        <UIText variant="muted">Already have an account? </UIText>
        <Pressable
          onPress={() => {
            router.back();
          }}
        >
          <UIText variant="link">Sign In here</UIText>
        </Pressable>
      </View>
    </AuthForm>
  );
}

const styles = StyleSheet.create({
  group: {
    display: "flex",
    gap: 15,
    marginBottom: 30,
  },
  button: {
    borderRadius: 50,
    marginBottom: 30,
  },
  actionView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
