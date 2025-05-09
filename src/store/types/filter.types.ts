import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface FilterState {
  searchQuery: string;
  language: string;
  sortBy: "relevancy" | "popularity" | "publishedAt";
  fromDate?: string | null;
  toDate?: string | null;
  domains?: string[];

  setSearchQuery?: (query: string) => void;
  setLanguage?: (lang: string) => void;
  setSortBy?: (sort: "relevancy" | "popularity" | "publishedAt") => void;
  setDateRange?: (from: string | null, to: string | null) => void;
  setDomains?: (domains: string[]) => void;
  resetFilters?: () => void;
}
