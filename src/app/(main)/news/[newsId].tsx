import { NoRecordCard } from "@/component/common/no-record";
import {
  HomeScreen,
  HomeScreenTitle,
} from "@/component/screen/main/home-screen";
import { Text, View } from "@/component/ui";
import { Fonts } from "@/constant/theme";
import { useGetNewsDetail } from "@/hook/api/news/use-get-news";
import { useThemeColor } from "@/hook/use-theme-color";
import { News } from "../../../../type/entity";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeftIcon,
  CalendarIcon,
  EyeIcon,
  NewspaperIcon,
} from "lucide-react-native";
import moment from "moment";
import { ActivityIndicator, Image, ScrollView, StyleSheet } from "react-native";

function stripHtml(content: string): string {
  return content.replace(/<[^>]*>/g, "").trim();
}

export default function Page() {
  const router = useRouter();
  const colors = useThemeColor();
  const { newsId } = useLocalSearchParams<{ newsId: string }>();
  const {
    query: { data, isLoading },
  } = useGetNewsDetail({ newsId });

  const news: News | undefined = data?.data;

  return (
    <HomeScreen
      title={<HomeScreenTitle>News Detail</HomeScreenTitle>}
      actions={[
        {
          icon: (
            <ArrowLeftIcon size={Fonts.size.xl} color={colors.foreground} />
          ),
          onTap: () => router.back(),
        },
      ]}
    >
      {isLoading ? (
        <View variant="ghost" style={styles.center}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : !news ? (
        <NoRecordCard icon={NewspaperIcon} message="News not found" />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <Image
            src={
              news.image ||
              "https://i0.wp.com/systass.org/wp-content/uploads/2023/11/placeholder-2-1.png"
            }
            style={styles.cover}
          />

          <View variant="ghost" style={{ gap: 8 }}>
            <Text weight="semibold" size="xl">
              {news.title}
            </Text>

            <View variant="ghost" style={styles.metaRow}>
              <View variant="ghost" style={styles.metaItem}>
                <CalendarIcon
                  size={Fonts.size.xs}
                  color={colors.mutedForeground}
                />
                <Text size="xs" variant="muted">
                  {moment(news.created_at).format("DD MMMM YYYY, HH:mm")}
                </Text>
              </View>
              <View variant="ghost" style={styles.metaItem}>
                <EyeIcon size={Fonts.size.xs} color={colors.mutedForeground} />
                <Text size="xs" variant="muted">
                  {news.viewed_count} viewed
                </Text>
              </View>
            </View>

            {news.description && (
              <Text size="sm" variant="muted">
                {news.description}
              </Text>
            )}
          </View>

          <Text size="sm">{stripHtml(news.content)}</Text>
        </ScrollView>
      )}
    </HomeScreen>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    gap: 16,
    paddingBottom: 24,
  },
  cover: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    objectFit: "cover",
  },
  metaRow: {
    flexDirection: "row",
    gap: 16,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
