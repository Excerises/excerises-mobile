import type { ReactNode } from "react";

import { StyleSheet } from "react-native";

import UIText from "./text";

type StepHeaderProps = {
  title: string;
  subtitle: ReactNode;
  subtitleVariant?: "default" | "muted" | "link";
  subtitleLineHeight?: number;
};

export default function StepHeader({
  title,
  subtitle,
  subtitleVariant = "default",
  subtitleLineHeight,
}: StepHeaderProps) {
  return (
    <>
      <UIText style={styles.title}>{title}</UIText>
      <UIText
        variant={subtitleVariant}
        style={[
          styles.subtitle,
          subtitleLineHeight !== undefined && {
            lineHeight: subtitleLineHeight,
          },
        ]}
      >
        {subtitle}
      </UIText>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },
});
