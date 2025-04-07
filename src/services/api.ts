import { NewsResponse } from "@/store/types/news.types";

export const fetchAllArticles = async (
  category: string[]
): Promise<NewsResponse> => {
  const api = process.env.EXPO_PUBLIC_NEWS_LAST_URL;
  const key = process.env.EXPO_PUBLIC_NEWS_API_KEY;

  const response = await fetch(
    `${api}language=pt&category=${category}&apikey=${key}`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
