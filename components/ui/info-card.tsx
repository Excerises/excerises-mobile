import UIText from "@/components/ui/text";
import useThemeColor from "@/hooks/use-theme-color";
import { StyleSheet, View } from "react-native";

type InfoCardProps = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
};

export default function InfoCard({ title, description, icon }: InfoCardProps) {
  const themeColor = useThemeColor();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeColor.card,
        },
      ]}
    >
      {icon}

      <View style={styles.content}>
        <UIText style={styles.title}>{title}</UIText>

        {description && (
          <UIText
            style={[
              styles.description,
              {
                color: themeColor.mutedForeground,
              },
            ]}
          >
            {description}
          </UIText>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "100%",
  },
  title: {
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  description: {
    fontSize: 11,
    marginTop: 3,
    textAlign: "center",
  },
});
