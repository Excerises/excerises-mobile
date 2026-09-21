import { CalendarDays, ChevronRight } from "lucide-react-native";

import {
    Image,
    ImageSourcePropType,
    Pressable,
    StyleSheet,
    View,
} from "react-native";

import UIText from "@/components/ui/common/text";

import useThemeColor from "@/hooks/use-theme-color";

type NewsArticleCardProps = {
  image: ImageSourcePropType;
  title: string;
  description: string;
  date: string;
  onPress?: () => void;
};

export default function NewsArticleCard({
  image,
  title,
  description,
  date,
  onPress,
}: NewsArticleCardProps) {
  const themeColor = useThemeColor();

  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: themeColor.card,
          borderColor: themeColor.border,
        },
      ]}
      onPress={onPress}
    >
      <Image source={image} style={styles.image} />

      <View style={styles.content}>
        <UIText style={styles.title} numberOfLines={2}>
          {title}
        </UIText>

        <UIText variant="muted" style={styles.description} numberOfLines={2}>
          {description}
        </UIText>

        <View style={styles.dateRow}>
          <CalendarDays size={12} color={themeColor.mutedForeground} />

          <UIText variant="muted" style={styles.date}>
            {date}
          </UIText>
        </View>
      </View>

      <ChevronRight size={22} color={themeColor.foreground} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 82,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 7,
    overflow: "hidden",
    paddingRight: 8,
  },

  image: {
    width: 110,
    height: 82,
  },

  content: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },

  title: {
    fontSize: 11,
    fontWeight: "600",
    lineHeight: 14,
  },

  description: {
    fontSize: 9,
    lineHeight: 12,
    marginTop: 3,
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 5,
  },

  date: {
    fontSize: 8,
  },
});
