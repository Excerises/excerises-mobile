import UIText from "@/components/ui/text";

import useThemeColor from "@/hooks/use-theme-color";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

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

export default function NewsCard({
  data,
  onPress,
}: NewsCardProps) {
  const themeColor = useThemeColor();

  const [activeIndex, setActiveIndex] =
    useState(0);

  const activeIndexRef = useRef(0);

  const listRef =
    useRef<FlatList<NewsItem> | null>(null);

  const cardWidth = width - 48;

  const handleViewableItemsChanged =
    useCallback(
      ({
        viewableItems,
      }: {
        viewableItems: ViewToken[];
      }) => {
        const index =
          viewableItems[0]?.index;

        if (
          index !== null &&
          index !== undefined
        ) {
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
      const currentIndex =
        activeIndexRef.current;

      const nextIndex =
        currentIndex + 1 >= data.length
          ? 0
          : currentIndex + 1;

      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);

      listRef.current?.scrollToOffset({
        offset: nextIndex * cardWidth,
        animated: true,
      });
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [data.length, cardWidth]);

  return (
    <View>

      <FlatList
        ref={listRef}
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardWidth}
        decelerationRate="fast"
        scrollEventThrottle={16}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 60,
        }}
        onViewableItemsChanged={
          handleViewableItemsChanged
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onPress?.(item)}
            style={[
              styles.card,
              {
                width: cardWidth,
                borderColor:
                  themeColor.destructive,
              },
            ]}
          >

            <Image
              source={item.image}
              resizeMode="cover"
              style={styles.image}
            />


            <View style={styles.content}>

              <UIText style={styles.title}>
                {item.title}
              </UIText>


              <UIText style={styles.readMore}>
                Read More →
              </UIText>
            </View>
          </Pressable>
        )}
      />


      <View
        style={styles.indicatorContainer}
      >
        {data.map((item, index) => (
          <View
            key={item.id}
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
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 124,
    borderRadius: 7,
    overflow: "hidden",
    borderWidth: 1,
    flexDirection: "row",
  },

  image: {
    width: "46%",
    height: "100%",
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: "space-between",
  },

  title: {
    fontSize: 17,
    fontWeight: "bold",
    lineHeight: 19,
  },

  readMore: {
    fontSize: 13,
    color: "#999999",
  },

  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
  },

  indicator: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },
});