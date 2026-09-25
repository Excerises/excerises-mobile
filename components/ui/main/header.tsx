import { StyleSheet, View } from "react-native";

import UIText from "@/components/ui/common/text";
import HeaderActions from "@/components/ui/main/header-actions";

type HeaderProps = {
  title: string;
  description: string;
};

export default function Header({ title, description }: HeaderProps) {
  return (
    <View style={styles.container}>
      <View>
        <UIText style={styles.title}>{title.toUpperCase()}</UIText>

        <UIText style={styles.subtitle}>{description}</UIText>
      </View>

      <HeaderActions />
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
