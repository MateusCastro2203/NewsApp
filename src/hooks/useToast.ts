import { create } from "zustand";

interface ToastState {
  message: string;
  type: "success" | "error" | "info";
  isVisible: boolean;
  showToast: (message: string, type: "success" | "error" | "info") => void;
  hideToast: () => void;
}

export const useToast = create<ToastState>((set) => ({
  message: "",
  type: "info",
  isVisible: false,
  showToast: (message, type) => set({ message, type, isVisible: true }),
  hideToast: () => set({ isVisible: false }),
}));
