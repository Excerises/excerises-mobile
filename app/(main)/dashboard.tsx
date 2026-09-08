import UIText from "@/components/ui/text";
import useThemeColor from "@/hooks/use-theme-color";
import { getUser } from "@/constant/storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

export default function Dashboard() {
  const router = useRouter();
  const themeColor = useThemeColor();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    let cancelled = false;

    const loadUser = async () => {
      try {
        const data = await getUser();

        if (!cancelled && data) {
          setUser(data);
        }
      } catch {
        if (!cancelled) {
          Alert.alert(
            "Error",
            "Gagal mengambil data pengguna."
          );
        }
      }
    };

    loadUser();

    return () => {
      cancelled = true;
    };
  }, []);

  const calculateAge = (dateOfBirth: string) => {
    const [day, month, year] = dateOfBirth
      .split("/")
      .map(Number);

    const today = new Date();

    let age = today.getFullYear() - year;

    const birthdayThisYear = new Date(
      today.getFullYear(),
      month - 1,
      day
    );

    if (today < birthdayThisYear) {
      age--;
    }

    return age;
  };

  if (!user) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: themeColor.background,
          },
        ]}
      >
        <UIText>Loading...</UIText>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeColor.background,
        },
      ]}
    >
      <UIText style={styles.title}>
        Welcome, {user.fullname}!
      </UIText>

      <UIText style={styles.info}>
        Username: {user.username}
      </UIText>

      <UIText style={styles.info}>
        Email: {user.email}
      </UIText>

      <UIText style={styles.info}>
        Date of birth: {user.dateOfBirth}
      </UIText>

      <UIText style={styles.info}>
        Age: {calculateAge(user.dateOfBirth)} years
      </UIText>

      <UIText style={styles.info}>
        Gender: {user.gender}
      </UIText>

      <UIText style={styles.info}>
        Height: {user.height} cm
      </UIText>

      <UIText style={styles.info}>
        Weight: {user.weight} kg
      </UIText>

      <Pressable
        style={[
          styles.logoutButton,
          {
            backgroundColor: themeColor.destructive,
          },
        ]}
        onPress={() => router.replace("/login")}
      >
        <UIText style={styles.logoutText}>
          Log Out
        </UIText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 24,
  },

  info: {
    fontSize: 16,
    marginBottom: 12,
  },

  logoutButton: {
    height: 48,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },

  logoutText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});