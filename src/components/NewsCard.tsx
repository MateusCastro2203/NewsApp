import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NewsResult } from "@/store/types/news.types";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { FavoriteButton } from "@/components/FavoriteButton";
import { NewsImage } from "./NewsImage";
import { OfflineButton } from "./OfflineButton";
import { useTheme } from "@/contexts/ThemeContext";

interface NewsCardProps {
  item: NewsResult;
  showFavoriteButton?: boolean;
  handlePress?: () => void;
}

export const NewsCard = ({
  item,
  showFavoriteButton = true,
  handlePress,
}: NewsCardProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`w-full mb-4 rounded-lg overflow-hidden shadow-md ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}
    >
      <NewsImage
        imageUrl={item.image_url}
        className="w-full h-52"
        resizeMode="cover"
      />
      {showFavoriteButton && (
        <View className="absolute top-2 right-2">
          <FavoriteButton article={item} />
        </View>
      )}

      <View className="p-4">
        <Text
          className={`text-lg font-bold ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text
          className={`text-sm ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          } mt-2`}
          numberOfLines={3}
        >
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
