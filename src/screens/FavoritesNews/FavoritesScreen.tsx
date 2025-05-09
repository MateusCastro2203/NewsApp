import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
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
  const isDarkTheme = theme === "dark";

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkTheme ? "#111827" : "#f1f5f9",
    },
    emptyContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
    },
    emptyText: {
      fontSize: 18,
      textAlign: "center",
      color: isDarkTheme ? "#d1d5db" : "#4b5563",
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginVertical: 16,
      color: isDarkTheme ? "#ffffff" : "#1f2937",
    },
    listContent: {
      paddingVertical: 16,
    },
  });

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
