import { Image, Pressable, StyleSheet } from "react-native";
import { News } from "../../../type/entity";
import { Text, View } from "../ui";
import { Borders, Colors, Fonts } from "@/constant/theme";
import { EyeIcon } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

interface NewsCardProps {
  news: News;
  onPress?: () => void;
}

export function NewsCard({ news, onPress }: NewsCardProps) {
  return (
    <Pressable onPress={onPress}>
      <View variant="card" style={styles.card}>
        <Image
          src={
            news.image ||
            "https://i0.wp.com/systass.org/wp-content/uploads/2023/11/placeholder-2-1.png"
          }
          style={styles.img}
        />
        <LinearGradient
          colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.5)"]}
          style={styles.content}
        >
          <Text size="xl" weight="semibold" style={{ color: Colors.white }}>
            {news.title}
          </Text>
          <View
            style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
            variant="ghost"
          >
            <EyeIcon size={Fonts.size.xs} color={Colors.white} />
            <Text style={{ color: Colors.white }} size="xs">
              {news.viewed_count} viewed
            </Text>
          </View>
        </LinearGradient>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Borders.radius.lg,
    overflow: "hidden",
    position: "relative",
    height: 160,
  },
  img: {
    position: "relative",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  content: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    padding: 16,
    gap: 4,
  },
});
