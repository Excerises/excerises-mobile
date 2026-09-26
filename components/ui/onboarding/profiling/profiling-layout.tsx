import React from "react";
import { StyleSheet, Text, View } from "react-native";
import UIText from "../../common/text";
import UIView from "../../common/view";
import UIButton from "../../common/button";
import { SafeAreaView } from "react-native-safe-area-context";

export interface ProfilingLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  onContinue?: () => void;
  continueText?: string;
  continueDisabled?: boolean;
  currentStep?: number;
}

export function ProfilingLayout({
  currentStep = 1,
  title,
  description,
  children,
  onContinue,
  continueText,
  continueDisabled,
}: ProfilingLayoutProps) {
  const countSteps = 5;

  return (
    <UIView style={styles.container}>
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <View style={{ flexDirection: "row", gap: 5, flex: 1 }}>
          {Array.from({ length: countSteps }).map((_, i) => (
            <UIView
              variant={currentStep > i ? "primary" : "card"}
              key={i}
              style={styles.step}
            ></UIView>
          ))}
        </View>
        <UIText variant="muted">
          {currentStep}/{countSteps}
        </UIText>
      </View>

      <View>
        <UIText style={styles.title}>{title}</UIText>
        <UIText variant="muted" style={styles.description}>
          {description}
        </UIText>
      </View>

      {children}

      <SafeAreaView edges={["bottom"]}>
        <UIButton
          onPress={onContinue}
          label={continueText || "Continue"}
          variant="primary"
          disabled={continueDisabled}
        />
      </SafeAreaView>
    </UIView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    gap: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
  },
  step: {
    height: 7,
    borderRadius: 9999,
    flex: 1,
  },
});
