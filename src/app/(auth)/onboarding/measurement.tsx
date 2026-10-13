import { Button, Text, View } from "@/component/ui";
import { Borders, Fonts } from "@/constant/theme";
import { fitnessLevels } from "@/constant/fitness/fitness-levels";
import { useThemeColor } from "@/hook/use-theme-color";
import {
  BrainIcon,
  CircleCheckBigIcon,
  LoaderIcon,
  TrophyIcon,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { Animated, StyleSheet, useWindowDimensions } from "react-native";
import * as Progress from "react-native-progress";

const steps = [
  "Analyzing your age",
  "Measuring your Body Mass Index (BMI)",
  "Reviewing your workout routine",
  "Calculating your fitness level",
];

const MOCK_FITNESS_LEVEL = "Intermediate";

function LoadingBrain() {
  const themeColor = useThemeColor();
  const rotateValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  function getStyle({ size, flipped }: { size: number; flipped?: boolean }) {
    return {
      height: size,
      width: size,
      borderColor: themeColor.primary,
      borderRightColor: "transparent",
      transform: [
        {
          rotate: rotateValue.interpolate({
            inputRange: [0, 1],
            outputRange: flipped ? ["360deg", "0deg"] : ["0deg", "360deg"],
          }),
        },
      ],
    };
  }

  return (
    <View style={styles.circleLoaderContainer} variant="ghost">
      <Animated.View
        style={[styles.circleLoader, getStyle({ size: 140, flipped: true })]}
      />
      <Animated.View style={[styles.circleLoader, getStyle({ size: 120 })]} />
      <Animated.View
        style={[styles.circleLoader, getStyle({ size: 100, flipped: true })]}
      />
      <Animated.View
        style={{
          transform: [
            {
              rotate: rotateValue.interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", "360deg"],
              }),
            },
          ],
        }}
      >
        <BrainIcon size={Fonts.size.xl6} color={themeColor.primary} />
      </Animated.View>
    </View>
  );
}

export default function Page() {
  const themeColor = useThemeColor();
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const { width } = useWindowDimensions();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => p + 0.0125);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (progress >= 1) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoading(false);
    }
  }, [progress]);

  if (isLoading) {
    return (
      <View variant="ghost" style={styles.container}>
        <LoadingBrain />
        <Text variant="muted">Measuring your fitness level...</Text>
        <Progress.Bar
          progress={progress}
          width={(width * 2) / 3}
          color={themeColor.primary}
          borderColor={themeColor.border}
        />
        <View
          variant="ghost"
          style={[styles.stepFlex, { width: (width * 2) / 3 }]}
        >
          {steps.map((step, i) => {
            const isCompleted = i < Math.ceil(progress * steps.length);

            return (
              <View style={styles.stepItem} key={i}>
                {isCompleted ? (
                  <CircleCheckBigIcon
                    color={themeColor.primary}
                    size={Fonts.size.md}
                  />
                ) : (
                  <LoaderIcon
                    color={themeColor.mutedForeground}
                    size={Fonts.size.md}
                  />
                )}
                <Text size="sm" variant={isCompleted ? "default" : "muted"}>
                  {step}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  }

  const fitnessLevel =
    fitnessLevels.find((l) => l.name === MOCK_FITNESS_LEVEL) ??
    fitnessLevels[0];

  return (
    <View variant="ghost" style={styles.container}>
      <TrophyIcon size={Fonts.size.xl6} color={fitnessLevel.color} />
      <View variant="ghost" style={styles.resultValue}>
        <Text variant="muted">Your Fitness Level</Text>
        <Text weight="bold" size="xl5" style={{ color: fitnessLevel.color }}>
          {fitnessLevel.name}
        </Text>
      </View>
      <Text variant="muted" style={styles.resultDescription}>
        {fitnessLevel.description}
      </Text>
      <View variant="card" style={styles.levelsCard}>
        <Text weight="semibold">Fitness Levels</Text>
        <View variant="ghost" style={styles.levelsList}>
          {fitnessLevels.map((level) => {
            const isCurrent = level.name === MOCK_FITNESS_LEVEL;

            return (
              <View variant="ghost" style={styles.levelItem} key={level.name}>
                <View
                  variant="ghost"
                  style={[styles.levelDot, { backgroundColor: level.color }]}
                />
                <Text size="sm" weight={isCurrent ? "semibold" : "normal"}>
                  {level.name}
                </Text>
                {isCurrent && (
                  <Text size="sm" variant="muted">
                    — Your level
                  </Text>
                )}
              </View>
            );
          })}
        </View>
      </View>
      <Button full size="lg">
        <Text weight="semibold">Get Started</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
  stepFlex: {
    gap: 8,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  circleLoader: {
    borderRadius: 9999,
    borderWidth: 2,
    position: "absolute",
  },
  circleLoaderContainer: {
    marginBottom: 20,
    height: 140,
    width: 140,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  resultValue: {
    alignItems: "center",
  },
  resultDescription: {
    textAlign: "center",
  },
  levelsCard: {
    padding: 16,
    borderRadius: Borders.radius.lg,
    gap: 10,
    alignSelf: "stretch",
  },
  levelsList: {
    gap: 4,
  },
  levelItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  levelDot: {
    height: 8,
    width: 8,
    borderRadius: 9999,
  },
});
