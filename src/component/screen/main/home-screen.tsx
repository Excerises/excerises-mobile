import { ThemeToggler } from "@/component/common/theme-toggler";
import { Button, Text, View } from "@/component/ui";
import { Fonts } from "@/constant/theme";
import { useThemeColor } from "@/hook/use-theme-color";
import { useRouter } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";
import { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface HomeScreenProps {
  title: ReactNode;
  canBack?: boolean;
  actions?: {
    icon: ReactNode;
    onTap?: () => void;
  }[];
  children?: ReactNode;
}

export function HomeScreenTitle({ children }: { children?: ReactNode }) {
  return (
    <Text weight="semibold" size="xl2">
      {children}
    </Text>
  );
}

export function HomeScreen({
  title,
  actions,
  children,
  canBack,
}: HomeScreenProps) {
  const router = useRouter();
  const color = useThemeColor();

  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top"]}>
        <View variant="ghost" style={styles.header}>
          <View variant="ghost" style={{ flex: 1 }}>
            {title}
          </View>
          <View variant="ghost" style={styles.headerActions}>
            {canBack && (
              <Button variant="ghost" onPress={() => router.back()}>
                <ArrowLeftIcon size={Fonts.size.xl} color={color.foreground} />
              </Button>
            )}
            {actions?.map((action, i) => (
              <Button variant="ghost" key={i} onPress={action.onTap}>
                {action.icon}
              </Button>
            ))}
            <ThemeToggler size={Fonts.size.xl} />
          </View>
        </View>
      </SafeAreaView>
      <View variant="ghost" style={{ flex: 1 }}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    height: 72,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
});
