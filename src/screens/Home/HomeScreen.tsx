import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useHomeScreen } from "./hooks/useHomeScreen";
import { usePreferencesStore } from "@/store";
import { UseNewsStore } from "@/store/newsStore";
import { FlatList } from "react-native-gesture-handler";
import { NewsCard } from "./components/NewsCard";

export const HomeScreen = () => {
  const { category } = usePreferencesStore();
  const [dataFetched, setDataFetched] = useState(false);
  const { results } = UseNewsStore();
  useEffect(() => {
    const fetchData = async () => {
      if (!category || dataFetched) return;
      try {
        await useHomeScreen(category);

        setDataFetched(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [category, dataFetched]);

  const handlePress = () => {
    console.log("aqui ");
    //navigation.navigate("NewsDetails", { article: item });
  };

  return (
    <View className="w-full h-full items-centerr px-4 ">
      <FlatList
        data={results}
        renderItem={({ item }) => (
          <NewsCard item={item} key={item.article_id} />
        )}
        keyExtractor={(item) => item.article_id}
      />
    </View>
  );
};
