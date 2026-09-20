import { LogOut } from "lucide-react-native";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import UIText from "@/components/ui/common/text";
import ProfileGoal from "@/components/ui/main/profile/profile-goal";
import ProfileHeader from "@/components/ui/main/profile/profile-header";
import ProfileInfoCard from "@/components/ui/main/profile/profile-info-card";
import ProfileMenu from "@/components/ui/main/profile/profile-menu";
import ProfileStats from "@/components/ui/main/profile/profile-stats";

import useThemeColor from "@/hooks/use-theme-color";

export default function Profile() {
  const themeColor = useThemeColor();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeColor.background,
        },
      ]}
    >
      <View style={styles.headerContainer}>
        <ProfileHeader onSettingsPress={() => {}} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ProfileInfoCard
          name="Rama"
          email="rama@email.com"
          onEditPress={() => {}}
        />

        <ProfileStats />

        <ProfileGoal
          goal="Muscle Gain"
          description="Stay consistent and reach your goal."
          progress={60}
          onPress={() => {}}
        />

        <ProfileMenu onPress={() => {}} />

        <Pressable
          style={[
            styles.logoutButton,
            {
              borderColor: themeColor.border,
            },
          ]}
        >
          <LogOut size={20} color={themeColor.primary} />

          <UIText
            style={[
              styles.logoutText,
              {
                color: themeColor.primary,
              },
            ]}
          >
            Log Out
          </UIText>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 8,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  logoutButton: {
    height: 46,
    marginTop: 14,
    borderWidth: 1,
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  logoutText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
