import { StyleSheet, View } from "react-native";

import UIButton from "@/components/ui/common/button";
import FormGroup from "@/components/ui/common/form-group";
import OptionSelector from "@/components/ui/common/option-selector";
import Selector from "@/components/ui/common/selector";
import UIText from "@/components/ui/common/text";
import ToggleRow from "@/components/ui/common/toggle-row";

type WorkoutTimeStepProps = {
  workoutDays: string[];
  reminderTime: string;
  reminderEnabled: boolean;
  onWorkoutDaysChange: (value: string[]) => void;
  onReminderTimeChange: (value: string) => void;
  onReminderEnabledChange: (value: boolean) => void;
  onNext: () => void;
};

const workoutDayOptions = ["Mon", "Tues", "Wed", "Thu", "Fri", "Sat", "Sun"];

const reminderTimeOptions = [
  "07:00",
  "09:00",
  "12:00",
  "16:00",
  "19:00",
  "21:00",
];

export default function WorkoutTimeStep({
  workoutDays,
  reminderTime,
  reminderEnabled,
  onWorkoutDaysChange,
  onReminderTimeChange,
  onReminderEnabledChange,
  onNext,
}: WorkoutTimeStepProps) {
  return (
    <>
      <UIText style={styles.title}>Set Your Time</UIText>

      <UIText style={styles.subtitle}>
        Help us personalize your workout plan.
      </UIText>

      <View style={styles.form}>
        <FormGroup label="Preferred workout days">
          <OptionSelector
            options={workoutDayOptions}
            value={workoutDays}
            onChange={onWorkoutDaysChange}
            multiple
          />
        </FormGroup>

        <FormGroup label="Reminder Time">
          <UIText style={styles.reminderDescription}>
            We&apos;ll remind you to work out at
            {"\n"}
            your preferred time.
          </UIText>

          <Selector
            placeholder="Select time"
            options={reminderTimeOptions}
            value={reminderTime}
            onChange={onReminderTimeChange}
          />
        </FormGroup>

        <ToggleRow
          label="Enable workout reminders"
          value={reminderEnabled}
          onChange={onReminderEnabledChange}
        />
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

  reminderDescription: {
    fontSize: 12,
    marginBottom: 6,
  },

  mainButton: {
    width: "100%",
    height: 48,
    marginTop: 30,
    borderRadius: 6,
  },
});
