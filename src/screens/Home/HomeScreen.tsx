import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useHomeScreen } from "./hooks/useHomeScreen";
import { usePreferencesStore } from "@/store";
import { UseNewsStore } from "@/store/newsStore";
import { FlatList } from "react-native-gesture-handler";
import { NewsCard } from "@/components/NewsCard";
import { SearchNews } from "@/components/SearchNews";
import { useNavigation } from "@react-navigation/native";
import { NewsNavigationProp } from "@/navigation/types";
import { DrawerButton } from "@/components/DrawerButton";

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

  const navigation = useNavigation<NewsNavigationProp>();

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
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
          onScrollBeginDrag={() => {
            setDataFetched(false);
          }}
          refreshing={!dataFetched}
        />
      </View>
    </SafeAreaView>
  );
};
