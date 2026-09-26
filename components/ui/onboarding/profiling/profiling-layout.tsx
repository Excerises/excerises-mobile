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
}

export function ProfilingLayout({
  title,
  description,
  children,
  onContinue,
  continueText,
  continueDisabled,
}: ProfilingLayoutProps) {
  return (
    <UIView style={styles.container}>
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
});
