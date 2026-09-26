import moment from "moment";
import { Mars, Venus } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import UIButton from "@/components/ui/common/button";
import FormGroup from "@/components/ui/common/form-group";
import Input from "@/components/ui/common/input";
import OptionSelector from "@/components/ui/common/option-selector";
import UIText from "@/components/ui/common/text";
import useThemeColor from "@/hooks/use-theme-color";
import DatetimeModalPicker from "@/components/ui/common/form/datetime-modal-picker";

type ProfileStepProps = {
  date: Date | null;
  gender: "male" | "female";
  height: string;
  weight: string;
  onDateChange: (date: Date) => void;
  onGenderChange: (gender: "male" | "female") => void;
  onHeightChange: (value: string) => void;
  onWeightChange: (value: string) => void;
  onNext: () => void;
};

export default function ProfileStep({
  date,
  gender,
  height,
  weight,
  onDateChange,
  onGenderChange,
  onHeightChange,
  onWeightChange,
  onNext,
}: ProfileStepProps) {
  const themeColor = useThemeColor();

  return (
    <>
      <UIText style={styles.title}>Tell Us About You</UIText>

      <UIText style={styles.subtitle}>
        Enter your basic information to create a personalized workout plan.
      </UIText>

      <View style={styles.form}>
        <FormGroup label="Date of birth">
          <DatetimeModalPicker
            renderTrigger={({ value, setShow }) => (
              <Input
                style={styles.input}
                placeholder="Select Date of Birth"
                value={value ? moment(value).format("DD MMMM YYYY") : undefined}
                readOnly
                onPress={() => setShow(true)}
              />
            )}
            isDarkModeEnabled={false}
            value={date || undefined}
            onValueChange={(date) => onDateChange(date || new Date())}
          />
        </FormGroup>

        <FormGroup label="Gender">
          <OptionSelector
            options={["Male", "Female"]}
            value={gender === "male" ? "Male" : "Female"}
            onChange={(value) =>
              onGenderChange(value === "Male" ? "male" : "female")
            }
            icons={[
              <Mars
                key="male"
                size={20}
                color={
                  gender === "male" ? themeColor.black : themeColor.foreground
                }
              />,
              <Venus
                key="female"
                size={20}
                color={
                  gender === "female" ? themeColor.black : themeColor.foreground
                }
              />,
            ]}
          />
        </FormGroup>

        <FormGroup label="Height (cm)">
          <Input
            style={styles.input}
            placeholder="Enter the height"
            keyboardType="numeric"
            value={height}
            onChangeText={onHeightChange}
          />
        </FormGroup>

        <FormGroup label="Weight (kg)">
          <Input
            style={styles.input}
            placeholder="Enter the weight"
            keyboardType="numeric"
            value={weight}
            onChangeText={onWeightChange}
          />
        </FormGroup>
      </View>

      <UIButton
        style={styles.mainButton}
        label="Continue"
        variant="primary"
        onPress={onNext}
      />
    </>
  );
}

const styles = StyleSheet.create({
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
