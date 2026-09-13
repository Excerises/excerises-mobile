import UIButton from "@/components/ui/button";
import UIText from "@/components/ui/text";

import useThemeColor from "@/hooks/use-theme-color";

import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
} from "react-native";

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
          borderColor:
            themeColor.destructive,
        },
      ]}
    >

      <Image
        source={image}
        resizeMode="cover"
        style={styles.image}
      />


      <View style={styles.content}>

        <UIText style={styles.title}>
          {title}
        </UIText>


        <UIText style={styles.description}>
          {description}
        </UIText>


        <UIButton
          style={styles.button}
          label="Start Workout"
          variant="destructive"
          onPress={onPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 205,
    borderRadius: 7,
    overflow: "hidden",
    borderWidth: 1,
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

  content: {
    flex: 1,
    paddingHorizontal: 21,
    paddingTop: 18,
    paddingBottom: 14,
  },

  title: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#FFFFFF",
    lineHeight: 28,
    maxWidth: 220,
  },

  description: {
    fontSize: 17,
    color: "#FFFFFF",
    lineHeight: 21,
    marginTop: 5,
    maxWidth: 280,
  },

  button: {
    width: "100%",
    height: 51,
    marginTop: "auto",
    borderRadius: 7,
  },
});