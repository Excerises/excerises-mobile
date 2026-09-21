import { ChevronRight } from "lucide-react-native";

import { useState } from "react";

import {
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import UIText from "@/components/ui/common/text";

import NewsArticleCard from "@/components/ui/main/news/news-article-card";

import NewsHeader from "@/components/ui/main/news/news-header";

import NewsHeroCard from "@/components/ui/main/news/news-hero-card";

import NewsPopularCard from "@/components/ui/main/news/news-popular-card";

import useThemeColor from "@/hooks/use-theme-color";

type NewsArticle = {
  id: string;
  image: ImageSourcePropType;
  title: string;
  description: string;
  date: string;
  category: string;
};

const categories = ["All", "Articles", "Tips", "Programs", "Community"];

const articles: NewsArticle[] = [
  {
    id: "1",
    image: require("@/assets/images/news-1.png"),
    title: "10 Simple Habits for a Healthier Lifestyle",
    description: "Build better habits, get a stronger you.",
    date: "12 Sep 2026",
    category: "Articles",
  },
  {
    id: "2",
    image: require("@/assets/images/news-2.png"),
    title: "Nutrition Guide for Muscle Gain",
    description: "Fuel your body the right way.",
    date: "10 Sep 2026",
    category: "Tips",
  },
  {
    id: "3",
    image: require("@/assets/images/news-3.png"),
    title: "Beginner's Guide to Strength Training",
    description: "Everything you need to know to start.",
    date: "8 Sep 2026",
    category: "Articles",
  },
];

const popularNews = [
  {
    id: "1",
    image: require("@/assets/images/news-1.png"),
    title: "Home Workout Routine",
    views: "12.4K",
  },
  {
    id: "2",
    image: require("@/assets/images/news-2.png"),
    title: "Best Protein Sources",
    views: "9.8K",
  },
  {
    id: "3",
    image: require("@/assets/images/news-3.png"),
    title: "Staying Consistent in Your Fitness Journey",
    views: "8.1K",
  },
];

export default function News() {
  const themeColor = useThemeColor();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredArticles =
    activeCategory === "All"
      ? articles
      : articles.filter((article) => article.category === activeCategory);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeColor.background,
        },
      ]}
    >
      <View style={styles.headerContainer}>
        <NewsHeader />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <NewsHeroCard
          image={require("@/assets/images/news-2.png")}
          title={"Small Steps\nBig Results"}
          description={"Consistency is\nthe key to progress."}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <Pressable
                key={category}
                style={[
                  styles.categoryButton,
                  {
                    backgroundColor: isActive
                      ? themeColor.primary
                      : themeColor.card,
                    borderColor: isActive
                      ? themeColor.primary
                      : themeColor.border,
                  },
                ]}
                onPress={() => setActiveCategory(category)}
              >
                <UIText
                  style={[
                    styles.categoryText,
                    isActive && {
                      color: themeColor.black,
                      fontWeight: "600",
                    },
                  ]}
                >
                  {category}
                </UIText>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <UIText style={styles.sectionTitle}>Latest Articles</UIText>

            <Pressable style={styles.sectionAction}>
              <UIText variant="muted" style={styles.actionText}>
                See All
              </UIText>

              <ChevronRight size={13} color={themeColor.mutedForeground} />
            </Pressable>
          </View>

          <View style={styles.articleList}>
            {filteredArticles.map((article) => (
              <NewsArticleCard
                key={article.id}
                image={article.image}
                title={article.title}
                description={article.description}
                date={article.date}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <UIText style={styles.sectionTitle}>Popular This Week</UIText>

            <Pressable style={styles.sectionAction}>
              <UIText variant="muted" style={styles.actionText}>
                See All
              </UIText>

              <ChevronRight size={13} color={themeColor.mutedForeground} />
            </Pressable>
          </View>

          <View style={styles.popularList}>
            {popularNews.map((item) => (
              <NewsPopularCard
                key={item.id}
                image={item.image}
                title={item.title}
                views={item.views}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 8,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  categoryList: {
    gap: 8,
    marginTop: 12,
  },

  categoryButton: {
    height: 34,
    paddingHorizontal: 14,
    borderRadius: 9,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  categoryText: {
    fontSize: 10,
  },

  section: {
    marginTop: 18,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
  },

  sectionAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
  },

  actionText: {
    fontSize: 10,
  },

  articleList: {
    gap: 6,
  },

  popularList: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 6,
  },
});
