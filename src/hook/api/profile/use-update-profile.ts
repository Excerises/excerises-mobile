import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  UpdateProfileAuthRequest,
  UpdateProfileRequest,
} from "../../../../type/api/profile/update-profile";
import { api } from "@/network/api";
import { ApiResponse } from "../../../../type/common/api";
import { User } from "../../../../type/entity";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: async (req: UpdateProfileRequest) => {
      const res = await api.client.patch<ApiResponse<User>>("/profile", req);
      await queryClient.invalidateQueries({ queryKey: ["get-profile"] });

      return res.data;
    },
  });

  return { mutation };
}

export function useUpdateProfileAuth() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["update-profile-auth"],
    mutationFn: async (req: UpdateProfileAuthRequest) => {
      const res = await api.client.patch<ApiResponse<User>>(
        "/profile/auth",
        req,
      );
      await queryClient.invalidateQueries({ queryKey: ["get-profile"] });

      return res.data;
    },
  });

  return { mutation };
}
