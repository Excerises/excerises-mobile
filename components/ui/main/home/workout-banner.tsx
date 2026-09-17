import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";

import useThemeColor from "@/hooks/use-theme-color";

import UIButton from "@/components/ui/common/button";
import UIText from "@/components/ui/common/text";

type WorkoutBannerProps = {
  image: ImageSourcePropType;
  title: string;
  description: string;
  onPress?: () => void;
};

export default function WorkoutBanner({
  image,
  title,
  description,
  onPress,
}: WorkoutBannerProps) {
  const themeColor = useThemeColor();

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: themeColor.destructive,
        },
      ]}
    >
      <Image source={image} resizeMode="cover" style={styles.image} />

      <View style={styles.content}>
        <UIText
          style={[
            styles.title,
            {
              color: "#FFFFFF",
            },
          ]}
        >
          {title}
        </UIText>

        <UIText
          style={[
            styles.description,
            {
              color: "#FFFFFF",
            },
          ]}
        >
          {description}
        </UIText>

        <UIButton
          style={styles.button}
          label="Start Workout →"
          variant="primary"
          onPress={onPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 170,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 7,
    overflow: "hidden",
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

  content: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 12,
  },

  title: {
    maxWidth: 170,
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 27,
  },

  description: {
    maxWidth: 210,
    marginTop: 4,
    fontSize: 14,
    lineHeight: 17,
  },

  button: {
    width: 230,
    height: 40,
    marginTop: "auto",
    borderRadius: 6,
  },
});
