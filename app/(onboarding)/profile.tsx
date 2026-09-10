import AuthFormGroup from "@/components/ui/form-group";
import AuthInput from "@/components/ui/input";
import DateInput from "@/components/ui/onboarding/date-input";
import GenderSelector from "@/components/ui/onboarding/gender-selector";

import UIButton from "@/components/ui/button";
import UIText from "@/components/ui/text";

import useThemeColor from "@/hooks/use-theme-color";

import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Page() {
  const themeColor = useThemeColor();

  const [date, setDate] = useState(new Date());

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [gender, setGender] = useState<"male" | "female">("male");

  return (
    <View style={styles.container}>
      <UIText style={styles.title}>Complete Your Profile</UIText>

      <UIText style={styles.subtitle}>Fill in your data correctly!</UIText>

      <View style={styles.form}>
        <AuthFormGroup label="Date of birth">
          <DateInput
            value=""
            selectedDate={date}
            showPicker={showDatePicker}
            onOpen={() => setShowDatePicker(true)}
            onChange={(selectedDate) => {
              setDate(selectedDate);
              setShowDatePicker(false);
            }}
          />
        </AuthFormGroup>

        <AuthFormGroup label="Gender">
          <GenderSelector value={gender} onChange={setGender} />
        </AuthFormGroup>

        <AuthFormGroup label="Height (cm)">
          <AuthInput
            style={styles.input}
            placeholder="Enter the height"
            keyboardType="numeric"
          />
        </AuthFormGroup>

        <AuthFormGroup label="Weight (kg)">
          <AuthInput
            style={styles.input}
            placeholder="Enter the weight"
            keyboardType="numeric"
          />
        </AuthFormGroup>
      </View>

      <UIButton
        style={[
          styles.mainButton,
          {
            backgroundColor: themeColor.destructive,
          },
        ]}
        label="CONTINUE"
        onPress={() => {}}
      />
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
