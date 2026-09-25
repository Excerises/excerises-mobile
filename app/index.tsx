import useThemeColor from "@/hooks/use-theme-color";
import { Image, StyleSheet, View } from "react-native";
import Icon from "@/assets/img/favicon.png";
import { useEffect } from "react";
import { useGetProfile } from "@/hooks/request/profile/use-get-profile";
import { useRouter } from "expo-router";
import { useAuth } from "@/stores/auth-store";
import { useToast } from "@/hooks/use-toast";
import { useWelcome } from "@/hooks/use-welcome";
import { getErrorMessage } from "@/utils/error";
import { AxiosError } from "axios";
import { useRefreshToken } from "@/hooks/request/auth/use-refresh-token";
import { api } from "@/network/api";

export default function IndexPage() {
  const color = useThemeColor();
  const size = 120;

  const router = useRouter();
  const {
    query: { data: user, isPending, isFetched, isError, error },
  } = useGetProfile();
  const auth = useAuth();
  const toast = useToast();
  const { isWelcomed } = useWelcome();
  const { savedValue: refreshToken } = useRefreshToken();

  async function setRefreshToken() {
    const value = await refreshToken();
    if (value) {
      api.setRefreshToken(value);
    }
  }

  async function checkUserAndRedirect() {
    await new Promise((res) => setTimeout(res, 700));

    const welcomed = await isWelcomed();
    const errorRedirectTo = welcomed ? "/login" : "/welcome";

    if (isPending) {
      return;
    }

    if (isError) {
      if (error instanceof AxiosError) {
        if (error.response?.status != 401) {
          toast.error({
            title: "No Connection",
            description: "Check your internet and try again later.",
          });
          return;
        }
      }
    }

    if (!user || isError) {
      router.replace(errorRedirectTo);
      return;
    }

    auth.setUser(user.data);
    router.replace("/home");
  }

  useEffect(() => {
    setRefreshToken().then(checkUserAndRedirect);
  }, [user, isFetched]);

  return (
    <View style={[styles.container, { backgroundColor: color.background }]}>
      <Image
        source={Icon as any}
        style={{ width: size, height: size, backgroundColor: "transparent" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    borderRadius: 9999,
    height: 130,
    width: 130,
    alignItems: "center",
    justifyContent: "center",
  },
});
