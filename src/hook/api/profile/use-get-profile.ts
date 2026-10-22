import { api } from "@/network/api";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../../../../type/common/api";
import { User } from "../../../../type/entity";
import { ProfileProgressResponse } from "../../../../type/api/profile/profile-progress";

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

export function useGetProfileProgress() {
  const query = useQuery({
    queryKey: ['get-profile-progress'],
    queryFn: async () => {
      const res= await api.client.get<ApiResponse<ProfileProgressResponse>>('/profile/progress');
      return res.data;
    }
  })

  return { query }
}
