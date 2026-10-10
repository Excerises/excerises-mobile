import { ReactNode } from "react";
import { Button, Text, View } from "../ui";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type OnboardingScreenProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function OnboardingScreen({
  children,
  title,
  description,
}: OnboardingScreenProps) {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.flex} edges={["top", "bottom"]}>
        <View variant="ghost" style={{ height: 20 }}></View>
        <View variant="ghost">
          <Text size="xl3" weight="bold">
            {title}
          </Text>
          <Text variant="muted">{description}</Text>
        </View>
        <View variant="ghost" style={styles.content}>
          {children}
        </View>
        <Button full size="lg">
          <Text weight="semibold"> Continue</Text>
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
    gap: 24,
  },
  content: {
    flex: 1,
  },
});
