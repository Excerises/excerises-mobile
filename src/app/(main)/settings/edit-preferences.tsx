import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import moment from "moment";
import { useUpdateProfile } from "@/hook/api/profile/use-update-profile";
import { useAuth } from "@/context/auth-context";
import { useEditPreferencesForm } from "@/hook/form/auth/use-profile-form";
import {
  Button,
  FormControl,
  FormGroup,
  Input,
  Label,
  ModalDatePicker,
  ModalDatePickerContent,
  ModalDatePickerInput,
  ModalDatePickerTrigger,
  Select,
  SelectContent,
  SelectInput,
  SelectItem,
  SelectTrigger,
  Text,
  ToggleGroup,
  ToggleGroupButton,
  View,
} from "@/component/ui";
import Slider from "@react-native-community/slider";
import {
  HomeScreen,
  HomeScreenTitle,
} from "@/component/screen/main/home-screen";
import { Colors, Fonts } from "@/constant/theme";
import { useThemeColor } from "@/hook/use-theme-color";
import { days } from "@/constant/data/days";
import { SafeAreaView } from "react-native-safe-area-context";
import { workoutDurationOptions } from "@/constant/fitness/workout-duration-per-session";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/component/ui/dialog";
import { LoadingBrain } from "@/app/(auth)/onboarding/measurement";
import { TrophyIcon } from "lucide-react-native";
import { fitnessLevels } from "@/constant/fitness/fitness-levels";
import { calculateBmi } from "@/utils/fitness/calculate-bmi";
import { BmiCard } from "@/component/fitness/bmi-card";

type TabKey = "identity" | "workout" | "reminder";

const TABS: { label: string; value: TabKey }[] = [
  { label: "Identity", value: "identity" },
  { label: "Workout", value: "workout" },
  { label: "Reminder", value: "reminder" },
];

export default function EditPreferencesScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>("identity");
  const themeColor = useThemeColor();
  const [fitnessDialogVisible, setFitnessDialogVisible] = useState(false);
  const [updatedFitnessLevel, setUpdatedFitnessLevel] = useState<string | null>(
    null,
  );

  const fitnessLevel = fitnessLevels.find(
    (v) => v.name.toLowerCase() === updatedFitnessLevel,
  );
  const { user } = useAuth();
  const { mutation } = useUpdateProfile();

  const { control, handleSubmit, getValues } = useEditPreferencesForm();

  const onSubmit = handleSubmit(async (values) => {
    try {
      setUpdatedFitnessLevel(null);
      const updatedUser = await mutation.mutateAsync({
        birth_date: values.birth_date,
        gender: values.gender,
        height: values.height,
        weight: values.weight,
        workout_freq_per_week: values.workout_freq_per_week,
        workout_duration_per_day: values.workout_duration_per_day,
        water_intake_daily: values.water_intake_daily,
        reminder_days: values.reminder_days,
        reminder_time: values.reminder_time,
      });

      const fitnessLevel =
        updatedUser?.data.profile?.fitness_level ??
        user?.profile?.fitness_level ??
        null;

      setFitnessDialogVisible(true);
      await new Promise((res) => setTimeout(res, 2000));
      setUpdatedFitnessLevel(fitnessLevel);
    } catch (error) {
      console.error("Failed to update preferences:", error);
    }
  });

  const [bmi, setBmi] = useState(0);

  function getBmi() {
    setBmi(
      calculateBmi({
        height: getValues("height"),
        weight: getValues("weight"),
      }),
    );
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getBmi();
  }, []);

  const renderIdentityTab = () => (
    <View style={styles.form}>
      <FormControl
        control={control}
        name="birth_date"
        label="Birth Date"
        required
        render={({ field }) => (
          <ModalDatePicker
            value={
              field.value
                ? moment(field.value, "YYYY-MM-DD").toDate()
                : undefined
            }
            onValueChange={(value) =>
              field.onChange(
                value ? moment(value).format("YYYY-MM-DD") : undefined,
              )
            }
          >
            <ModalDatePickerTrigger>
              <ModalDatePickerInput
                value={field.value}
                placeholder="Select birth date"
              />
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
          <ToggleGroup value={field.value} onValueChange={field.onChange}>
            <ToggleGroupButton value="male">
              <Text>Male</Text>
            </ToggleGroupButton>
            <ToggleGroupButton value="female">
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
            value={String(field.value ?? "")}
            onChangeText={(value) => {
              field.onChange(value === "" ? undefined : Number(value));
              getBmi();
            }}
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
            value={String(field.value ?? "")}
            onChangeText={(value) => {
              field.onChange(value === "" ? undefined : Number(value));
              getBmi();
            }}
            keyboardType="numeric"
          />
        )}
      />

      <FormGroup>
        <Label>BMI</Label>
        <BmiCard value={bmi} />
      </FormGroup>
    </View>
  );

  const renderWorkoutTab = () => (
    <View style={styles.form}>
      <FormControl
        control={control}
        name="workout_freq_per_week"
        label="Frequency per week"
        required
        render={({ field }) => (
          <View style={styles.frequencyContainer}>
            {Array.from({ length: 6 }).map((_, i) => {
              const value = i + 1;
              return (
                <Button
                  key={i}
                  variant={field.value == value ? "default" : "secondary"}
                  size="lg"
                  onPress={() => field.onChange(value)}
                  style={{ width: "31%" }}
                >
                  <Text>
                    {value} day{value == 1 ? "" : "s"}
                  </Text>
                </Button>
              );
            })}
          </View>
        )}
      />

      <FormControl
        control={control}
        name="workout_duration_per_day"
        label="Duration per session"
        required
        render={({ field }) => (
          <Select value={field.value} onValueChange={(v) => field.onChange(v)}>
            <SelectTrigger>
              <SelectInput
                value={
                  workoutDurationOptions.find((o) => o.value == field.value)
                    ?.label
                }
                placeholder="Select duration"
              />
            </SelectTrigger>
            <SelectContent>
              {workoutDurationOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  <Text>{o.label}</Text>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      <FormControl
        control={control}
        name="water_intake_daily"
        label="Water Intake Daily"
        required
        render={({ field }) => (
          <View variant="ghost" style={{ alignItems: "flex-end" }}>
            <Slider
              value={field.value}
              onValueChange={(v) => field.onChange(v)}
              maximumValue={4}
              minimumValue={0}
              minimumTrackTintColor={themeColor.primary}
              style={{ width: "100%" }}
            />
            <Text size="sm" variant="muted">
              {(field.value || 0).toFixed(1)} liter
            </Text>
          </View>
        )}
      />
    </View>
  );

  const renderReminderTab = () => (
    <View style={styles.form}>
      <FormControl
        control={control}
        name="reminder_days"
        label="Preferred workout days"
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
                  key={value}
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
        name="reminder_time"
        label="Reminder Time"
        required
        render={({ field }) => (
          <ModalDatePicker
            value={
              field.value
                ? moment(`1970-01-01 ${field.value}:00`).toDate()
                : null
            }
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
  );

  return (
    <HomeScreen
      canBack
      title={<HomeScreenTitle>Edit Preferences</HomeScreenTitle>}
    >
      <View style={styles.screen}>
        <View style={[styles.tabs, { borderBottomColor: themeColor.border }]}>
          {TABS.map((tab) => {
            const selected = activeTab === tab.value;

            return (
              <Pressable
                key={tab.value}
                onPress={() => setActiveTab(tab.value)}
                style={[
                  styles.tab,
                  selected && { borderBottomColor: themeColor.primary },
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    selected && { color: themeColor.primary },
                  ]}
                >
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {activeTab === "identity" && renderIdentityTab()}
          {activeTab === "workout" && renderWorkoutTab()}
          {activeTab === "reminder" && renderReminderTab()}
        </ScrollView>

        <SafeAreaView edges={["bottom"]}>
          <View style={[styles.footer, { borderTopColor: themeColor.border }]}>
            <Button
              onPress={() => onSubmit()}
              disabled={mutation.isPending}
              style={styles.saveButton}
              full
            >
              {mutation.isPending ? (
                <ActivityIndicator color={themeColor.foreground} />
              ) : (
                <Text size="md" weight="semibold">
                  Save Changes
                </Text>
              )}
            </Button>
          </View>
        </SafeAreaView>

        <Dialog
          open={fitnessDialogVisible}
          onOpenChange={setFitnessDialogVisible}
        >
          <DialogContent dismissOnBackdropPress={!!fitnessLevel}>
            {fitnessLevel ? (
              <View variant="ghost" style={styles.fitnessResult}>
                <TrophyIcon size={Fonts.size.xl6} color={fitnessLevel.color} />
                <View variant="ghost" style={styles.fitnessResult}>
                  <Text variant="muted">Your Fitness Level</Text>
                  <Text
                    weight="bold"
                    size="xl5"
                    style={{ color: fitnessLevel.color }}
                  >
                    {fitnessLevel.name}
                  </Text>
                </View>
                <Text variant="muted">{fitnessLevel.description}</Text>
              </View>
            ) : (
              <View variant="ghost" style={styles.fitnessResult}>
                <LoadingBrain />
                <Text variant="muted">Measuring your fitness level...</Text>
              </View>
            )}

            {fitnessLevel && (
              <DialogFooter>
                <Button
                  variant="ghost"
                  onPress={() => setFitnessDialogVisible(false)}
                >
                  <Text>Close</Text>
                </Button>
              </DialogFooter>
            )}
          </DialogContent>
        </Dialog>
      </View>
    </HomeScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  tabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabText: {
    fontWeight: "500",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
  },
  form: {
    gap: 20,
  },
  frequencyContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  frequencyButton: {
    width: "31%",
    minHeight: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
  },
  selectedButton: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  selectedButtonText: {
    color: "#FFFFFF",
  },
  sliderContainer: {
    gap: 12,
    alignItems: "flex-end",
  },
  mutedText: {
    color: "#737373",
    fontSize: 13,
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  dayButton: {
    width: "22%",
    minHeight: 42,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    paddingTop: 12,
    paddingBottom: 20,
    borderTopWidth: 1,
  },
  saveButton: {
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  fitnessResult: {
    alignItems: "center",
    paddingVertical: 24,
  },
  fitnessLabel: {
    fontSize: 14,
  },
  fitnessValue: {
    fontSize: 28,
    fontWeight: "700",
  },
});
