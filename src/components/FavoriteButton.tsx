import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFavoriteStore } from "@/store/favoriteStore";
import { NewsResult } from "@/store/types/news.types";

interface FavoriteButtonProps {
  article: NewsResult;
  size?: number;
  style?: object;
}

export function FavoriteButton({
  article,
  size = 24,
  style,
}: FavoriteButtonProps) {
  const { isFavorite, addToFavorites, removeFromFavorites } =
    useFavoriteStore();
  const isFavorited = isFavorite(article.article_id);

  const toggleFavorite = () => {
    if (isFavorited) {
      removeFromFavorites(article.article_id);
    } else {
      addToFavorites(article);
    }
  };

  return (
    <TouchableOpacity
      onPress={toggleFavorite}
      style={style}
      className="p-2 rounded-full bg-gray-100 mb-2"
    >
      <Ionicons
        name={isFavorited ? "heart-circle" : "heart-circle-outline"}
        size={size}
        color={isFavorited ? "#ef4444" : "#6b7280"}
      />
    </TouchableOpacity>
  );
}
