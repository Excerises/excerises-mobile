import AuthForm from "@/components/ui/auth/form";
import AuthInput from "@/components/ui/auth/input";
import UIButton from "@/components/ui/button";
import UIText from "@/components/ui/text";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import moment from "moment";
import { genderOptions } from "@/constant/data/gender";
import useThemeColor from "@/hooks/use-theme-color";

export default function Page() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState<Date>(new Date());
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showBirthDatePicker, setShowBirthDatePicker] = useState(false);
  const themeColor = useThemeColor();

  function handleSubmit() {
    alert(`Halo ${name}`);
  }

  return (
    <AuthForm
      title="Create Account"
      description="Create a new account to get started your journey."
    >
      <View style={styles.group}>
        <AuthInput
          placeholder="Enter Full Name"
          value={name}
          onChangeText={(v) => setName(v)}
        />
        <AuthInput placeholder="Username" />
        <View style={{ gap: 10, display: "flex" }}>
          <AuthInput
            placeholder="Birth Date"
            value={moment(birthDate).format("DD MMMM YYYY")}
            onPress={() => setShowBirthDatePicker(!showBirthDatePicker)}
            readOnly
          />
          {showBirthDatePicker && (
            <DateTimePicker
              value={birthDate}
              onValueChange={(e) =>
                setBirthDate(new Date(e.nativeEvent.timestamp))
              }
              textColor={themeColor.foreground}
              accentColor={themeColor.primary}
              mode="date"
              maximumDate={new Date()}
            />
          )}
        </View>
        <Picker
          selectedValue={gender}
          onValueChange={(v) => setGender(v)}
          style={{
            backgroundColor: useThemeColor().card,
            borderRadius: 20,
            minHeight: 46,
            color: themeColor.foreground,
          }}
        >
          {genderOptions.map((o) => (
            <Picker.Item
              key={o.value}
              label={o.label}
              value={o.value}
              color={themeColor.foreground}
            />
          ))}
        </Picker>
        <AuthInput
          style={{ height: 100, borderRadius: 20 }}
          multiline
          placeholder="Address"
          value={address}
          onChangeText={(v) => setAddress(v)}
        />
        <AuthInput
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={(v) => setEmail(v)}
        />
        <AuthInput
          placeholder="Password"
          keyboardType="visible-password"
          value={password}
          onChangeText={(v) => setPassword(v)}
          isPassword
        />
      </View>
      <UIButton
        style={styles.button}
        onPress={handleSubmit}
        label="Register"
      ></UIButton>
      <View style={styles.actionView}>
        <UIText variant="muted">Already have an account? </UIText>
        <Pressable
          onPress={() => {
            router.replace("/login");
          }}
        >
          <UIText variant="link">Sign In here</UIText>
        </Pressable>
      </View>
    </AuthForm>
  );
}

const styles = StyleSheet.create({
  group: {
    display: "flex",
    gap: 15,
    marginBottom: 30,
  },
  button: {
    borderRadius: 50,
    marginBottom: 30,
  },
  actionView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  picker: {
    backgroundColor: "white",
  },
});
