import { NewsCard } from "@/component/news/news-card";
import {
  HomeScreen,
  HomeScreenTitle,
} from "@/component/screen/main/home-screen";
import { Text, View, Button } from "@/component/ui";
import { Fonts } from "@/constant/theme";
import { useThemeColor } from "@/hook/use-theme-color";
import { BellIcon, DumbbellIcon } from "lucide-react-native";
import { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { StatsBannerCard } from "@/component/home/stats-banner-card";
import { WeeklyActivityCard } from "@/component/home/weekly-activity-card";
import { NoRecordCard } from "@/component/common/no-record";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/auth-context";
import { useGetNews } from "@/hook/api/news/use-get-news";
import { SessionCard } from "@/component/fitness";
import { useGetLatestSessions } from "@/hook/api/session/use-get-session";

function SectionHeader({
  title,
  subtitle,
  onSeeAll,
}: {
  title: string;
  subtitle?: string;
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
      <View variant="ghost" style={{ gap: 2 }}>
        <Text weight="semibold" size="lg">
          {title}
        </Text>
        {subtitle && (
          <Text variant="muted" size="xs">
            {subtitle}
          </Text>
        )}
      </View>
      {onSeeAll && (
        <Pressable onPress={onSeeAll}>
          <Text variant="primary" size="sm" weight="semibold">
            See All
          </Text>
        </Pressable>
      )}
    </View>
  );
}

export default function Page() {
  const { user } = useAuth();
  const router = useRouter();
  const themeColor = useThemeColor();
  const {
    query: { data: newsData },
  } = useGetNews();
  const {
    query: { data: sessionsData },
  } = useGetLatestSessions();

  const firstName = user?.name.split(" ")[0] || "Warrior";

  return (
    <HomeScreen
      title={<HomeScreenTitle>Hi, {firstName} 👋</HomeScreenTitle>}
      actions={[
        {
          icon: <BellIcon color={themeColor.foreground} size={Fonts.size.xl} />,
        },
      ]}
    >
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <StatsBannerCard onPress={() => router.push("/session/new")} />

        <WeeklyActivityCard />

        <View variant="ghost" style={{ gap: 12 }}>
          <SectionHeader
            title="Recent Sessions"
            subtitle="Your latest workouts"
            onSeeAll={() => router.push("/home/report")}
          />
          {sessionsData && sessionsData.data.length == 0 ? (
            <NoRecordCard
              icon={DumbbellIcon}
              message="No sessions yet. Your first workout is waiting!"
              actions={
                <Button onPress={() => router.push("/session/new")}>
                  <Text
                    size="sm"
                    weight="semibold"
                    style={{ textTransform: "uppercase" }}
                  >
                    Start Workout
                  </Text>
                </Button>
              }
            />
          ) : (
            sessionsData?.data.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                onPress={() => router.push(`/session/${session.id}`)}
              />
            ))
          )}
        </View>

        <View variant="ghost" style={{ gap: 12 }}>
          <SectionHeader
            title="Latest News"
            subtitle="Tips & insights for your fitness journey"
          />
          {newsData && newsData.data.length == 0 ? (
            <NoRecordCard message="No latest news yet" />
          ) : (
            newsData?.data.map((news) => <NewsCard key={news.id} news={news} />)
          )}
        </View>
      </ScrollView>
    </HomeScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 20,
    paddingBottom: 24,
  },
  motivation: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
