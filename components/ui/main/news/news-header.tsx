import { StyleSheet, View } from "react-native";

import UIText from "@/components/ui/common/text";
import HeaderActions from "@/components/ui/main/header-actions";

type NewsHeaderProps = {
  onSearchPress?: () => void;
  onNotificationPress?: () => void;
};

export default function NewsHeader({
  onSearchPress,
  onNotificationPress,
}: NewsHeaderProps) {
  return (
    <View style={styles.container}>
      <View>
        <UIText style={styles.title}>NEWS</UIText>

        <UIText style={styles.subtitle}>Learn Today, Stronger Tomorrow</UIText>
      </View>

      <HeaderActions
        onSearchPress={onSearchPress}
        onNotificationPress={onNotificationPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 10,
    marginTop: 2,
  },
});
