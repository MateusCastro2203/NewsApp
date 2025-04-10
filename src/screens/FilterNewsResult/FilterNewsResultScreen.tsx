import { SearchNews } from "@/components/SearchNews";
import React from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { NewsCard } from "../Home/components/NewsCard";
import { useNewsFilterStore } from "@/store/filterStore";

export const FilterNewsResultScreen = () => {
  const { results } = useNewsFilterStore();
  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <View className="w-full h-full items-centerr px-4 ">
        <FlatList
          data={results}
          renderItem={({ item }) => (
            <NewsCard item={item} key={item.article_id} />
          )}
          keyExtractor={(item) => item.article_id}
        />
      </View>
    </SafeAreaView>
  );
};
