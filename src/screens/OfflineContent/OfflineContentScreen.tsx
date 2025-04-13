import React from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useOfflineStore } from "@/store/offlineStorage";
import { NewsCard } from "@/components/NewsCard";
import { useNetworkStatus } from "@/hooks/useNetWorkStatus";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  RootDrawerParamList,
  RootStackParamList,
} from "@/navigation/AppNavigator";
import { NewsResult } from "@/store/types/news.types";
import { DrawerNavigationProp } from "@react-navigation/drawer";

type OfflineScreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<RootDrawerParamList, "OfflineContent">,
  NativeStackNavigationProp<RootStackParamList>
>;

export function OfflineContentScreen() {
  const { articles } = useOfflineStore();
  const { isConnected } = useNetworkStatus();
  const navigation = useNavigation<OfflineScreenNavigationProp>();

  if (articles.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-slate-100">
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-lg text-gray-600 text-center">
            Você ainda não tem notícias salvas offline.{"\n"}
            Baixe algumas notícias para ler sem internet!
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const renderItem = ({ item }: { item: NewsResult }) => (
    <NewsCard
      item={item}
      showFavoriteButton={true}
      handlePress={() => {
        navigation.navigate("NewsDetails", { article: item });
      }}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      {!isConnected && (
        <View className="bg-yellow-100 p-4">
          <Text className="text-yellow-800">
            Você está offline. Apenas conteúdo baixado está disponível.
          </Text>
        </View>
      )}

      <View className="flex-1 px-4">
        <Text className="text-lg font-bold my-4">
          Notícias Disponíveis Offline ({articles.length})
        </Text>
        <FlatList
          data={articles}
          renderItem={renderItem}
          keyExtractor={(item) => item.article_id}
          contentContainerStyle={{ paddingVertical: 16 }}
        />
      </View>
    </SafeAreaView>
  );
}
