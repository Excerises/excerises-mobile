import useThemeColor from "@/hooks/use-theme-color";

import {
  StyleSheet,
  View,
} from "react-native";

type CarouselIndicatorProps = {
  count: number;
  activeIndex: number;
};

export default function CarouselIndicator({
  count,
  activeIndex,
}: CarouselIndicatorProps) {
  const themeColor = useThemeColor();

  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map(
        (_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              {
                backgroundColor:
                  index === activeIndex
                    ? themeColor.destructive
                    : themeColor.border,
              },
            ]}
          />
        ),
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
  },

  indicator: {
    width: 7,
    height: 7,
    borderRadius: 5,
  },
});