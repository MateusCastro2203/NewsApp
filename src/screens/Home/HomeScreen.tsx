import React, { useEffect, useState } from "react";
import { View, SafeAreaView, FlatList } from "react-native";
import { useHomeScreen } from "./hooks/useHomeScreen";
import { usePreferencesStore } from "@/store";
import { UseNewsStore } from "@/store/newsStore";
import { NewsCard } from "@/components/NewsCard";
import { SearchNews } from "@/components/SearchNews";
import { useNavigation } from "@react-navigation/native";
import { NewsNavigationProp } from "@/navigation/types";
import { DrawerButton } from "@/components/DrawerButton";
import { useToast } from "@/hooks/useToast";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { useTheme } from "@/contexts/ThemeContext";

export const HomeScreen = () => {
  const { category } = usePreferencesStore();

  const { results } = UseNewsStore();

  const { theme } = useTheme();
  const {
    homeScreen,
    handleEndReached,
    isLoading,
    error,
    handleRefresh,
    isRefreshing,
    dataFetched,
  } = useHomeScreen();

  useEffect(() => {
    const fetchData = async () => {
      if (!category || dataFetched) return;
      try {
        await homeScreen(category);
      } catch (e) {
        return <ErrorState message={error} onRetry={() => fetchData()} />;
      }
    };
    fetchData();
  }, [category, dataFetched]);

  const navigation = useNavigation<NewsNavigationProp>();

  if (isLoading) {
    return <LoadingState message="Carregando notícias..." />;
  }

  if (error) {
  }

  return (
    <SafeAreaView
      className={`flex-1 ${
        theme === "dark" ? "bg-dark-background2" : "bg-light-background2"
      }`}
    >
      <View className="w-full h-full items-centerr px-4 ">
        <View className="flex-row justify-between py-2">
          <DrawerButton />
          <SearchNews />
        </View>
        <FlatList
          data={results}
          renderItem={({ item }) => (
            <NewsCard
              item={item}
              key={item.article_id}
              handlePress={() =>
                navigation.navigate("NewsDetails", { article: item })
              }
            />
          )}
          keyExtractor={(item) => item.article_id}
          onEndReached={() => {
            handleEndReached();
          }}
          onEndReachedThreshold={0.5}
          onRefresh={handleRefresh}
          refreshing={isRefreshing}
        />
      </View>
    </SafeAreaView>
  );
};
