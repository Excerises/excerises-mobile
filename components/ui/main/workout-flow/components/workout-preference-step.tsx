import { StyleSheet, View } from "react-native";

import {
  workoutBodyPartOptions,
  workoutCategoryOptions,
  workoutEquipmentOptions,
  workoutTargetOptions,
} from "@/components/data/onboarding-data";

import UIButton from "@/components/ui/common/button";

import FormGroup from "@/components/ui/common/form-group";

import Selector from "@/components/ui/common/selector";

import UIText from "@/components/ui/common/text";

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
    <>
      <UIText style={styles.title}>Find Your Workout</UIText>

      <UIText style={styles.subtitle}>
        Choose your workout preferences to get personalized exercises.
      </UIText>

      <View style={styles.form}>
        <FormGroup label="Body Part">
          <Selector
            placeholder="Select body part"
            options={workoutBodyPartOptions}
            value={bodyPart}
            onChange={onBodyPartChange}
          />
        </FormGroup>

        <FormGroup label="Equipment">
          <Selector
            placeholder="Select equipment"
            options={workoutEquipmentOptions}
            value={equipment}
            onChange={onEquipmentChange}
          />
        </FormGroup>

        <FormGroup label="Target">
          <Selector
            placeholder="Select target"
            options={workoutTargetOptions}
            value={target}
            onChange={onTargetChange}
          />
        </FormGroup>

        <FormGroup label="Category">
          <Selector
            placeholder="Select category"
            options={workoutCategoryOptions}
            value={category}
            onChange={onCategoryChange}
          />
        </FormGroup>
      </View>

      <UIButton
        style={styles.mainButton}
        label="Find Workout"
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

  mainButton: {
    width: "100%",
    height: 48,
    marginTop: 30,
    borderRadius: 6,
  },
});
