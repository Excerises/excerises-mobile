import AuthInput from "@/components/ui/auth/input";
import AuthFormGroup from "@/components/ui/auth/form-group";
import DateInput from "@/components/ui/auth/date-input";
import GenderSelector from "@/components/ui/auth/gender-selector";
import AuthFooter from "@/components/ui/auth/auth-footer";
import UIButton from "@/components/ui/button";
import UIText from "@/components/ui/text";

import useThemeColor from "@/hooks/use-theme-color";
import { saveUser } from "@/constant/storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
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

  const [gender, setGender] =
    useState<"man" | "woman">("man");

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    setDateOfBirth(`${day}/${month}/${year}`);
    setShowDatePicker(false);
  };

  const handleRegister = async () => {
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
            onPress: () => router.replace("/login"),
          },
        ]
      );
    } catch {
      Alert.alert(
        "Register Gagal",
        "Data akun gagal disimpan."
      );
    }
  };

  return (
    <View style={styles.container}>
      {step === 1 ? (
        <>
          <UIText style={styles.title}>
            Create a New Account
          </UIText>

          <UIText style={styles.subtitle}>
            Let&apos;s start your fitness journey.
          </UIText>

          <View style={styles.form}>
            <AuthFormGroup label="Fullname">
              <AuthInput
                style={styles.input}
                placeholder="Enter your full name"
                value={fullname}
                onChangeText={setFullname}
              />
            </AuthFormGroup>

            <AuthFormGroup label="Username">
              <AuthInput
                style={styles.input}
                placeholder="Enter your username"
                value={username}
                onChangeText={setUsername}
              />
            </AuthFormGroup>

            <AuthFormGroup label="Email">
              <AuthInput
                style={styles.input}
                placeholder="example@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </AuthFormGroup>

            <AuthFormGroup label="Password">
              <AuthInput
                style={styles.input}
                placeholder="Enter password"
                value={password}
                onChangeText={setPassword}
                isPassword
              />
            </AuthFormGroup>

            <AuthFormGroup label="Confirm Password">
              <AuthInput
                style={styles.input}
                placeholder="Confirm password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                isPassword
              />
            </AuthFormGroup>
          </View>

          <UIButton
            style={[
              styles.mainButton,
              {
                backgroundColor:
                  themeColor.destructive,
              },
            ]}
            label="CONTINUE"
            onPress={() => setStep(2)}
          />

          <AuthFooter
            text="Already have an account?"
            actionText="Sign in"
            onPress={() => router.replace("/login")}
          />
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
            <AuthFormGroup label="Date of birth">
              <DateInput
                value={dateOfBirth}
                selectedDate={selectedDate}
                showPicker={showDatePicker}
                onOpen={() => setShowDatePicker(true)}
                onChange={handleDateChange}
              />
            </AuthFormGroup>

            <AuthFormGroup label="Gender">
              <GenderSelector
                value={gender}
                onChange={setGender}
              />
            </AuthFormGroup>

            <AuthFormGroup label="Height (cm)">
              <AuthInput
                style={styles.input}
                placeholder="Enter the height"
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
              />
            </AuthFormGroup>

            <AuthFormGroup label="Weight (kg)">
              <AuthInput
                style={styles.input}
                placeholder="Enter the weight"
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
              />
            </AuthFormGroup>
          </View>

          <UIButton
            style={[
              styles.mainButton,
              {
                backgroundColor:
                  themeColor.destructive,
              },
            ]}
            label="REGISTER"
            onPress={handleRegister}
          />

          <AuthFooter
            text="Already have an account?"
            actionText="Sign in"
            onPress={() => router.replace("/login")}
          />
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

  input: {
    height: 48,
    borderRadius: 6,
  },

  mainButton: {
    width: "100%",
    height: 48,
    marginTop: 30,
    borderRadius: 6,
  },
});