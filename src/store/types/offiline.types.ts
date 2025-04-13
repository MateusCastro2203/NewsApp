export type OfflineArticle = {
  article_id: string;
  title: string;
  description: string;
  content: string;
  image_url: string;
  link: string;
  pubDate: string;
  source_name: string;
  localImagePath?: string;
  downloadedAt: string;
  isFullyDownloaded: boolean;
};

export interface OfflineState {
  articles: OfflineArticle[];
  lastSync: string | null;
  downloadQueue: string[];
  storageLimit: number;
  currentStorageSize: number;
}
