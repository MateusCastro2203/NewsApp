import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NewsResponse, NewsResult, SavedNews } from "./types/news.types";

// Interface estendida com todas as ações
interface NewsStore extends NewsResponse {
  setResults: (newResults: NewsResult[]) => void;
  setStatus: (newStatus: "success" | "error") => void;
  setTotalResults: (total: number) => void;
  setNextPage: (page: string) => void;

  resetStore: () => void;
}

export const UseNewsStore = create<NewsStore>()(
  persist(
    (set) => ({
      status: "success",
      totalResults: 0,
      results: [],
      nextPage: "",

      setResults: (newResults: NewsResult[]) =>
        set((state) => ({ ...state, results: newResults })),

      setStatus: (newStatus: "success" | "error") =>
        set((state) => ({ ...state, status: newStatus })),

      setTotalResults: (total: number) =>
        set((state) => ({ ...state, totalResults: total })),

      setNextPage: (page: string) =>
        set((state) => ({ ...state, nextPage: page })),

      resetStore: () =>
        set({
          status: "success",
          totalResults: 0,
          results: [],
          nextPage: "",
        }),
    }),
    {
      name: "news-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
