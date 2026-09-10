import { useThemeContext } from "@/components/provider/theme-provider";
import useThemeColor from "@/hooks/use-theme-color";
import ThemeToggler from "@/components/theme-toggler";

import UIButton from "@/components/ui/button";
import UIText from "@/components/ui/text";

import { useRouter } from "expo-router";

import {
  Image,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";

export default function Page() {
  const router = useRouter();

  const { height } = useWindowDimensions();

  const themeColor = useThemeColor();
  const { theme } = useThemeContext();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeColor.background,
        },
      ]}
    >

      <View style={styles.themeToggle}>
        <ThemeToggler
          color={themeColor.foreground}
        />
      </View>

      <Image
        source={
          theme === "dark"
            ? require("@/assets/images/workout-dark.jpeg")
            : require("@/assets/images/workout-light.jpeg")
        }
        resizeMode="cover"
        style={[
          styles.heroImage,
          {
            height: height * 0.35,
          },
        ]}
      />
      
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <UIText
            style={[
              styles.title,
              {
                color: themeColor.foreground,
              },
            ]}
          >
            Smart
          </UIText>

          <UIText
            style={[
              styles.title,
              {
                color: themeColor.foreground,
              },
            ]}
          >
            Workout
          </UIText>

          <UIText
            style={[
              styles.title,
              styles.lightText,
              {
                color: themeColor.mutedForeground,
              },
            ]}
          >
            For a Better
          </UIText>

          <UIText
            style={[
              styles.title,
              styles.youText,
              {
                color: themeColor.destructive,
              },
            ]}
          >
            You
          </UIText>
        </View>

        <UIText
          style={[
            styles.description,
            {
              color: themeColor.mutedForeground,
            },
          ]}
        >
          Get workout recommendations
          {"\n"}tailored to your needs
          {"\n"}using AI.
        </UIText>

        <UIButton
          style={[
            styles.startButton,
            {
              backgroundColor: themeColor.destructive,
            },
          ]}
          label="Started"
          labelStyle={styles.startButtonText}
          onPress={() => router.push("/login")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  themeToggle: {
    position: "absolute",
    top: 55,
    right: 20,
    zIndex: 10,
  },

  heroImage: {
    width: "100%",
    marginTop: 50,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  titleContainer: {
    gap: 0,
  },

  title: {
    fontSize: 36,
    lineHeight: 36,
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  lightText: {
    fontWeight: "400",
  },

  youText: {},

  description: {
    fontSize: 18,
    lineHeight: 20,
    marginTop: 16,
  },

  startButton: {
    width: "100%",
    height: 50,
    marginTop: 60,
  },

  startButtonText: {
    fontWeight: "bold",
  },
});