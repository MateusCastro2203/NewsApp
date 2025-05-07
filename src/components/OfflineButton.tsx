import React from "react";
import { TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useOfflineStore } from "@/store/offlineStorage";
import { useNetworkStatus } from "@/hooks/useNetWorkStatus";
import { NewsResult } from "@/store/types/news.types";
import { useToast } from "@/hooks/useToast";

interface OfflineButtonProps {
  article: NewsResult;
}

export function OfflineButton({ article }: OfflineButtonProps) {
  const { addToOffline, removeFromOffline, isArticleOffline } =
    useOfflineStore();
  const { shouldDownload } = useNetworkStatus();
  const [isLoading, setIsLoading] = React.useState(false);

  const isAvailableOffline = isArticleOffline(article.article_id);
  const { showToast } = useToast();
  const handlePress = async () => {
    if (!shouldDownload()) {
      showToast("Conexão limitada. Use WiFi para baixar conteúdo.", "error");
      return;
    }

    try {
      setIsLoading(true);
      if (isAvailableOffline) {
        await removeFromOffline(article.article_id);
      } else {
        await addToOffline(article);
      }
    } catch (error) {
      showToast("Erro ao gerenciar conteúdo offline:", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={isLoading}
      className="p-2 rounded-full bg-gray-100 mb-2"
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <Ionicons
          name={isAvailableOffline ? "cloud-done" : "cloud-download"}
          size={24}
          color={isAvailableOffline ? "#22c55e" : "#6b7280"}
        />
      )}
    </TouchableOpacity>
  );
}
