import { ChevronRight, User } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";

import UIText from "@/components/ui/common/text";
import useThemeColor from "@/hooks/use-theme-color";

type ProfileInfoCardProps = {
  name: string;
  email: string;
  onEditPress?: () => void;
};

export default function ProfileInfoCard({
  name,
  email,
  onEditPress,
}: ProfileInfoCardProps) {
  const themeColor = useThemeColor();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeColor.card,
          borderColor: themeColor.border,
        },
      ]}
    >
      <View style={styles.topRow}>
        <View
          style={[
            styles.avatar,
            {
              backgroundColor: themeColor.background,
              borderColor: themeColor.border,
            },
          ]}
        >
          <User size={34} color={themeColor.foreground} />
        </View>

        <View style={styles.info}>
          <UIText style={styles.name}>{name}</UIText>

          <UIText variant="muted" style={styles.email}>
            {email}
          </UIText>

          <Pressable
            style={[
              styles.editButton,
              {
                borderColor: themeColor.primary,
              },
            ]}
            onPress={onEditPress}
          >
            <UIText
              style={[
                styles.editText,
                {
                  color: themeColor.primary,
                },
              ]}
            >
              Edit Profile
            </UIText>
          </Pressable>
        </View>

        <ChevronRight size={22} color={themeColor.foreground} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 18,
    padding: 10,
    borderWidth: 1,
    borderRadius: 7,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 78,
    height: 78,
    borderRadius: 39,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  info: {
    flex: 1,
    marginLeft: 14,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
  },

  email: {
    fontSize: 11,
    marginTop: 3,
  },

  editButton: {
    height: 26,
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },

  editText: {
    fontSize: 10,
    fontWeight: "500",
  },
});
