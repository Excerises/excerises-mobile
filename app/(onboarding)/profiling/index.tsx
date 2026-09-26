import { useProfiling } from "@/components/provider/onboarding/profiling-provider";
import UIButton from "@/components/ui/common/button";
import DatetimePickerModal, {
  DatetimePickerModalInput,
  DatetimePickerModalTrigger,
} from "@/components/ui/common/form/datetime-modal-picker";
import FieldControl from "@/components/ui/common/form/field-control";
import Input from "@/components/ui/common/form/input";
import { ProfilingLayout } from "@/components/ui/onboarding/profiling/profiling-layout";
import { genderOptions } from "@/constant/gender";
import { useProfilingIdentityForm } from "@/hooks/form/auth/profiling/use-profiling-identity-form";
import useThemeColor from "@/hooks/use-theme-color";
import { useRouter } from "expo-router";
import moment from "moment";
import { StyleSheet, View } from "react-native";

export default function ProfilingIndexPage() {
  const router = useRouter();
  const {
    form: { control, handleSubmit },
  } = useProfilingIdentityForm();
  const color = useThemeColor();
  const profiling = useProfiling();

  const onContinue = handleSubmit((val) => {
    profiling.setGender(val.gender as any);
    profiling.setBirthDate(val.birthDate);
    profiling.setHeight(val.height);
    profiling.setWeight(val.weight);

    router.push("/profiling/bmi-result");
  });

  return (
    <ProfilingLayout
      title="Tell Us About You"
      description="Enter your identity to create a personalized workout plan."
      onContinue={onContinue}
    >
      <View style={styles.container}>
        <FieldControl
          control={control}
          name="birthDate"
          label="Date of Birth"
          render={({ field }) => (
            <DatetimePickerModal
              value={field.value ? moment(field.value).toDate() : undefined}
              onValueChange={(val) =>
                field.onChange(moment(val).format("YYYY-MM-DD"))
              }
              isDarkModeEnabled={false}
            >
              <DatetimePickerModalTrigger>
                <DatetimePickerModalInput placeholder="Select Date of Birth" />
              </DatetimePickerModalTrigger>
            </DatetimePickerModal>
          )}
        />

        <FieldControl
          control={control}
          name="gender"
          label="Gender"
          render={({ field }) => (
            <View style={{ flexDirection: "row", gap: 14 }}>
              {genderOptions.map((opt) => {
                const isActive = field.value === opt.value;
                return (
                  <UIButton
                    key={opt.value}
                    style={{ flex: 1 }}
                    label={opt.label}
                    variant={isActive ? "primary" : "default"}
                    labelStyle={{
                      color: isActive ? "black" : color.foreground,
                    }}
                    icon={
                      <opt.icon
                        size={26}
                        color={isActive ? "black" : color.foreground}
                      />
                    }
                    onPress={() => field.onChange(opt.value)}
                  />
                );
              })}
            </View>
          )}
        />

        <FieldControl
          control={control}
          name="height"
          label="Height (cm)"
          render={({ field }) => (
            <Input
              value={field.value.toString()}
              onChangeText={(v) => field.onChange(Number(v))}
              keyboardType="numeric"
              placeholder="Enter your height"
            />
          )}
        />

        <FieldControl
          control={control}
          name="weight"
          label="Weight (kg)"
          render={({ field }) => (
            <Input
              value={field.value.toString()}
              onChangeText={(v) => field.onChange(Number(v))}
              keyboardType="numeric"
              placeholder="Enter your weight"
            />
          )}
        />
      </View>
    </ProfilingLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 14,
    flex: 1,
  },
});
