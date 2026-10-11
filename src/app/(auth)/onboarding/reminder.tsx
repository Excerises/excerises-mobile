import { OnboardingScreen } from "@/component/screen/onboarding-screen";
import {
  Button,
  FormControl,
  View,
  Text,
  ModalDatePicker,
  ModalDatePickerTrigger,
  ModalDatePickerInput,
  ModalDatePickerContent,
} from "@/component/ui";
import { days } from "@/constant/data/days";
import { useOnboarding } from "@/context/onboarding-context";
import { useOnboardingReminderForm } from "@/hook/form/onboarding/use-onboarding-reminder-form";
import moment from "moment";
import { useEffect } from "react";
import { StyleSheet } from "react-native";

export default function Page() {
  const { control, handleSubmit } = useOnboardingReminderForm();
  const { setStep, setData } = useOnboarding();

  useEffect(() => {
    setStep(4);
  }, []);

  const onContinue = handleSubmit((v) => {
    setData("reminder_days", v.reminderDays);
    setData("reminder_time", v.reminderTime);

    console.log(v);
  });

  return (
    <OnboardingScreen
      title="Set Reminder"
      description="You will be notified when your workout time is up."
      onContinue={onContinue}
    >
      <View variant="ghost" style={styles.form}>
        <FormControl
          control={control}
          name="reminderDays"
          label="Prefered workout days"
          render={({ field }) => (
            <View
              variant="ghost"
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              {Array.from({ length: days.length }).map((_, i) => {
                const value = i + 1;
                const isActive = field.value.includes(value);

                return (
                  <Button
                    variant={isActive ? "default" : "secondary"}
                    style={{ width: "22%" }}
                    onPress={() => {
                      if (isActive) {
                        field.onChange(field.value.filter((v) => v !== value));
                      } else {
                        field.onChange([...field.value, value]);
                      }
                    }}
                  >
                    <Text>{days[i].slice(0, 3)}</Text>
                  </Button>
                );
              })}
            </View>
          )}
        />
        <FormControl
          control={control}
          name="reminderTime"
          label="Reminder Time"
          required
          render={({ field }) => (
            <ModalDatePicker
              value={moment(`1970-01-01 ${field.value}`).toDate()}
              onValueChange={(v) => {
                field.onChange(moment(v).format("HH:mm"));
              }}
            >
              <ModalDatePickerTrigger>
                <ModalDatePickerInput
                  value={moment(`1970-01-01 ${field.value}`).format("HH:mm")}
                />
              </ModalDatePickerTrigger>
              <ModalDatePickerContent mode="time" />
            </ModalDatePicker>
          )}
        />
      </View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 14,
  },
});
