import { api } from "@/network/api";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../../../../type/common/api";
import { Session } from "../../../../type/entity";

export function useGetLatestSessions() {
  const query = useQuery({
    queryKey: ["get-latest-sessions"],
    queryFn: async () => {
      const res = await api.client.get<ApiResponse<Session[]>>("/session", {
        params: { limit: 3 },
      });
      return res.data;
    },
  });

  return { query };
}

export function useGetSessions({ limit }: { limit?: number } = {}) {
  const query = useQuery({
    queryKey: ["get-sessions", limit],
    queryFn: async () => {
      const res = await api.client.get<ApiResponse<Session[]>>("/session", {
        params: { limit },
      });
      return res.data;
    },
  });

  return { query };
}

export function useGetSession({ sessionId }: { sessionId?: any }) {
  const query = useQuery({
    queryKey: ["get-session", sessionId],
    queryFn: async () => {
      const res = await api.client.get<ApiResponse<Session>>(
        `/session/${sessionId}`,
      );
      return res.data;
    },
  });

  return { query };
}
