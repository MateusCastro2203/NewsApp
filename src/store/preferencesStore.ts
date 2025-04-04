import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PreferencesTypes } from "./types/preferences.type";

export const usePreferencesStore = create<PreferencesTypes>()(
  persist(
    (set) => ({
      category: [],
      setCategory: (newCategory: string[]) => set({ category: newCategory }),
      language: [],
      setLanguage: (newLanguage: string[]) => set({ language: newLanguage }),
    }),
    {
      name: "preferences-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
