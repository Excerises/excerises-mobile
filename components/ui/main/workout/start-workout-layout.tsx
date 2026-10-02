import { ReactNode } from "react";
import UIView from "../../common/view";
import UIText from "../../common/text";
import { StyleSheet } from "react-native";

export interface StartWorkoutLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function StartWorkoutLayout({
  title,
  description,
  children,
}: StartWorkoutLayoutProps) {
  return (
    <UIView style={styles.container}>
      <UIView>
        <UIText style={styles.header}>{title}</UIText>
        <UIText variant="muted" style={styles.description}>
          {description}
        </UIText>
      </UIView>
      {children}
    </UIView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
  },
  description: {
    fontSize: 18,
  },
});
