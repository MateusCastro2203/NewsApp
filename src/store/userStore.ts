import { create } from "zustand";
import { User } from "./types/user.types";
import { registerUser } from "../services/chatbot";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  registerUsers: (name: string, email: string) => Promise<User | undefined>;
  getUser: () => User | null;
}
export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user: User) => set({ user }),
      registerUsers: async (name: string, email: string) => {
        try {
          const response = await registerUser(name, email);
          set({ user: response });
          return response;
        } catch (error) {
          console.error("Erro ao registrar usuário:", error);
          throw error;
        }
      },
      getUser: () => get().user,
    }),
    { name: "user-storage", storage: createJSONStorage(() => AsyncStorage) }
  )
);
