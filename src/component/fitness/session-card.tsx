import { StyleSheet, Pressable } from "react-native";
import { Text, View } from "../ui";
import { Borders } from "@/constant/theme";
import { Session } from "@/../type/entity";
import { useThemeColor } from "@/hook/use-theme-color";
import { ReactNode } from "react";
import {
  DumbbellIcon,
  ClockIcon,
  MessageSquareTextIcon,
} from "lucide-react-native";
import moment from "moment";

interface SessionCardProps {
  session: Session;
  onPress?: () => void;
  trailing?: ReactNode;
}

function formatDuration(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hrs > 0) return `${hrs}h ${mins}m`;
  if (mins > 0) return `${mins}m ${secs}s`;
  return `${secs}s`;
}

export function SessionCard({ session, onPress, trailing }: SessionCardProps) {
  const colors = useThemeColor();

  return (
    <Pressable onPress={onPress}>
      <View variant="card" style={styles.card}>
        <View variant="ghost" style={styles.row}>
          <View
            variant="ghost"
            style={[styles.icon, { backgroundColor: `${colors.primary}24` }]}
          >
            <DumbbellIcon size={20} color={colors.primary} />
          </View>

          <View variant="ghost" style={styles.content}>
            <Text weight="semibold">
              {moment(session.created_at).format("DD MMMM YYYY HH:mm")}
            </Text>
            <View style={styles.infoRow} variant="ghost">
              <View style={styles.infoItem} variant="ghost">
                <ClockIcon size={14} color={colors.mutedForeground} />
                <Text size="sm" variant="muted">
                  {formatDuration(session.duration)}
                </Text>
              </View>
              <Text variant="muted" size="sm">
                •
              </Text>
              <View style={styles.infoItem} variant="ghost">
                <DumbbellIcon size={14} color={colors.mutedForeground} />
                <Text size="sm" variant="muted">
                  {session.exercises.length} exercise
                </Text>
              </View>
              {session.feedback && (
                <>
                  <Text variant="muted" size="sm">
                    •
                  </Text>
                  <View style={styles.infoItem} variant="ghost">
                    <MessageSquareTextIcon
                      size={14}
                      color={colors.mutedForeground}
                    />
                    <Text size="sm" variant="muted">
                      Feedback
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>

          {trailing}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    borderRadius: Borders.radius.lg,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 40,
    borderRadius: Borders.radius.lg,
  },
  content: {
    flex: 1,
    gap: 8,
  },
  infoRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    flexWrap: "wrap",
  },
  infoItem: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
});
