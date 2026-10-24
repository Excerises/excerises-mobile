import { NoRecord } from "@/component/common/no-record";
import { NewsCard } from "@/component/news/news-card";
import {
  HomeScreen,
  HomeScreenTitle,
} from "@/component/screen/main/home-screen";
import { Text } from "@/component/ui";
import { useGetNews } from "@/hook/api/news/use-get-news";
import { useRouter } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function Page() {
  const { query: newsQuery } = useGetNews();
  const router = useRouter();

  return (
    <HomeScreen title={<HomeScreenTitle>News List</HomeScreenTitle>} canBack>
      {newsQuery.isLoading ? (
        <View style={[styles.container, styles.center]}>
          <ActivityIndicator />
        </View>
      ) : newsQuery.data && newsQuery.data.data.length > 0 ? (
        <>
          <View style={styles.info}>
            <Text variant="muted">
              Showing {newsQuery.data.data.length} news list data.
            </Text>
          </View>
          <View style={styles.container}>
            {newsQuery.data.data.map((news) => (
              <NewsCard
                key={news.id}
                news={news}
                onPress={() => router.push(`/news/${news.id}`)}
              />
            ))}
          </View>
        </>
      ) : (
        <View style={[styles.container, styles.center]}>
          <NoRecord message="No news found yet." />
        </View>
      )}
    </HomeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    marginBottom: 8,
  },
});
