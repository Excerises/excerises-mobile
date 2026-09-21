import { useRouter } from "expo-router";

import { useEffect, useState } from "react";

import { StyleSheet, View } from "react-native";

import { fitnessResult } from "@/components/data/onboarding-data";

import UIButton from "@/components/ui/common/button";

import UIText from "@/components/ui/common/text";

import AILoader from "@/components/ui/onboarding/result/ai-loader";

import CompleteIllustration from "@/components/ui/onboarding/result/complete-illustration";

import FitnessLevelCard from "@/components/ui/onboarding/result/fitness-level-card";

import ProgressBar from "@/components/ui/onboarding/result/progress-bar";

import ProgressItem from "@/components/ui/onboarding/result/progress-item";

import useThemeColor from "@/hooks/use-theme-color";

export default function Result() {
  const router = useRouter();
  const themeColor = useThemeColor();

  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  const goToHome = () => {
    router.replace("/home");
  };

  useEffect(() => {
    if (isComplete) {
      return;
    }

    const interval = setInterval(() => {
      setProgress((currentProgress) => {
        if (currentProgress >= 100) {
          return 100;
        }

        return currentProgress + 2;
      });
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [isComplete]);

  useEffect(() => {
    if (progress < 100) {
      return;
    }

    const timeout = setTimeout(() => {
      setIsComplete(true);
    }, 700);

    return () => {
      clearTimeout(timeout);
    };
  }, [progress]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeColor.background,
        },
      ]}
    >
      {!isComplete ? (
        <>
          <AILoader color={themeColor.primary} />

          <UIText style={styles.title}>Analyzing Your Data</UIText>

          <UIText style={styles.description}>
            Our AI is processing your information
            {"\n"}
            to find the personalized workout plan
            {"\n"}
            and fitness level for you.
          </UIText>

          <View style={styles.progressContainer}>
            <ProgressItem
              completed={progress >= 25}
              text="Calculating your BMI"
              color={themeColor.primary}
            />

            <ProgressItem
              completed={progress >= 50}
              text="Analyzing workout preferences"
              color={themeColor.primary}
            />

            <ProgressItem
              completed={progress >= 75}
              text="Determining fitness level"
              color={themeColor.primary}
            />

            <ProgressItem
              completed={progress >= 100}
              text="Generating recommendations"
              color={themeColor.primary}
            />
          </View>

          <ProgressBar progress={progress} color={themeColor.primary} />

          <UIText style={styles.progressText}>
            {progress >= 100 ? "Complete!" : "Almost there..."}
          </UIText>
        </>
      ) : (
        <>
          <CompleteIllustration color={themeColor.primary} />

          <UIText style={styles.title}>You&apos;re All Set!</UIText>

          <UIText style={styles.description}>
            Your profile has been saved
            {"\n"}
            and your personalized workout plan
            {"\n"}
            is ready.
          </UIText>

          <FitnessLevelCard
            level={fitnessResult.level}
            description={fitnessResult.description}
            backgroundColor={themeColor.card}
            foregroundColor={themeColor.foreground}
          />

          <UIButton
            style={styles.mainButton}
            label="Go to Home"
            variant="primary"
            onPress={goToHome}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 20,
  },

  progressContainer: {
    width: "100%",
    marginTop: 22,
    gap: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },

  description: {
    fontSize: 13,
    textAlign: "center",
    lineHeight: 16,
    marginTop: 8,
  },

  progressText: {
    fontSize: 13,
    marginTop: 10,
    opacity: 0.7,
  },

  mainButton: {
    width: "100%",
    height: 48,
    marginTop: 30,
    borderRadius: 6,
  },
});
