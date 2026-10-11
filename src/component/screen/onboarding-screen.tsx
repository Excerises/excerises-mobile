import { ReactNode } from "react";
import { Button, Text, View } from "../ui";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useOnboarding } from "@/context/onboarding-context";

export type OnboardingScreenProps = {
  title: string;
  description: string;
  children: ReactNode;
  steps?: number;
  onContinue?: () => void;
  continueText?: string;
};

export function OnboardingScreen({
  children,
  title,
  description,
  steps = 4,
  onContinue,
  continueText = "Continue",
}: OnboardingScreenProps) {
  const { step } = useOnboarding();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.flex} edges={["top", "bottom"]}>
        <View variant="ghost" style={styles.stepFlex}>
          {Array.from({ length: steps }).map((_, i) => (
            <View
              key={i}
              variant={step >= i + 1 ? "primary" : "card"}
              style={styles.step}
            ></View>
          ))}
        </View>
        <View variant="ghost">
          <Text size="xl3" weight="bold">
            {title}
          </Text>
          <Text variant="muted">{description}</Text>
        </View>
        <View variant="ghost" style={styles.content}>
          {children}
        </View>
        <Button full size="lg" onPress={onContinue}>
          <Text weight="semibold">{continueText}</Text>
        </Button>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
  },
  flex: {
    gap: 30,
  },
  content: {
    flex: 1,
  },
  stepFlex: {
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
    height: 30,
    width: "65%",
    marginHorizontal: "auto",
  },
  step: {
    height: 8,
    flex: 1,
    borderRadius: 9999,
  },
});
