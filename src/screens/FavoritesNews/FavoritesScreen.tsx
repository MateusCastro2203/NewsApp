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
import { useTheme } from "@/contexts/ThemeContext";

type FavoritesNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<RootDrawerParamList, "Favorites">,
  NativeStackNavigationProp<RootStackParamList>
>;

export function FavoritesScreen() {
  const { savedNews } = useFavoriteStore();
  const navigation = useNavigation<FavoritesNavigationProp>();
  const { theme } = useTheme();

  if (savedNews.length === 0) {
    return (
      <SafeAreaView
        className={`flex-1 ${
          theme === "dark" ? "bg-gray-900" : "bg-slate-100"
        }`}
      >
        <View className="flex-1 items-center justify-center p-4">
          <Text
            className={`text-lg text-center ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Você ainda não tem notícias salvas.{"\n"}
            Favorite algumas notícias para vê-las aqui!
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className={`flex-1 ${theme === "dark" ? "bg-gray-900" : "bg-slate-100"}`}
    >
      <View className="flex-1 px-4">
        <Text
          className={`text-xl font-bold my-4 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          Favoritos
        </Text>
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
