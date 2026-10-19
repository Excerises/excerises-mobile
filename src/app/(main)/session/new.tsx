import {
  HomeScreen,
  HomeScreenTitle,
} from "@/component/screen/main/home-screen";
import {
  Button,
  FormControl,
  Select,
  SelectContent,
  SelectInput,
  SelectItem,
  SelectTrigger,
  Text,
  View,
} from "@/component/ui";
import { Fonts } from "@/constant/theme";
import { useNewSessionForm } from "@/hook/form/session/use-new-session-form";
import { useThemeColor } from "@/hook/use-theme-color";
import { capitalize } from "@/utils/common/text";
import {
  ExerciseBodyPart,
  ExerciseCategory,
  ExerciseEquipment,
  ExerciseTarget,
} from "@/../type/entity/exercise";
import { useRouter } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";
import { ScrollView } from "react-native";

const bodyPartOptions: { label: string; value: string }[] = (
  [
    "waist",
    "shoulders",
    "upper legs",
    "upper arms",
    "lower arms",
    "lower legs",
    "back",
    "chest",
    "neck",
    "cardio",
  ] satisfies ExerciseBodyPart[]
).map((v) => ({ label: capitalize(v), value: v }));

const equipmentOptions: { label: string; value: string }[] = (
  [
    "assisted",
    "barbell",
    "rope",
    "body weight",
    "medicine ball",
    "cable",
    "leverage machine",
    "assisted (towel)",
    "stability ball",
    "dumbbell",
    "ez barbell",
    "kettlebell",
    "body weight (with resistance band)",
    "olympic barbell",
    "weighted",
    "bosu ball",
    "sled machine",
    "smith machine",
    "wheel roller",
    "trap bar",
    "band",
  ] satisfies ExerciseEquipment[]
).map((v) => ({ label: capitalize(v), value: v }));

const targetOptions: { label: string; value: string }[] = (
  [
    "abs",
    "delts",
    "glutes",
    "quads",
    "forearms",
    "biceps",
    "calves",
    "triceps",
    "hamstrings",
    "upper back",
    "pectorals",
    "lats",
    "adductors",
    "traps",
    "serratus anterior",
    "levator scapulae",
    "spine",
    "cardiovascular system",
    "abductors",
  ] satisfies ExerciseTarget[]
).map((v) => ({ label: capitalize(v), value: v }));

const categoryOptions: { label: string; value: string }[] = (
  [
    "strength",
    "cardio",
    "balance",
    "rehabilitation",
    "mobility",
    "plyometrics",
    "stretching",
  ] satisfies ExerciseCategory[]
).map((v) => ({ label: capitalize(v), value: v }));

export default function NewSession() {
  const router = useRouter();
  const themeColor = useThemeColor();
  const { control, handleSubmit } = useNewSessionForm();

  const onSubmit = handleSubmit((values) => {
    router.push({
      pathname: "/session/recommendations",
      params: {
        body_part: values.body_part,
        equipment: values.equipment,
        target: values.target,
        category: values.category,
      },
    });
  });

  return (
    <HomeScreen
      title={<HomeScreenTitle>New Session</HomeScreenTitle>}
      actions={[
        {
          icon: (
            <ArrowLeftIcon size={Fonts.size.xl} color={themeColor.foreground} />
          ),
          onTap: () => router.back(),
        },
      ]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View variant="ghost" style={{ gap: 20, paddingBottom: 40 }}>
          <View variant="ghost" style={{ gap: 6 }}>
            <Text size="xl" weight="bold">
              Set Your Preferences
            </Text>
            <Text variant="muted" size="sm">
              Choose your exercise preferences to find the best workout for you.
            </Text>
          </View>

          <FormControl
            control={control}
            name="body_part"
            label="Body Part"
            required
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectInput placeholder="Select body part" />
                </SelectTrigger>
                <SelectContent>
                  {bodyPartOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <Text>{option.label}</Text>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          <FormControl
            control={control}
            name="equipment"
            label="Equipment"
            required
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectInput placeholder="Select equipment" />
                </SelectTrigger>
                <SelectContent>
                  {equipmentOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <Text>{option.label}</Text>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          <FormControl
            control={control}
            name="target"
            label="Target Muscle"
            required
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectInput placeholder="Select target muscle" />
                </SelectTrigger>
                <SelectContent>
                  {targetOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <Text>{option.label}</Text>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          <FormControl
            control={control}
            name="category"
            label="Category"
            required
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectInput placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <Text>{option.label}</Text>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          <Button full size="lg" onPress={onSubmit}>
            <Text weight="semibold">Find Exercises</Text>
          </Button>
        </View>
      </ScrollView>
    </HomeScreen>
  );
}
