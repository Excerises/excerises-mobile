import { StyleSheet, View } from "react-native";

import UIButton from "@/components/ui/common/button";
import FormGroup from "@/components/ui/common/form/form-group";
import UIText from "@/components/ui/common/text";
import Select, {
  SelectContent,
  SelectInput,
  SelectItem,
  SelectTrigger,
} from "../../common/form/select";
import {
  exerciseBodyPartOptions,
  exerciseCategoryOptions,
  exerciseEquipmentOptions,
  exerciseTargetOptions,
} from "@/constant/exercise";

type WorkoutPreferenceStepProps = {
  bodyPart: string;
  equipment: string;
  category: string;
  target: string;
  onBodyPartChange: (value: string) => void;
  onEquipmentChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onTargetChange: (value: string) => void;
  onNext: () => void;
};

export default function WorkoutPreferenceStep({
  bodyPart,
  equipment,
  category,
  target,
  onBodyPartChange,
  onEquipmentChange,
  onCategoryChange,
  onTargetChange,
  onNext,
}: WorkoutPreferenceStepProps) {
  return (
    <View style={styles.container}>
      <UIText style={styles.title}>Start a Workout</UIText>

      <UIText style={styles.subtitle}>
        Choose your workout preferences based on your needs.
      </UIText>

      <View style={styles.form}>
        <FormGroup label="Target">
          <Select>
            <SelectTrigger>
              <SelectInput placeholder="Select target" />
            </SelectTrigger>
            <SelectContent>
              {exerciseTargetOptions.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  <UIText>{t.label}</UIText>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormGroup>

        <FormGroup label="Body Part">
          <Select>
            <SelectTrigger>
              <SelectInput placeholder="Select body part" />
            </SelectTrigger>
            <SelectContent>
              {exerciseBodyPartOptions.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  <UIText>{t.label}</UIText>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormGroup>

        <FormGroup label="Equipment">
          <Select>
            <SelectTrigger>
              <SelectInput placeholder="Select equipment" />
            </SelectTrigger>
            <SelectContent>
              {exerciseEquipmentOptions.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  <UIText>{t.label}</UIText>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormGroup>

        <FormGroup label="Category">
          <Select>
            <SelectTrigger>
              <SelectInput placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {exerciseCategoryOptions.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  <UIText>{t.label}</UIText>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormGroup>
      </View>

      <UIButton
        style={styles.mainButton}
        label="Find My Workout  →"
        variant="primary"
        onPress={onNext}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 21,
    marginTop: 4,
  },

  form: {
    marginTop: 26,
    gap: 14,
  },

  mainButton: {
    width: "100%",
    height: 52,
    marginTop: 30,
    borderRadius: 8,
  },
});
