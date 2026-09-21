import type { ImageSourcePropType } from "react-native";

export type News = {
  news_id: string;
  title: string;
  content: string;
  created_at: string;
  category: string;
  views: string;
  image: ImageSourcePropType;
  home_title: string;
  popular_title: string;
};

export const news: News[] = [
  {
    news_id: "NEWS001",
    title: "10 Simple Habits for a Healthier Lifestyle",
    content: "Build better habits, get a stronger you.",
    created_at: "2026-09-12T08:00:00",
    category: "Articles",
    views: "12.4K",
    image: require("@/assets/images/news-1.png"),
    home_title: "5 Tips to Stay Consistent with Your Workout",
    popular_title: "Home Workout Routine",
  },
  {
    news_id: "NEWS002",
    title: "Nutrition Guide for Muscle Gain",
    content: "Fuel your body the right way.",
    created_at: "2026-09-10T08:00:00",
    category: "Tips",
    views: "9.8K",
    image: require("@/assets/images/news-2.png"),
    home_title: "How to Build a Better Workout Routine",
    popular_title: "Best Protein Sources",
  },
  {
    news_id: "NEWS003",
    title: "Beginner's Guide to Strength Training",
    content: "Everything you need to know to start.",
    created_at: "2026-09-08T08:00:00",
    category: "Articles",
    views: "8.1K",
    image: require("@/assets/images/news-3.png"),
    home_title: "Simple Ways to Improve Your Fitness",
    popular_title: "Staying Consistent in Your Fitness Journey",
  },
];

export const featuredNews = {
  image: news[1].image,
  title: "Small Steps\nBig Results",
  description: "Consistency is\nthe key to progress.",
};
