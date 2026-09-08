import AuthInput from "@/components/ui/auth/input";
import UIButton from "@/components/ui/button";
import UIText from "@/components/ui/text";
import useThemeColor from "@/hooks/use-theme-color";
import { saveUser } from "@/constant/storage";
import { useRouter } from "expo-router";
import { Mars, Venus, CalendarDays } from "lucide-react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

export default function Page() {
  const router = useRouter();
  const themeColor = useThemeColor();

  const [step, setStep] = useState(1);

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [dateOfBirth, setDateOfBirth] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [gender, setGender] = useState("man");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const handleDateChange = (
    event: any,
    date?: Date
  ) => {
    if (date) {
      setSelectedDate(date);

      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      setDateOfBirth(`${day}/${month}/${year}`);
    }

    setShowDatePicker(false);
  };

  return (
    <View style={styles.container}>
      {step === 1 ? (
        <>
          <UIText style={styles.title}>
            Create a New Account
          </UIText>

          <UIText style={styles.subtitle}>
            Let's start your fitness journey.
          </UIText>

          <View style={styles.form}>
            <View style={styles.field}>
              <UIText style={styles.label}>
                Fullname
              </UIText>

              <AuthInput
                style={styles.input}
                placeholder="Enter your full name"
                value={fullname}
                onChangeText={setFullname}
              />
            </View>

            <View style={styles.field}>
              <UIText style={styles.label}>
                Username
              </UIText>

              <AuthInput
                style={styles.input}
                placeholder="Enter your username"
                value={username}
                onChangeText={setUsername}
              />
            </View>

            <View style={styles.field}>
              <UIText style={styles.label}>
                Email
              </UIText>

              <AuthInput
                style={styles.input}
                placeholder="example@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.field}>
              <UIText style={styles.label}>
                Password
              </UIText>

              <AuthInput
                style={styles.input}
                placeholder="Enter password"
                value={password}
                onChangeText={setPassword}
                isPassword
              />
            </View>

            <View style={styles.field}>
              <UIText style={styles.label}>
                Confirm Password
              </UIText>

              <AuthInput
                style={styles.input}
                placeholder="Confirm password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                isPassword
              />
            </View>
          </View>

          <UIButton
            style={[
              styles.mainButton,
              {
                backgroundColor: themeColor.destructive,
              },
            ]}
            label="CONTINUE"
            onPress={() => setStep(2)}
          />

          <View style={styles.bottomRow}>
            <UIText variant="muted">
              Already have an account?{" "}
            </UIText>

            <Pressable
              onPress={() => router.replace("/login")}
            >
              <UIText style={styles.redText}>
                Sign in
              </UIText>
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <UIText style={styles.title}>
            Complete Your Profile
          </UIText>

          <UIText style={styles.subtitle}>
            Fill in your data correctly!
          </UIText>

          <View style={styles.form}>
            <View style={styles.field}>
              <UIText style={styles.label}>
                Date of birth
              </UIText>

              <Pressable
                onPress={() => setShowDatePicker(true)}
                style={[
                  styles.dateInput,
                  {
                    backgroundColor: themeColor.card,
                  },
                ]}
              >
                <UIText
                  style={[
                    styles.dateText,
                    {
                      color: dateOfBirth
                        ? themeColor.foreground
                        : themeColor.mutedForeground,
                    },
                  ]}
                >
                  {dateOfBirth || "day/month/year"}
                </UIText>

                <CalendarDays
                  size={20}
                  color={themeColor.mutedForeground}
                />
              </Pressable>

              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display="default"
                  onValueChange={handleDateChange}
                  maximumDate={new Date()}
                />
              )}
            </View>

            <View style={styles.field}>
              <UIText style={styles.label}>
                Gender
              </UIText>

              <View style={styles.genderRow}>
                <Pressable
                  onPress={() => setGender("man")}
                  style={[
                    styles.genderButton,
                    {
                      backgroundColor:
                        gender === "man"
                          ? themeColor.destructive
                          : themeColor.card,
                    },
                  ]}
                >
                  <Mars
                    size={20}
                    color={
                      gender === "man"
                        ? "#FFFFFF"
                        : themeColor.foreground
                    }
                  />

                  <UIText
                    style={{
                      color:
                        gender === "man"
                          ? "#FFFFFF"
                          : themeColor.foreground,
                    }}
                  >
                    Man
                  </UIText>
                </Pressable>

                <Pressable
                  onPress={() => setGender("woman")}
                  style={[
                    styles.genderButton,
                    {
                      backgroundColor:
                        gender === "woman"
                          ? themeColor.destructive
                          : themeColor.card,
                    },
                  ]}
                >
                  <Venus
                    size={20}
                    color={
                      gender === "woman"
                        ? "#FFFFFF"
                        : themeColor.foreground
                    }
                  />

                  <UIText
                    style={{
                      color:
                        gender === "woman"
                          ? "#FFFFFF"
                          : themeColor.foreground,
                    }}
                  >
                    Woman
                  </UIText>
                </Pressable>
              </View>
            </View>

            <View style={styles.field}>
              <UIText style={styles.label}>
                Height (cm)
              </UIText>
              <AuthInput
                style={styles.input}
                placeholder="Enter the height"
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.field}>
              <UIText style={styles.label}>
                Weight (kg)
              </UIText>
              <AuthInput
                style={styles.input}
                placeholder="Enter the weight"
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
              />
            </View>
          </View>

          <UIButton
            style={[
              styles.mainButton,
              {
                backgroundColor: themeColor.destructive,
              },
            ]}
            label="REGISTER"
            onPress={async () => {
              try {
                await saveUser({
                  fullname,
                  username,
                  email,
                  password,
                  dateOfBirth,
                  gender,
                  height,
                  weight,
                });

                Alert.alert(
                  "Register Berhasil",
                  "Akun berhasil dibuat. Silakan login.",
                  [
                    {
                      text: "OK",
                      onPress: () =>
                        router.replace("/login"),
                    },
                  ]
                );
              } catch {
                Alert.alert(
                  "Register Gagal",
                  "Data akun gagal disimpan."
                );
              }
            }}
          />

          <View style={styles.bottomRow}>
            <UIText variant="muted">
              Already have an account?{" "}
            </UIText>

            <Pressable
              onPress={() => router.replace("/login")}
            >
              <UIText style={styles.redText}>
                Sign in
              </UIText>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 10,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },

  form: {
    marginTop: 26,
    gap: 14,
  },

  field: {
    gap: 6,
  },

  label: {
    fontSize: 13,
    fontWeight: "500",
  },

  input: {
    height: 48,
    borderRadius: 6,
  },

  dateInput: {
    height: 48,
    borderRadius: 6,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  dateText: {
    fontSize: 16,
  },

  mainButton: {
    width: "100%",
    height: 48,
    marginTop: 30,
    borderRadius: 6,
  },

  redText: {
    color: "#800000",
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },

  genderRow: {
    flexDirection: "row",
    gap: 8,
  },

  genderButton: {
    flex: 1,
    height: 40,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});