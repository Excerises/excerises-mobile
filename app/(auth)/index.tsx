import AuthForm from "@/components/ui/auth/form";
import AuthInput from "@/components/ui/auth/input";
import UIButton from "@/components/ui/button";
import UIText from "@/components/ui/text";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

export default function Page() {
  const router = useRouter();

  return (
    <AuthForm
      title="Log in"
      description="Enter your email and password to access to your account."
    >
      <View style={styles.group}>
        <AuthInput placeholder="Email or username" />
        <AuthInput placeholder="Password" />
      </View>
      <UIButton style={styles.button} label="Login"></UIButton>
      <View style={styles.actionView}>
        <UIText variant="muted">Don{"'"}t have an account? </UIText>
        <Pressable
          onPress={() => {
            router.push("/(auth)/register");
          }}
        >
          <UIText variant="link">Sign Up here</UIText>
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
