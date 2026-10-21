import { api } from "@/network/api";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../../../../type/common/api";
import { News } from "../../../../type/entity";

export function useGetNews() {
  const query = useQuery({
    queryKey: ["get-news"],
    queryFn: async () => {
      const res = await api.client.get<ApiResponse<News[]>>("/news");
      return res.data;
    },
  });

  return { query };
}

export function useGetNewsDetail({ newsId }: { newsId?: any }) {
  const query = useQuery({
    queryKey: ["get-news", newsId],
    queryFn: async () => {
      const res = await api.client.get<ApiResponse<News>>(`/news/${newsId}`);
      return res.data;
    },
    enabled: !!newsId,
  });

  return { query };
}
