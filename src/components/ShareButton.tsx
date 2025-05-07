import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Sharing from "expo-sharing";
import { NewsResult } from "@/store/types/news.types";

interface ShareButtonProps {
  article: NewsResult;
}

export function ShareButton({ article }: ShareButtonProps) {
  const handleShare = async () => {
    try {
      await Sharing.shareAsync(article.link, {
        dialogTitle: "Compartilhar notícia",
        mimeType: "text/plain",
        UTI: "public.plain-text",
      });
    } catch (error) {
      console.error("Erro ao compartilhar:", error);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleShare}
      className="p-2 rounded-full bg-gray-100 mb-2"
    >
      <Ionicons name="share-outline" size={24} color="#6b7280" />
    </TouchableOpacity>
  );
}
