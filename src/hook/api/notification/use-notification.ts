import { api } from "@/network/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../../../../type/common/api";
import { Notification } from "../../../../type/entity/notificaton";

export function useGetNotifications() {
  const query = useQuery({
    queryKey: ["get-notifications"],
    queryFn: async () => {
      const res =
        await api.client.get<ApiResponse<Notification>>("/notifications");
      return res.data;
    },
  });

  return { query };
}

export function useReadNotification() {
  const mutation = useMutation({
    mutationKey: ["read-notification"],
    mutationFn: async ({ notificationId }: { notificationId: any }) => {
      const res = await api.client.post(`/notifications/${notificationId}`);
      return res.data;
    },
  });

  return { mutation };
}

export function useDeleteNotification() {
  const mutation = useMutation({
    mutationKey: ["delete-notification"],
    mutationFn: async ({ notificationId }: { notificationId: any }) => {
      const res = await api.client.delete(`/notifications/${notificationId}`);
      return res.data;
    },
  });

  return { mutation };
}

export function useGetCountUnreadNotification() {
  const query = useQuery({
    queryKey: ["get-count-unread-notification"],
    queryFn: async () => {
      const res = await api.client.get<ApiResponse<number>>(
        "/notifications/unread-count",
      );
      return res.data;
    },
  });

  return { query };
}
