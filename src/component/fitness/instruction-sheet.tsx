import { Exercise } from "@/../type/entity";
import { useThemeColor } from "@/hook/use-theme-color";
import { capitalize } from "@/utils/common/text";
import { CircleHelp, PauseCircle, X } from "lucide-react-native";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, View } from "../ui";
import { categoryIcons, difficultyColors } from "./exercise-visuals";
import { BottomSheet, BottomSheetContent } from "../ui/bottom-sheet";

interface InstructionSheetProps {
  exercise?: Exercise;
  visible: boolean;
  onClose: () => void;
}

export function InstructionSheet({
  exercise,
  visible,
  onClose,
}: InstructionSheetProps) {
  const themeColor = useThemeColor();
  const { height } = useWindowDimensions();

  const CategoryIcon = exercise ? categoryIcons[exercise.category] : CircleHelp;
  const accent = exercise
    ? difficultyColors[exercise.difficulty]
    : themeColor.primary;
  const steps = exercise?.instructions ?? [];

  return (
    <BottomSheet
      open={visible}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <BottomSheetContent style={styles.sheet}>
        <View variant="ghost" style={styles.header}>
          <View
            variant="ghost"
            style={[styles.headerIcon, { backgroundColor: `${accent}24` }]}
          >
            <CategoryIcon size={20} color={accent} />
          </View>

          <View variant="ghost" style={styles.headerText}>
            <Text size="xs" variant="muted" weight="semibold">
              HOW TO PERFORM
            </Text>
            <Text size="lg" weight="bold" numberOfLines={1}>
              {exercise?.name ?? "-"}
            </Text>
          </View>

          <Pressable
            onPress={onClose}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Close instructions"
            style={[styles.close, { backgroundColor: themeColor.muted }]}
          >
            <X size={18} color={themeColor.mutedForeground} />
          </Pressable>
        </View>

        <View
          variant="ghost"
          style={[
            styles.pausedChip,
            { backgroundColor: `${themeColor.primary}1F` },
          ]}
        >
          <PauseCircle size={14} color={themeColor.primary} />
          <Text size="xs" weight="medium" variant="primary">
            Timer paused while you read
          </Text>
        </View>

        <ScrollView
          style={styles.stepsScroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.steps}
        >
          {steps.length === 0 ? (
            <Text size="sm" variant="muted">
              No detailed instructions for this exercise yet. Follow the
              description and keep a steady, controlled tempo.
            </Text>
          ) : (
            steps.map((step, i) => (
              <View key={`${i}`} variant="ghost" style={styles.step}>
                <View
                  variant="ghost"
                  style={[
                    styles.stepBadge,
                    { backgroundColor: `${themeColor.primary}1F` },
                  ]}
                >
                  <Text size="xs" weight="bold" variant="primary">
                    {i + 1}
                  </Text>
                </View>
                <Text size="sm" style={styles.stepText}>
                  {step}
                </Text>
              </View>
            ))
          )}
        </ScrollView>

        {exercise && (
          <View
            variant="ghost"
            style={[styles.metaBar, { borderTopColor: themeColor.border }]}
          >
            <Text size="xs" variant="muted">
              {capitalize(exercise.body_part)} • {capitalize(exercise.target)} •{" "}
              {capitalize(exercise.equipment)}
            </Text>
          </View>
        )}

        <SafeAreaView edges={["bottom"]} style={styles.footer}>
          <Button full size="lg" onPress={onClose}>
            <Text weight="semibold">Got it</Text>
          </Button>
        </SafeAreaView>
      </BottomSheetContent>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheet: {
    paddingHorizontal: 20,
    paddingVertical: 28,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingBottom: 12,
  },
  headerIcon: {
    height: 40,
    width: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    flex: 1,
    gap: 2,
  },
  close: {
    height: 32,
    width: 32,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
  pausedChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 9999,
    marginBottom: 12,
  },
  stepsScroll: {
    // Keeps the list inside the sheet's maxHeight instead of overflowing it.
    flexShrink: 1,
  },
  steps: {
    gap: 14,
    paddingBottom: 16,
  },
  step: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },
  stepBadge: {
    height: 26,
    width: 26,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
  stepText: {
    flex: 1,
    lineHeight: 20,
  },
  metaBar: {
    paddingVertical: 10,
    alignItems: "center",
    borderTopWidth: 1,
  },
  footer: {
    paddingTop: 8,
    paddingBottom: 4,
  },
});
