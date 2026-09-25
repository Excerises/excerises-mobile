import { Stack, useRouter } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ThemeProvider from "@/components/provider/theme-provider";
import Toast from "react-native-toast-message";
import { useEffect, useMemo, useState } from "react";
import { useToast, useToastConfig } from "@/hooks/use-toast";
import { useGetProfile } from "@/hooks/request/profile/use-get-profile";
import { useAuth } from "@/stores/auth-store";
import { useWelcome } from "@/hooks/use-welcome";
import { useRefreshToken } from "@/hooks/request/auth/use-refresh-token";
import { AxiosError } from "axios";
import { api } from "@/network/api";
import { useFillInfo } from "@/hooks/use-fill-info";

export default function RootLayout() {
  const queryClient = useMemo(() => {
    return new QueryClient();
  }, []);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RootLayoutStack />
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

function RootLayoutStack() {
  const [ready, setReady] = useState(false);

  const toastConfig = useToastConfig();

  const {
    query: { data: user, isPending, isError, isFetched, error },
  } = useGetProfile({ enabled: ready });
  const router = useRouter();
  const auth = useAuth();
  const toast = useToast();
  const { isWelcomed } = useWelcome();
  const { getToken: refreshToken } = useRefreshToken();
  const { isFillInfo } = useFillInfo();

  async function setRefreshToken() {
    const value = await refreshToken();
    if (value) {
      api.setRefreshToken(value);
    }
  }

  async function checkUserAndRedirect() {
    if (!ready) {
      return;
    }

    await new Promise((res) => setTimeout(res, 400));

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
          // router.replace("/home"); // NOTE: This is temporary solution to jail break auth.
          return;
        }
      }
    }

    if (!user || isError) {
      router.replace(errorRedirectTo);
      return;
    }

    auth.setUser(user.data);

    if (await isFillInfo()) {
      router.replace("/home");
    } else {
      router.replace("/profile");
    }
  }

  useEffect(() => {
    setRefreshToken().then(() => {
      setReady(true);
      checkUserAndRedirect();
    });
  }, []);

  useEffect(() => {
    checkUserAndRedirect();
  }, [user, isFetched]);

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      <Toast config={toastConfig} />
    </>
  );
}
