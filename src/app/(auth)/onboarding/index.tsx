import { OnboardingScreen } from "@/component/screen/onboarding-screen";
import {
  FormControl,
  FormGroup,
  Input,
  Label,
  ModalDatePicker,
  ModalDatePickerContent,
  ModalDatePickerInput,
  ModalDatePickerTrigger,
  Text,
  ToggleGroup,
  ToggleGroupButton,
  View,
} from "@/component/ui";
import { Fonts } from "@/constant/theme";
import { useOnboarding } from "@/context/onboarding-context";
import { useOnboardingIdentityForm } from "@/hook/form/onboarding/use-onboarding-identity-form";
import { useThemeColor } from "@/hook/use-theme-color";
import { calculateAge } from "@/utils/fitness/calculate-age";
import { calculateBmi } from "@/utils/fitness/calculate-bmi";
import { MarsIcon, VenusIcon } from "lucide-react-native";
import moment from "moment";
import { useEffect } from "react";

export default function Onboarding() {
  const themeColor = useThemeColor();
  const { setData, setStep } = useOnboarding();
  const { control, handleSubmit } = useOnboardingIdentityForm();

  const onContinue = handleSubmit((v) => {
    const age = calculateAge(v.birthDate);
    const bmi = calculateBmi({ height: v.height, weight: v.weight });

    setData("age", age);
    setData("gender", v.gender);
    setData("height", v.height);
    setData("weight", v.weight);
    setData("bmi", bmi);
  });

  useEffect(() => {
    setStep(1);
  }, []);

  return (
    <OnboardingScreen
      title="Tell Us About You"
      description="Enter your data to create a personalized workout plan."
      onContinue={onContinue}
    >
      <View style={{ gap: 14 }}>
        <FormControl
          control={control}
          name="birthDate"
          label="Birth Date"
          required
          render={({ field }) => (
            <ModalDatePicker
              value={field.value ? moment(field.value).toDate() : undefined}
              onValueChange={(v) =>
                field.onChange(v ? moment(v).format("YYYY-MM-DD") : undefined)
              }
            >
              <ModalDatePickerTrigger>
                <ModalDatePickerInput placeholder="Select birth date"></ModalDatePickerInput>
              </ModalDatePickerTrigger>
              <ModalDatePickerContent mode="date" />
            </ModalDatePicker>
          )}
        />

        <FormControl
          control={control}
          name="gender"
          label="Gender"
          required
          render={({ field }) => (
            <ToggleGroup
              value={field.value}
              onValueChange={(v) => field.onChange(v)}
            >
              <ToggleGroupButton value="male">
                <MarsIcon color={themeColor.foreground} size={Fonts.size.sm} />
                <Text>Male</Text>
              </ToggleGroupButton>
              <ToggleGroupButton value="female">
                <VenusIcon color={themeColor.foreground} size={Fonts.size.sm} />
                <Text>Female</Text>
              </ToggleGroupButton>
            </ToggleGroup>
          )}
        />

        <FormControl
          control={control}
          name="height"
          label="Height (cm)"
          required
          render={({ field }) => (
            <Input
              placeholder="Enter your height"
              value={field.value.toString()}
              onChangeText={(v) => field.onChange(Number(v))}
              keyboardType="numeric"
            />
          )}
        />

        <FormControl
          control={control}
          name="weight"
          label="Weight (kg)"
          required
          render={({ field }) => (
            <Input
              placeholder="Enter your weight"
              value={field.value.toString()}
              onChangeText={(v) => field.onChange(Number(v))}
              keyboardType="numeric"
            />
          )}
        />
      </View>
    </OnboardingScreen>
  );
}
