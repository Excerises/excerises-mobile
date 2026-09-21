import { ChevronRight } from "lucide-react-native";

import { useState } from "react";

import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { featuredNews, news } from "@/components/data/News";

import UIText from "@/components/ui/common/text";

import NewsArticleCard from "@/components/ui/main/news/news-article-card";

import NewsHeader from "@/components/ui/main/news/news-header";

import NewsHeroCard from "@/components/ui/main/news/news-hero-card";

import NewsPopularCard from "@/components/ui/main/news/news-popular-card";

import useThemeColor from "@/hooks/use-theme-color";

const categories = ["All", "Articles", "Tips", "Programs", "Community"];

const formatDate = (date: string) => {
  const value = new Date(date);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${value.getDate()} ${months[value.getMonth()]} ${value.getFullYear()}`;
};

export default function News() {
  const themeColor = useThemeColor();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredArticles =
    activeCategory === "All"
      ? news
      : news.filter((article) => article.category === activeCategory);

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
          image={featuredNews.image}
          title={featuredNews.title}
          description={featuredNews.description}
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
                key={article.news_id}
                image={article.image}
                title={article.title}
                description={article.content}
                date={formatDate(article.created_at)}
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
            {news.map((item) => (
              <NewsPopularCard
                key={item.news_id}
                image={item.image}
                title={item.popular_title}
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
