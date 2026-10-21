import { api } from "@/network/api";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../../../../type/common/api";
import { User } from "../../../../type/entity";
import { useAuth } from "@/context/auth-context";

export function useGetProfile() {
  const { setUser } = useAuth();

  const query = useQuery({
    queryKey: ["get-profile"],
    queryFn: async () => {
      const res = await api.client.get<ApiResponse<User>>("/profile");

      setUser(res.data.data);

      return res.data;
    },
  });

  return { query };
}
