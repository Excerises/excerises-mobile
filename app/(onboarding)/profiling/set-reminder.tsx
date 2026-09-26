import { useProfiling } from "@/components/provider/onboarding/profiling-provider";
import UIButton from "@/components/ui/common/button";
import DatetimePickerModal, {
  DatetimePickerModalInput,
  DatetimePickerModalTrigger,
} from "@/components/ui/common/form/datetime-modal-picker";
import FieldControl from "@/components/ui/common/form/field-control";
import UIText from "@/components/ui/common/text";
import UIView from "@/components/ui/common/view";
import { ProfilingLayout } from "@/components/ui/onboarding/profiling/profiling-layout";
import { dayOptions } from "@/constant/day";
import { useProfilingSetReminderForm } from "@/hooks/form/auth/profiling/use-profiling-set-reminder-form";
import useThemeColor from "@/hooks/use-theme-color";
import { useRouter } from "expo-router";
import moment from "moment";
import { StyleSheet, Switch, View } from "react-native";

export default function SetReminder() {
  const router = useRouter();
  const color = useThemeColor();
  const p = useProfiling();
  const {
    form: { control, handleSubmit },
  } = useProfilingSetReminderForm();

  const onContinue = handleSubmit((val) => {
    p.setReminderDays(val.reminderDays);
    p.setReminderTime(val.reminderTime);

    router.push("/result");
  });

  return (
    <ProfilingLayout
      title="Set Your Time"
      description="Help us personalize your workout plan."
      onContinue={onContinue}
      currentStep={4}
    >
      <View style={styles.container}>
        <FieldControl
          control={control}
          name="reminderDays"
          label="Preferred workout days"
          render={({ field }) => (
            <View style={styles.dayContainer}>
              {dayOptions.map((o) => {
                const isActive = field.value.includes(o.value);
                return (
                  <UIButton
                    style={styles.day}
                    key={o.value}
                    variant={isActive ? "primary" : "default"}
                    label={o.label.slice(0, 3)}
                    onPress={() =>
                      field.onChange(
                        isActive
                          ? field.value.filter((v) => v !== o.value)
                          : [...field.value, o.value],
                      )
                    }
                  />
                );
              })}
            </View>
          )}
        />

        <FieldControl
          control={control}
          name="reminderTime"
          label="Reminder Time"
          render={({ field }) => (
            <DatetimePickerModal
              mode="time"
              value={
                field.value.includes(":")
                  ? moment(
                      new Date(
                        new Date().getFullYear(),
                        new Date().getMonth(),
                        new Date().getDate(),
                        Number(field.value.split(":")[0]),
                        Number(field.value.split(":")[1]),
                      ),
                    ).toDate()
                  : undefined
              }
              isDarkModeEnabled={false}
              onValueChange={(v) => field.onChange(moment(v).format("HH:mm"))}
            >
              <DatetimePickerModalTrigger>
                <DatetimePickerModalInput placeholder="Select a Time" />
              </DatetimePickerModalTrigger>
            </DatetimePickerModal>
          )}
        />

        <UIView variant="card" style={styles.card}>
          <Switch
            trackColor={{
              false: color.border,
              true: color.primary,
            }}
            thumbColor={color.white}
          />

          <View style={{ flex: 1 }}>
            <UIText style={{ fontSize: 15, fontWeight: "500" }}>
              Enable Workout Reminder
            </UIText>
            <UIText variant="muted">
              We will remind you to work out at your preferred time.
            </UIText>
          </View>
        </UIView>
      </View>
    </ProfilingLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
  dayContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  day: {
    width: "22.5%",
  },
  timeContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  time: {
    flex: 1,
  },
  card: {
    flexDirection: "row",
    gap: 12,
    padding: 18,
    borderRadius: 6,
  },
});
