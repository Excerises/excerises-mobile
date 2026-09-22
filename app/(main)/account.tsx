import AsyncStorage from "@react-native-async-storage/async-storage";

import { router } from "expo-router";

import { LogOut } from "lucide-react-native";

import { Alert, Pressable, ScrollView, StyleSheet, View } from "react-native";

import { currentUser } from "@/components/data/User";

import { userProfiles } from "@/components/data/User_Profile";

import UIText from "@/components/ui/common/text";

import ProfileHeader from "@/components/ui/main/profile/profile-header";

import ProfileInfoCard from "@/components/ui/main/profile/profile-info-card";

import ProfileMenu from "@/components/ui/main/profile/profile-menu";

import ProfileStats from "@/components/ui/main/profile/profile-stats";

import useThemeColor from "@/hooks/use-theme-color";

export default function Profile() {
  const themeColor = useThemeColor();
  const profile =
    userProfiles.find((item) => item.user_id === currentUser.user_id) ??
    userProfiles[0];

  const handleLogout = () => {
    Alert.alert("Confirm Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: async () => {
          try {
            await AsyncStorage.removeItem("user");
            router.replace("/(auth)/login");
          } catch (e) {
            console.error("Failed to log out", e);
          }
        },
      },
    ]);
  };

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
        <ProfileHeader />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ProfileInfoCard name={currentUser.name} email={currentUser.email} />

        <ProfileStats
          workoutCount={profile.workout_count}
          daysStreak={profile.days_streak}
          totalHours={profile.total_hours}
        />

        <ProfileMenu />

        <Pressable
          onPress={handleLogout}
          style={({ pressed }) => [
            styles.logoutButton,
            {
              borderColor: themeColor.primary,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <LogOut size={20} color={themeColor.danger} />

          <UIText
            style={[
              styles.logoutText,
              {
                color: themeColor.danger,
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
