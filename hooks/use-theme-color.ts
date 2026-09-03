import { useThemeContext } from "@/components/provider/theme-provider";
import { Colors } from "@/constant/theme";

export default function useThemeColor() {
  const { theme } = useThemeContext();
  return Colors[theme];
}
