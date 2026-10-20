import { ActiveSessionProvider } from "@/context/active-session-context";
import { Slot } from "expo-router";

export default function ActiveSessionLayout() {
  return (
    <ActiveSessionProvider>
      <Slot />
    </ActiveSessionProvider>
  );
}
