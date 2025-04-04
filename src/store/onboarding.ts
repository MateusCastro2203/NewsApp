import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface OnboardingState {
  isFirstTime: boolean;
  setFirstTimeCompleted: () => void;
  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      isFirstTime: true,
      setFirstTimeCompleted: () => set({ isFirstTime: false }),
      resetOnboarding: () => set({ isFirstTime: true }),
    }),
    {
      name: "onboarding-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
