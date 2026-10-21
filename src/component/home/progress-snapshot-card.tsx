import { StyleSheet, Pressable } from "react-native";
import { Text, View } from "../ui";
import { Borders, Fonts } from "@/constant/theme";
import { useThemeColor } from "@/hook/use-theme-color";
import { ChevronRightIcon, LucideIcon } from "lucide-react-native";
import { ReactNode } from "react";

export interface SnapshotStat {
  label: string;
  value: string | number;
  icon: LucideIcon;
}

interface ProgressSnapshotCardProps {
  title?: string;
  stats: SnapshotStat[];
  trailing?: ReactNode;
  onPress?: () => void;
}

export function ProgressSnapshotCard({
  title = "Your Progress",
  stats,
  trailing,
  onPress,
}: ProgressSnapshotCardProps) {
  const themeColor = useThemeColor();

  return (
    <Pressable onPress={onPress}>
      <View variant="card" style={styles.card}>
        <View variant="ghost" style={styles.header}>
          <Text weight="semibold" size="lg">
            {title}
          </Text>
          <View variant="ghost" style={styles.headerRight}>
            {trailing}
            {onPress && (
              <ChevronRightIcon
                size={Fonts.size.md}
                color={themeColor.mutedForeground}
              />
            )}
          </View>
        </View>
        <View variant="ghost" style={styles.stats}>
          {stats.map((stat, i) => (
            <View
              key={i}
              variant="ghost"
              style={[
                styles.statItem,
                i < stats.length - 1 && {
                  borderRightWidth: 1,
                  borderRightColor: themeColor.border,
                },
              ]}
            >
              <View
                variant="ghost"
                style={[
                  styles.icon,
                  { backgroundColor: `${themeColor.primary}1A` },
                ]}
              >
                <stat.icon size={Fonts.size.lg} color={themeColor.primary} />
              </View>
              <Text weight="bold" size="xl2">
                {stat.value}
              </Text>
              <Text variant="muted" size="xs">
                {stat.label}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Borders.radius.xl,
    padding: 16,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  stats: {
    flexDirection: "row",
    alignItems: "center",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    gap: 6,
    paddingVertical: 4,
  },
  icon: {
    height: 40,
    width: 40,
    borderRadius: Borders.radius.xl,
    alignItems: "center",
    justifyContent: "center",
  },
});
