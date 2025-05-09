import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Sharing from "expo-sharing";
import { NewsResult } from "@/store/types/news.types";
import { styles } from "./styles";

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
    <TouchableOpacity onPress={handleShare} style={styles.button}>
      <Ionicons name="share-outline" size={24} style={styles.icon} />
    </TouchableOpacity>
  );
}
