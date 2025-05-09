import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ChatBotState {
  conversationId: string;
  setConversationId: (id: string) => void;
  getConversationId: () => string;
  resetConversationId: () => void;
}

export const useChatBotStore = create<ChatBotState>()(
  persist(
    (set, get) => ({
      conversationId: "",
      setConversationId: (id: string) => set({ conversationId: id }),
      getConversationId: () => get().conversationId,
      resetConversationId: () => set({ conversationId: "" }),
    }),
    {
      name: "chatbot-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
