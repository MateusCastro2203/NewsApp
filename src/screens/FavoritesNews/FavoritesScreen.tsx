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
import { createStyles } from "./styles";

type FavoritesNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<RootDrawerParamList, "Favorites">,
  NativeStackNavigationProp<RootStackParamList>
>;

export function FavoritesScreen() {
  const { savedNews } = useFavoriteStore();
  const navigation = useNavigation<FavoritesNavigationProp>();
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";
  const styles = createStyles(isDarkTheme);

  if (savedNews.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Você ainda não tem notícias salvas.{"\n"}
            Favorite algumas notícias para vê-las aqui!
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Favoritos</Text>
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
          contentContainerStyle={styles.listContent}
        />
      </View>
    </SafeAreaView>
  );
}
