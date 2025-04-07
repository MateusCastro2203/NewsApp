import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NewsResult } from "@/store/types/news.types";
import { RootStackParamList } from "@/navigation/AppNavigator";

interface NewsCardProps {
  item: NewsResult;
}

type NewsNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export const NewsCard = ({ item }: NewsCardProps) => {
  const navigation = useNavigation<NewsNavigationProp>();

  const handlePress = () => {
    navigation.navigate("NewsDetails", { article: item });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="w-full mb-4 rounded-lg overflow-hidden shadow-md bg-white"
    >
      <Image
        source={{ uri: item.image_url }}
        className="w-full h-52"
        resizeMode="cover"
      />
      <View className="p-4">
        <Text className="text-lg font-bold text-gray-800" numberOfLines={2}>
          {item.title}
        </Text>
        <Text className="text-sm text-gray-600 mt-2" numberOfLines={3}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
