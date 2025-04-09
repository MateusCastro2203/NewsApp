import { create } from "zustand";
import { FavoritesStore, SavedNews } from "./types/news.types";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NewsResult } from "./types/news.types";

export const useFavoriteStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      savedNews: [],
      addToFavorites: (news: NewsResult) => {
        const savedNews = {
          ...news,
          savedAt: new Date().toISOString(),
        };
        set((state) => ({
          savedNews: [...state.savedNews, savedNews],
        }));
      },
      removeFromFavorites: (articleId: string) => {
        set((state) => ({
          savedNews: state.savedNews.filter(
            (news) => news.article_id !== articleId
          ),
        }));
      },
      isFavorite: (articleId: string) => {
        const state = get();
        return state.savedNews.some((news) => news.article_id === articleId);
      },
    }),
    {
      name: "favorites-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
