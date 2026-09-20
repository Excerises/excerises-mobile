import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";

import UIText from "@/components/ui/common/text";
import useThemeColor from "@/hooks/use-theme-color";

type NewsHeroCardProps = {
  image: ImageSourcePropType;
  title: string;
  description: string;
};

export default function NewsHeroCard({
  image,
  title,
  description,
}: NewsHeroCardProps) {
  const themeColor = useThemeColor();

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: themeColor.border,
        },
      ]}
    >
      <Image source={image} style={styles.image} />

      <View
        style={[
          styles.overlay,
          {
            backgroundColor: themeColor.overlay,
          },
        ]}
      />

      <View style={styles.content}>
        <UIText
          style={[
            styles.title,
            {
              color: themeColor.white,
            },
          ]}
        >
          {title}
        </UIText>

        <UIText
          style={[
            styles.description,
            {
              color: themeColor.white,
            },
          ]}
        >
          {description}
        </UIText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 145,
    borderWidth: 1,
    borderRadius: 7,
    overflow: "hidden",
    position: "relative",
  },

  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingVertical: 14,
  },

  title: {
    width: 170,
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 27,
  },

  description: {
    width: 150,
    fontSize: 11,
    lineHeight: 15,
    marginTop: 10,
  },
});
