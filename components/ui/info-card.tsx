import UIText from "@/components/ui/text";
import { StyleSheet, View } from "react-native";

type InfoCardProps = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
};

export default function InfoCard({ title, description, icon }: InfoCardProps) {
  return (
    <View style={styles.card}>

      {icon && <View style={styles.iconContainer}>{icon}</View>}


      <View style={styles.content}>
        <UIText style={styles.title}>{title}</UIText>

        {description && (
          <UIText style={styles.description}>{description}</UIText>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 6,
    backgroundColor: "#292929",
  },

  iconContainer: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 12,
  },

  description: {
    fontSize: 11,
    opacity: 0.6,
    marginTop: 2,
  },
});
