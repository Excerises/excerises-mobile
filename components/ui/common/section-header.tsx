import type { ReactNode } from "react";

import { Pressable, StyleSheet, View } from "react-native";

import UIText from "./text";

type SectionHeaderProps = {
  title: string;
  right?: ReactNode;
  onPress?: () => void;
};

export default function SectionHeader({
  title,
  right,
  onPress,
}: SectionHeaderProps) {
  const content = (
    <>
      <UIText style={styles.title}>{title}</UIText>
      {right}
    </>
  );

  return onPress ? (
    <Pressable style={styles.container} onPress={onPress}>
      {content}
    </Pressable>
  ) : (
    <View style={styles.container}>{content}</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  title: {
    fontSize: 14,
    fontWeight: "600",
  },
});
