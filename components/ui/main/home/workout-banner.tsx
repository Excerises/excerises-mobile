import type { ImageSourcePropType } from "react-native";
import { Image, Pressable, StyleSheet, View } from "react-native";

import UIText from "@/components/ui/common/text";

import useThemeColor from "@/hooks/use-theme-color";

type WorkoutBannerProps = {
  image: ImageSourcePropType;
  title?: string;
  description: string;
  onPress?: () => void;
};

export default function WorkoutBanner({
  image,
  description,
  onPress,
}: WorkoutBannerProps) {
  const themeColor = useThemeColor();

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: themeColor.primary,
        },
      ]}
    >
      <Image source={image} resizeMode="cover" style={styles.image} />

      <View
        style={[
          styles.overlay,
          {
            backgroundColor: themeColor.overlay,
          },
        ]}
      />

      <View style={styles.content}>
        <View>
          <UIText
            style={[
              styles.title,
              {
                color: themeColor.white,
              },
            ]}
          >
            START YOUR
          </UIText>

          <UIText
            style={[
              styles.title,
              {
                color: themeColor.primary,
                marginTop: -2,
              },
            ]}
          >
            WORKOUT
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

        <Pressable
          onPress={onPress}
          style={[
            styles.button,
            {
              backgroundColor: themeColor.primary,
            },
          ]}
        >
          <UIText
            style={[
              styles.buttonText,
              {
                color: themeColor.black,
              },
            ]}
          >
            START WORKOUT
          </UIText>

          <UIText
            style={[
              styles.arrow,
              {
                color: themeColor.black,
              },
            ]}
          >
            →
          </UIText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 190,
    marginTop: 14,
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },

  image: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },

  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
    justifyContent: "space-between",
  },

  title: {
    fontSize: 25,
    fontWeight: "800",
    lineHeight: 27,
  },

  description: {
    maxWidth: 190,
    marginTop: 8,
    fontSize: 13,
    lineHeight: 17,
  },

  button: {
    width: 235,
    height: 42,
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  buttonText: {
    fontSize: 14,
    fontWeight: "700",
  },

  arrow: {
    fontSize: 20,
    lineHeight: 20,
  },
});
