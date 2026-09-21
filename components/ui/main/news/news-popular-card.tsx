import { Bookmark, Flame } from "lucide-react-native";

import {
    Image,
    ImageSourcePropType,
    Pressable,
    StyleSheet,
    View,
} from "react-native";

import UIText from "@/components/ui/common/text";

import useThemeColor from "@/hooks/use-theme-color";

type NewsPopularCardProps = {
  image: ImageSourcePropType;
  title: string;
  views: string;
  onPress?: () => void;
};

export default function NewsPopularCard({
  image,
  title,
  views,
  onPress,
}: NewsPopularCardProps) {
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

        <View style={styles.bottomRow}>
          <View style={styles.views}>
            <Flame
              size={12}
              color={themeColor.primary}
              fill={themeColor.primary}
            />

            <UIText variant="muted" style={styles.viewsText}>
              {views}
            </UIText>
          </View>

          <Bookmark size={15} color={themeColor.foreground} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "31.8%",
    borderWidth: 1,
    borderRadius: 6,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 82,
  },

  content: {
    padding: 7,
  },

  title: {
    fontSize: 9,
    fontWeight: "500",
    lineHeight: 12,
  },

  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },

  views: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  viewsText: {
    fontSize: 8,
  },
});
