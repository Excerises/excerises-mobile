import { asyncStorage, STORAGE_KEYS } from "@/constant/data/storage";
import { useAuth } from "@/context/auth-context";
import { usePathname, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";

export function useAppEntry() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoaded } = useAuth();

  const [isReady, setIsReady] = useState(false);
  const hasResolvedRef = useRef(false);

  useEffect(() => {
    if (!isLoaded || hasResolvedRef.current) {
      return;
    }

    hasResolvedRef.current = true;

    function redirectTo(to: any) {
      if (pathname !== to) {
        router.replace(to);
      }
    }

    async function resolve() {
      setIsReady(false);

      try {
        const hasOpenedApp = await asyncStorage.getItem(
          STORAGE_KEYS.hasOpenedApp,
        );

        if (user?.id) {
          if (user?.profile) {
            redirectTo("/home");
          } else {
            redirectTo("/onboarding");
          }
          return;
        }

        if (hasOpenedApp !== null) {
          redirectTo("/login");
          return;
        }

        await asyncStorage.setItem(STORAGE_KEYS.hasOpenedApp, "true");
      } finally {
        setIsReady(true);
      }
    }

    resolve();
  }, [isLoaded, pathname, user?.id]);

  return { isReady };
}
