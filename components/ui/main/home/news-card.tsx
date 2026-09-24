import { useEffect, useRef, useState } from "react";
import type { ImageSourcePropType } from "react-native";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import UIText from "@/components/ui/common/text";
import useThemeColor from "@/hooks/use-theme-color";

type NewsItem = {
  id: string;
  image: ImageSourcePropType;
  title: string;
  description?: string;
};

type NewsCardProps = {
  data: NewsItem[];
  onPress?: (item: NewsItem) => void;
};

const { width } = Dimensions.get("window");

export default function NewsCard({ data, onPress }: NewsCardProps) {
  const themeColor = useThemeColor();
  const [activeIndex, setActiveIndex] = useState(0);

  const listRef = useRef<FlatList<NewsItem>>(null);
  const activeIndexRef = useRef(0);

  const cardWidth = width - 40;

  useEffect(() => {
    if (data.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      const nextIndex =
        activeIndexRef.current + 1 >= data.length
          ? 0
          : activeIndexRef.current + 1;

      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);

      listRef.current?.scrollToOffset({
        offset: nextIndex * cardWidth,
        animated: true,
      });
    }, 7000);

    return () => clearInterval(interval);
  }, [data.length, cardWidth]);

  return (
    <View>
      <FlatList
        ref={listRef}
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / cardWidth,
          );

          activeIndexRef.current = index;
          setActiveIndex(index);
        }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onPress?.(item)}
            style={[
              styles.card,
              {
                width: cardWidth,
                borderColor: themeColor.border,
              },
            ]}
          >
            <Image source={item.image} style={styles.image} />

            <View
              style={[
                styles.overlay,
                {
                  backgroundColor: themeColor.overlay,
                },
              ]}
            />

            <View style={styles.content}>
              <UIText
                style={[
                  styles.title,
                  {
                    color: themeColor.white,
                  },
                ]}
              >
                {item.title}
              </UIText>

              {item.description && (
                <UIText
                  style={[
                    styles.description,
                    {
                      color: themeColor.white,
                    },
                  ]}
                  numberOfLines={2}
                >
                  {item.description}
                </UIText>
              )}

              <UIText
                style={[
                  styles.readMore,
                  {
                    color: themeColor.primary,
                  },
                ]}
              >
                Read More →
              </UIText>
            </View>
          </Pressable>
        )}
      />

      {data.length > 1 && (
        <View style={styles.indicator}>
          {data.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    index === activeIndex
                      ? themeColor.primary
                      : themeColor.mutedForeground,
                },
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 126,
    borderWidth: 1,
    borderRadius: 7,
    overflow: "hidden",
    position: "relative",
  },

  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
    resizeMode: "cover",
  },

  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },

  content: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    justifyContent: "space-between",
  },

  title: {
    maxWidth: 220,
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 18,
  },

  description: {
    maxWidth: 220,
    marginTop: 4,
    fontSize: 10,
    lineHeight: 14,
  },

  readMore: {
    fontSize: 11,
    fontWeight: "600",
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
