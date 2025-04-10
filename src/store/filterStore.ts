import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { FilterState } from "./types/filter.types";
import { NewsResponse, NewsResult } from "./types/news.types";

interface NewsFilterStore extends Omit<NewsResponse, "results"> {
  results: NewsResult[];
  setResults: (newResults: NewsResult[], shouldAppend?: boolean) => void;
  setStatus: (newStatus: "success" | "error") => void;
  setTotalResults: (total: number) => void;
  setNextPage: (page: string) => void;
  clearResults: () => void;
  resetStore: () => void;
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      searchQuery: "",
      language: "pt", // Padrão português
      sortBy: "publishedAt",
      fromDate: "",
      toDate: "",
      domains: [],

      setSearchQuery: (query) => set({ searchQuery: query }),
      setLanguage: (lang) => set({ language: lang }),
      setSortBy: (sort) => set({ sortBy: sort }),
      setDateRange: (from, to) => set({ fromDate: from, toDate: to }),
      setDomains: (domains) => set({ domains: domains }),
      resetFilters: () =>
        set({
          searchQuery: "",
          language: "pt",
          sortBy: "publishedAt",
          fromDate: null,
          toDate: null,
          domains: [],
        }),
    }),
    {
      name: "news-filter-preferences",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const useNewsFilterStore = create<NewsFilterStore>()(
  persist(
    (set) => ({
      status: "success",
      totalResults: 0,
      results: [],
      nextPage: "",

      setResults: (newResults: NewsResult[], shouldAppend = false) =>
        set((state) => ({
          ...state,
          results: shouldAppend
            ? [...state.results, ...newResults]
            : newResults,
        })),

      setStatus: (newStatus: "success" | "error") =>
        set((state) => ({ ...state, status: newStatus })),

      setTotalResults: (total: number) =>
        set((state) => ({ ...state, totalResults: total })),

      setNextPage: (page: string) =>
        set((state) => ({ ...state, nextPage: page })),

      clearResults: () =>
        set((state) => ({
          ...state,
          results: [],
          totalResults: 0,
          nextPage: "",
        })),

      resetStore: () =>
        set({
          status: "success",
          totalResults: 0,
          results: [],
          nextPage: "",
        }),
    }),
    {
      name: "news-filter-data",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        results: state.results,
        totalResults: state.totalResults,
        nextPage: state.nextPage,
      }),
    }
  )
);
