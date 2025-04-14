import { NewsResponse } from "@/store/types/news.types";
import { FilterState } from "@/store/types/filter.types";

const key = process.env.EXPO_PUBLIC_NEWS_API_KEY;
const BASE_URL = process.env.EXPO_PUBLIC_NEWS_LAST_URL;

export const fetchAllArticles = async (
  category: string[],
  nextPage?: string
): Promise<NewsResponse> => {
  try {
    const params = new URLSearchParams({
      apikey: key,
      language: "pt",
      category: category.join(","),
    });

    if (nextPage) params.append("page", nextPage);

    const response = await fetch(`${BASE_URL}?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Erro ao buscar artigos:", error);
    throw error;
  }
};

export const fetchArticlesByQuery = async ({
  searchQuery,
  language = "pt",
}: FilterState): Promise<NewsResponse> => {
  try {
    const params = new URLSearchParams({
      apikey: key,
    });

    if (searchQuery) params.append("q", searchQuery);
    params.append("language", language || "pt");

    const url = `${BASE_URL}?${params.toString()}`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error: ${response.status} - ${
          errorData.message || response.statusText
        }`
      );
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Erro ao buscar artigos por query:", error);
    throw error;
  }
};
