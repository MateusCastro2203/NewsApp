import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { OfflineState, OfflineArticle } from "./types/offiline.types";
import * as OfflineStorage from "../services/useOfflineStorage";
import { NewsResult } from "./types/news.types";

const STORAGE_LIMIT = 500 * 1024 * 1024; // 500MB

interface OfflineStore extends OfflineState {
  addToOffline: (article: NewsResult) => Promise<void>;
  removeFromOffline: (articleId: string) => Promise<void>;
  isArticleOffline: (articleId: string) => boolean;
  updateSyncStatus: () => void;
  clearOldContent: (daysOld: number) => Promise<void>;
}

export const useOfflineStore = create<OfflineStore>()(
  persist(
    (set, get) => ({
      articles: [],
      lastSync: null,
      downloadQueue: [],
      storageLimit: STORAGE_LIMIT,
      currentStorageSize: 0,

      addToOffline: async (article) => {
        try {
          const { free } = await OfflineStorage.getStorageInfo();

          if (free < get().storageLimit) {
            throw new Error("Espaço insuficiente");
          }

          const localImagePath = await OfflineStorage.downloadImage(
            article.image_url,
            article.article_id
          );

          const offlineArticle: OfflineArticle = {
            ...article,
            localImagePath: localImagePath ?? undefined,
            downloadedAt: new Date().toISOString(),
            isFullyDownloaded: Boolean(localImagePath),
          };

          set((state) => ({
            articles: [...state.articles, offlineArticle],
          }));
        } catch (error) {
          console.error("Erro ao adicionar artigo offline:", error);
          throw error;
        }
      },

      removeFromOffline: async (articleId) => {
        const article = get().articles.find((a) => a.article_id === articleId);
        if (article?.localImagePath) {
          await OfflineStorage.deleteFile(article.localImagePath);
        }

        set((state) => ({
          articles: state.articles.filter((a) => a.article_id !== articleId),
        }));
      },

      isArticleOffline: (articleId) => {
        return get().articles.some((a) => a.article_id === articleId);
      },

      updateSyncStatus: () => {
        set({ lastSync: new Date().toISOString() });
      },

      clearOldContent: async (daysOld) => {
        await OfflineStorage.clearOldFiles(daysOld);

        set((state) => ({
          articles: state.articles.filter((article) => {
            const downloadDate = new Date(article.downloadedAt);
            const now = new Date();
            const diffDays =
              (now.getTime() - downloadDate.getTime()) / (1000 * 3600 * 24);
            return diffDays <= daysOld;
          }),
        }));
      },
    }),
    {
      name: "offline-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
