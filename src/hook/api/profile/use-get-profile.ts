import { api } from "@/network/api";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../../../../type/common/api";
import { User } from "../../../../type/entity";

export function useGetProfile() {
  const query = useQuery({
    queryKey: ["get-profile"],
    queryFn: async () => {
      const res = await api.client.get<ApiResponse<User>>("/profile");

      return res.data;
    },
    retry: 1,
  });

  return { query };
}
