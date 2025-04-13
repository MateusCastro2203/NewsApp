import { SearchNews } from "@/components/SearchNews";
import React from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { NewsCard } from "@/components/NewsCard";
import { useNewsFilterStore } from "@/store/filterStore";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/AppNavigator";
export const FilterNewsResultScreen = () => {
  const { results } = useNewsFilterStore();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <View className="w-full h-full items-centerr px-4 ">
        <FlatList
          data={results}
          renderItem={({ item }) => (
            <NewsCard
              item={item}
              key={item.article_id}
              handlePress={() => {
                navigation.navigate("NewsDetails", { article: item });
              }}
            />
          )}
          keyExtractor={(item) => item.article_id}
        />
      </View>
    </SafeAreaView>
  );
};
