import { ProfilingProvider } from "@/components/provider/onboarding/profiling-provider";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <ProfilingProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ProfilingProvider>
  );
}
