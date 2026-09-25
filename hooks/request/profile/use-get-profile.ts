import { api } from "@/network/api";
import { ApiResponse } from "@/types/common/api";
import { User } from "@/types/entity";
import { useQuery } from "@tanstack/react-query";

interface GetProfileProps {
  enabled?: boolean;
}

export function useGetProfile(props?: GetProfileProps) {
  const query = useQuery({
    queryKey: ["get-profile"],
    queryFn: async () => {
      const res = await api.client.get<ApiResponse<User>>("/profile");
      return res.data;
    },
    enabled: props?.enabled,
    retry: false,
    networkMode: "online",
  });

  return {
    query,
  };
}
