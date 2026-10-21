import { NewsCard } from "@/component/news/news-card";
import {
  HomeScreen,
  HomeScreenTitle,
} from "@/component/screen/main/home-screen";
import { Text, View } from "@/component/ui";
import { Fonts } from "@/constant/theme";
import { useThemeColor } from "@/hook/use-theme-color";
import {
  AwardIcon,
  BellIcon,
  ClockIcon,
  DumbbellIcon,
  FlameIcon,
} from "lucide-react-native";
import { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { StatsBannerCard } from "@/component/home/stats-banner-card";
import { WeeklyActivityCard } from "@/component/home/weekly-activity-card";
import { NoRecordCard } from "@/component/common/no-record";
import { Button } from "@/component/ui";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/auth-context";

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
        </View>

        <View variant="ghost" style={{ gap: 12 }}>
          <SectionHeader
            title="Latest News"
            subtitle="Tips & insights for your fitness journey"
          />
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
