import { Image, Pressable, StyleSheet } from "react-native";
import { News } from "../../../type/entity";
import { Text, View } from "../ui";
import { Borders, Colors, Fonts } from "@/constant/theme";
import { CalendarIcon, EyeIcon } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { formatDate } from "@/utils/common/format";

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
          <View style={[styles.itemRow, { gap: 12 }]} variant="ghost">
            {[
              { label: formatDate(news.created_at), icon: CalendarIcon },
              { label: `${news.viewed_count} viewed`, icon: EyeIcon },
            ].map((info, i) => (
              <View style={styles.itemRow} variant="ghost" key={i}>
                <info.icon size={Fonts.size.xs} color={Colors.white} />
                <Text style={{ color: Colors.white }} size="xs">
                  {info.label}
                </Text>
              </View>
            ))}
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
  itemRow: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
});
