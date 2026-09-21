// Dummy data for the News entity in the ERD.
import type { ImageSourcePropType } from "react-native";

export type NewsArticle = {
  id: string;
  image: ImageSourcePropType;
  title: string;
  description: string;
  date: string;
  category: string;
};

export type PopularNews = {
  id: string;
  image: ImageSourcePropType;
  title: string;
  views: string;
};

export const homeNews = [
  {
    id: "1",
    image: require("@/assets/images/news-1.png"),
    title: "5 Tips to Stay Consistent with Your Workout",
  },
  {
    id: "2",
    image: require("@/assets/images/news-2.png"),
    title: "How to Build a Better Workout Routine",
  },
  {
    id: "3",
    image: require("@/assets/images/news-3.png"),
    title: "Simple Ways to Improve Your Fitness",
  },
];

export const articles: NewsArticle[] = [
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

export const popularNews: PopularNews[] = [
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

export const newsHero = {
  image: require("@/assets/images/news-2.png"),
  title: "Small Steps\nBig Results",
  description: "Consistency is\nthe key to progress.",
};
