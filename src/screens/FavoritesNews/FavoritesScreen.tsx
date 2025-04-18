import React from "react";
import { View, FlatList, Text } from "react-native";
import { useFavoriteStore } from "@/store/favoriteStore";
import { NewsCard } from "@/components/NewsCard";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  RootDrawerParamList,
  RootStackParamList,
} from "@/navigation/AppNavigator";
import { DrawerNavigationProp } from "@react-navigation/drawer";

type FavoritesNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<RootDrawerParamList, "Favorites">,
  NativeStackNavigationProp<RootStackParamList>
>;
export function FavoritesScreen() {
  const { savedNews } = useFavoriteStore();
  const navigation = useNavigation<FavoritesNavigationProp>();
  if (savedNews.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-slate-100">
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-lg text-gray-600 text-center">
            Você ainda não tem notícias salvas.{"\n"}
            Favorite algumas notícias para vê-las aqui!
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <View className="flex-1 px-4">
        <FlatList
          data={savedNews}
          renderItem={({ item }) => {
            return (
              <NewsCard
                item={item}
                showFavoriteButton={false}
                handlePress={() => {
                  navigation.navigate("NewsDetails", { article: item });
                }}
              />
            );
          }}
          keyExtractor={(item) => item.article_id}
          contentContainerStyle={{ paddingVertical: 16 }}
        />
      </View>
    </SafeAreaView>
  );
}
