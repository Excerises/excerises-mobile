import {
  HomeScreen,
  HomeScreenTitle,
} from "@/component/screen/main/home-screen";
import { Text, View } from "@/component/ui";
import { Borders, Colors } from "@/constant/theme";
import { useMemo } from "react";
import { Image, Pressable, ScrollView, StyleSheet } from "react-native";
import ExploreBanner from "@/assets/images/home/explore.jpg";

function CategoryItem({
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
  return (
    <HomeScreen title={<HomeScreenTitle>Explore</HomeScreenTitle>}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View variant="ghost" style={styles.container}>
          <View variant="ghost" style={styles.banner}>
            <Image style={styles.bannerImg} source={ExploreBanner} />
            <View variant="ghost" style={styles.bannerMask}>
              <Text
                variant="primary"
                size="xl2"
                weight="bold"
                style={{ textTransform: "uppercase" }}
              >
                Start Moving Today
              </Text>
              <Text size="sm" style={{ color: Colors.white, marginTop: 5 }}>
                Discover workouts designed by fitness experts {"\n"}to help you
                reach your goals.
              </Text>
            </View>
          </View>
          {["Building", "Stretch"].map((title) => (
            <View key={title} variant="ghost" style={styles.category}>
              <CategoryItem title={title} />
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View variant="ghost" style={{ flexDirection: "row", gap: 14 }}>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <View
                      key={i}
                      variant="card"
                      style={{
                        height: 140,
                        width: 180,
                        borderRadius: Borders.radius.lg,
                      }}
                    ></View>
                  ))}
                </View>
              </ScrollView>
            </View>
          ))}

          <View variant="ghost" style={styles.category}>
            <CategoryItem title="Challenge" />
            <View
              variant="card"
              style={{ height: 150, borderRadius: Borders.radius.lg }}
            ></View>
          </View>
        </View>
      </ScrollView>
    </HomeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
  banner: {
    height: 190,
    borderRadius: Borders.radius.xl,
    overflow: "hidden",
    position: "relative",
  },
  bannerImg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  bannerMask: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 24,
  },
  category: {
    gap: 12,
  },
});
