import { NewsCard } from "@/component/news/news-card";
import {
  HomeScreen,
  HomeScreenTitle,
} from "@/component/screen/main/home-screen";
import { Text, View } from "@/component/ui";
import { Fonts } from "@/constant/theme";
import { useThemeColor } from "@/hook/use-theme-color";
import { BellIcon } from "lucide-react-native";
import { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { StatsBannerCard } from "@/component/home/stats-banner-card";
import { NoRecordCard } from "@/component/common/no-record";
import { useRouter } from "expo-router";

function RecentItem({
  title,
  onSeeAll,
}: {
  title: string;
  onSeeAll?: () => void;
}) {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        row: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        },
      }),
    [],
  );

  return (
    <View variant="ghost" style={styles.row}>
      <Text weight="semibold" size="lg">
        {title}
      </Text>
      {onSeeAll && (
        <Pressable onPress={onSeeAll}>
          <Text variant="primary" size="sm">
            See All
          </Text>
        </Pressable>
      )}
    </View>
  );
}

export default function Page() {
  const router = useRouter();
  const themeColor = useThemeColor();

  return (
    <HomeScreen
      title={<HomeScreenTitle>Hi, Alfiansyah 👋</HomeScreenTitle>}
      actions={[
        {
          icon: <BellIcon color={themeColor.foreground} size={Fonts.size.xl} />,
        },
      ]}
    >
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View variant="ghost" style={styles.container}>
          <StatsBannerCard onPress={() => router.push("/session/new")} />
          <View variant="ghost" style={{ gap: 12 }}>
            <RecentItem
              title="Recent Sessions"
              onSeeAll={() => {
                router.push("/home/report");
              }}
            />
            <NoRecordCard message="No recent sessions" />
          </View>
          <View variant="ghost" style={{ gap: 12 }}>
            <RecentItem title="Recent News" onSeeAll={() => {}} />
            {Array.from({ length: 2 }).map((_, i) => (
              <NewsCard
                key={i}
                news={{
                  id: i,
                  title: "Good Food",
                  content: "",
                  created_at: "2024-01-01",
                  updated_at: "2024-01-01",
                  created_by_id: "1",
                  viewed_count: 0,
                }}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </HomeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
});
