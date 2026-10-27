import { asyncStorage, STORAGE_KEYS } from "@/constant/data/storage";
import { useAuth } from "@/context/auth-context";
import { usePathname, useRouter } from "expo-router";
import { useEffect, useState } from "react";

export function useAppEntry() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoaded } = useAuth();

  const [isReady, setIsReady] = useState(false);

  function redirectTo(to: any) {
    if (pathname !== to) {
      router.replace(to);
    }
  }

  async function resolve() {
    try {
      const hasOpenedApp = await asyncStorage.getItem(
        STORAGE_KEYS.hasOpenedApp,
      );

      const inPublicRoute = ["/", "/login", "/register"].includes(pathname);

      if (user && inPublicRoute) {
        if (user?.profile) {
          redirectTo("/home");
          return;
        } else {
          redirectTo("/onboarding");
          return;
        }
      }

      if (hasOpenedApp !== null && !user) {
        redirectTo("/login");
        return;
      }

      await asyncStorage.setItem(STORAGE_KEYS.hasOpenedApp, "true");
    } finally {
      setIsReady(true);
    }
  }

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    resolve();
  }, [isLoaded, pathname, user]);

  return { isReady };
}
