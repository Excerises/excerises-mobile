import { StyleSheet, View } from "react-native";

import UIText from "@/components/ui/common/text";
import HeaderActions from "@/components/ui/main/header-actions";

type HistoryHeaderProps = {
  onSearchPress?: () => void;
  onNotificationPress?: () => void;
};

export default function HistoryHeader({
  onSearchPress,
  onNotificationPress,
}: HistoryHeaderProps) {
  return (
    <View style={styles.container}>
      <View>
        <UIText style={styles.title}>HISTORY</UIText>

        <UIText style={styles.subtitle}>Track Your Progress, Keep Going</UIText>
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
