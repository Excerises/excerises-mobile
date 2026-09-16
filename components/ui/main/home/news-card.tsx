import { useCallback, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  View,
  ViewToken,
} from "react-native";

import UIText from "@/components/ui/text";
import useThemeColor from "@/hooks/use-theme-color";

type NewsItem = {
  id: string;
  image: ImageSourcePropType;
  title: string;
};

type NewsCardProps = {
  data: NewsItem[];
  onPress?: (item: NewsItem) => void;
};

const { width } = Dimensions.get("window");

export default function NewsCard({ data, onPress }: NewsCardProps) {
  const themeColor = useThemeColor();

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const listRef = useRef<FlatList<NewsItem>>(null);

  const cardWidth = width - 40;

  const handleViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const index = viewableItems[0]?.index;

      if (index !== null && index !== undefined) {
        activeIndexRef.current = index;
        setActiveIndex(index);
      }
    },
    [],
  );

  useEffect(() => {
    if (data.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      const currentIndex = activeIndexRef.current;

      const nextIndex = currentIndex + 1 >= data.length ? 0 : currentIndex + 1;

      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);

      listRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [data.length]);

  return (
    <View>
      <FlatList
        ref={listRef}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={cardWidth}
        decelerationRate="fast"
        keyExtractor={(item) => item.id}
        getItemLayout={(_, index) => ({
          length: cardWidth,
          offset: cardWidth * index,
          index,
        })}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 60,
        }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onPress?.(item)}
            style={[
              styles.card,
              {
                width: cardWidth,
                borderColor: themeColor.destructive,
                backgroundColor: themeColor.card,
              },
            ]}
          >
            <Image
              source={item.image}
              resizeMode="cover"
              style={styles.image}
            />

            <View
              style={[
                styles.overlay,
                {
                  backgroundColor: themeColor.overlay,
                },
              ]}
            />

            <View style={styles.content}>
              <UIText style={styles.title}>{item.title}</UIText>

              <UIText style={styles.readMore}>Read More →</UIText>
            </View>
          </Pressable>
        )}
      />

      <View style={styles.indicator}>
        {data.map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.dot,
              {
                backgroundColor:
                  index === activeIndex
                    ? themeColor.destructive
                    : themeColor.mutedForeground,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 120,
    borderWidth: 1,
    borderRadius: 7,
    overflow: "hidden",
    position: "relative",
  },

  image: {
    position: "absolute",
    width: "46%",
    height: "100%",
    left: 0,
    top: 0,
  },

  overlay: {
    position: "absolute",
    left: "30%",
    right: 0,
    top: 0,
    bottom: 0,
  },

  content: {
    flex: 1,
    marginLeft: "45%",
    paddingHorizontal: 12,
    paddingVertical: 9,
    justifyContent: "space-between",
  },

  title: {
    maxWidth: 150,
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 18,
  },

  readMore: {
    fontSize: 11,
  },

  indicator: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginTop: 10,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
