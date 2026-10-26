import { ProfileCard } from "@/component/account/profile-card";
import {
  HomeScreen,
  HomeScreenTitle,
} from "@/component/screen/main/home-screen";
import { Text, View } from "@/component/ui";
import { Borders, Fonts } from "@/constant/theme";
import { useAuth } from "@/context/auth-context";
import { useLogout } from "@/hook/api/auth/use-login";
import { useThemeColor } from "@/hook/use-theme-color";
import { useRouter } from "expo-router";
import {
  BellIcon,
  ChevronRightIcon,
  CircleHelpIcon,
  LogOutIcon,
  SlidersHorizontalIcon,
  UserPenIcon,
  type LucideIcon,
} from "lucide-react-native";
import { Alert, Pressable, ScrollView, StyleSheet } from "react-native";

interface MenuItem {
  label: string;
  icon: LucideIcon;
  onPress: () => void;
  destructive?: boolean;
}

function MenuItemRow({ item, isLast }: { item: MenuItem; isLast: boolean }) {
  const themeColor = useThemeColor();
  const iconColor = item.destructive
    ? themeColor.danger
    : themeColor.foreground;

  return (
    <Pressable
      onPress={item.onPress}
      style={({ pressed }) => [
        styles.menuItem,
        !isLast && {
          borderBottomWidth: 1,
          borderBottomColor: themeColor.border,
        },
        pressed && { opacity: 0.6 },
      ]}
    >
      <View variant="ghost" style={styles.menuItemLeft}>
        <item.icon color={iconColor} size={Fonts.size.xl} />
        <Text variant={item.destructive ? "destructive" : "default"} size="md">
          {item.label}
        </Text>
      </View>
      {!item.destructive && (
        <ChevronRightIcon
          color={themeColor.mutedForeground}
          size={Fonts.size.lg}
        />
      )}
    </Pressable>
  );
}

function MenuSection({ title, items }: { title: string; items: MenuItem[] }) {
  return (
    <View variant="ghost" style={styles.section}>
      <Text variant="muted" size="sm" weight="semibold">
        {title}
      </Text>
      <View variant="card" style={styles.menuCard}>
        {items.map((item, i) => (
          <MenuItemRow
            key={item.label}
            item={item}
            isLast={i === items.length - 1}
          />
        ))}
      </View>
    </View>
  );
}

export default function Page() {
  const { user, setUser } = useAuth();
  const { mutation: logoutMutation } = useLogout();
  const router = useRouter();

  async function onLogout() {
    await logoutMutation.mutateAsync();
  }

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: onLogout,
      },
    ]);
  };

  const accountItems: MenuItem[] = [
    {
      label: "Edit Profile",
      icon: UserPenIcon,
      onPress: () => router.push("/settings/edit-profile"),
    },
    {
      label: "My Preference",
      icon: SlidersHorizontalIcon,
      onPress: () => router.push("/settings/edit-preferences"),
    },
    {
      label: "Notifications",
      icon: BellIcon,
      onPress: () => router.push("/notification"),
    },
  ];

  const moreItems: MenuItem[] = [
    {
      label: "Help & Support",
      icon: CircleHelpIcon,
      onPress: () => {},
    },
    {
      label: "Logout",
      icon: LogOutIcon,
      onPress: handleLogout,
      destructive: true,
    },
  ];

  return (
    <HomeScreen title={<HomeScreenTitle>Account</HomeScreenTitle>}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View variant="ghost" style={styles.container}>
          {user && <ProfileCard user={user} />}

          <MenuSection title="Account" items={accountItems} />
          <MenuSection title="More" items={moreItems} />
        </View>
      </ScrollView>
    </HomeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
  section: {
    gap: 8,
  },
  menuCard: {
    borderRadius: Borders.radius.lg,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
