import { Exercise } from "@/../type/entity";
import { useActiveSession } from "@/context/active-session-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

function parseExercises(raw?: string): Exercise[] {
  try {
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // ignore
  }
  return [];
}

export default function ActiveSessionIndex() {
  const router = useRouter();
  const { exercises, initSession } = useActiveSession();
  const { exercises: rawExercises } = useLocalSearchParams<{
    exercises?: string;
  }>();
  const [parsed] = useState<Exercise[]>(() => parseExercises(rawExercises));

  const list = parsed.length > 0 ? parsed : exercises;

  useEffect(() => {
    if (parsed.length > 0) {
      initSession(parsed);
    }

    if (list.length > 0) {
      const firstId = encodeURIComponent(String(list[0].id));
      router.replace(`/session/active/${firstId}`);
    } else {
      router.replace("/session/recommendations");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
