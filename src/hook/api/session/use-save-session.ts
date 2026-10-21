import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateSessionRequest } from "../../../../type/api/session/session";
import { api } from "@/network/api";
import { ApiResponse } from "../../../../type/common/api";
import { Session } from "../../../../type/entity";

export function useCreateSession() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["create-session"],
    mutationFn: async (req: CreateSessionRequest) => {
      const res = await api.client.post<ApiResponse<Session>>("/session", req);

      queryClient.invalidateQueries({
        queryKey: ["get-latest-sessions", "get-sessions"],
      });

      return res.data;
    },
  });

  return { mutation };
}
