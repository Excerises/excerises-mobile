import { useRouter } from "expo-router";
import { Image, StyleSheet, useWindowDimensions, View } from "react-native";
import { useThemeContext } from "@/components/provider/theme-provider";
import ThemeToggler from "@/components/theme-toggler";
import UIButton from "@/components/ui/common/button";
import UIText from "@/components/ui/common/text";
import useThemeColor from "@/hooks/use-theme-color";
import { useWelcome } from "@/hooks/use-welcome";

export default function Page() {
  const router = useRouter();

  const { isWelcomed, markWelcomed } = useWelcome();
  const { height } = useWindowDimensions();

  const themeColor = useThemeColor();

  const { theme } = useThemeContext();

  async function handleNextStep() {
    if (await isWelcomed()) {
      router.replace("/login");
    } else {
      await markWelcomed();
      router.replace("/register");
    }
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeColor.background,
        },
      ]}
    >
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
            Smart{"\n"}Workout
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
              {
                color: themeColor.primary,
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
          style={styles.startButton}
          label="Started"
          variant="primary"
          labelStyle={styles.startButtonText}
          onPress={handleNextStep}
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
