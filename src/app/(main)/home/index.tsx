import { ExerciseCard } from "@/component/fitness";
import {
  HomeScreen,
  HomeScreenTitle,
} from "@/component/screen/main/home-screen";
import { Text, View } from "@/component/ui";
import { Borders, Fonts } from "@/constant/theme";
import { useThemeColor } from "@/hook/use-theme-color";
import { BellIcon } from "lucide-react-native";
import { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";

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
  const themeColor = useThemeColor();

  return (
    <HomeScreen
      title={<HomeScreenTitle>Hi, Alfiansyah</HomeScreenTitle>}
      actions={[
        {
          icon: <BellIcon color={themeColor.foreground} size={Fonts.size.xl} />,
        },
      ]}
    >
      <ScrollView style={{ flex: 1 }}>
        <View variant="ghost" style={styles.container}>
          <View
            variant="card"
            style={{ height: 170, borderRadius: Borders.radius.xl }}
          ></View>
          <View variant="ghost" style={{ gap: 12 }}>
            <RecentItem title="Recent Activities" onSeeAll={() => {}} />
            {Array.from({ length: 2 }).map((_, i) => (
              <ExerciseCard
                key={i}
                exercise={{
                  id: i,
                  name: "Push-up",
                  body_part: "chest",
                  category: "strength",
                  description: "description",
                  difficulty: "beginner",
                  equipment: "band",
                  instruction: ["instruction 1", "instruction 2"],
                  secondary_muscles: [],
                  target: "abs",
                  created_at: "2024-01-01",
                  updated_at: "2024-01-01",
                }}
              />
            ))}
          </View>
          <View variant="ghost" style={{ gap: 12 }}>
            <RecentItem title="Recent News" onSeeAll={() => {}} />
            <View
              variant="card"
              style={{ height: 130, borderRadius: Borders.radius.lg }}
            ></View>
            <View
              variant="card"
              style={{ height: 130, borderRadius: Borders.radius.lg }}
            ></View>
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
