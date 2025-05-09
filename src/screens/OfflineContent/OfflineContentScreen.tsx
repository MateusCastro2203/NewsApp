import React, { useMemo } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
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
import { useTheme } from "@/contexts/ThemeContext";

type OfflineScreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<RootDrawerParamList, "OfflineContent">,
  NativeStackNavigationProp<RootStackParamList>
>;

export function OfflineContentScreen() {
  const { articles } = useOfflineStore();
  const { isConnected } = useNetworkStatus();
  const navigation = useNavigation<OfflineScreenNavigationProp>();
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkTheme ? "#111827" : "#f1f5f9",
    },
    content: {
      paddingVertical: 16,
      paddingHorizontal: 16,
    },
    emptyContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
    },
    emptyText: {
      fontSize: 18,
      color: isDarkTheme ? "#d1d5db" : "#4b5563",
      textAlign: "center",
    },
    offlineAlert: {
      backgroundColor: "#fef3c7",
      padding: 16,
    },
    offlineText: {
      color: "#92400e",
    },
    listContent: {
      paddingVertical: 16,
    },
  });

  const isOffline = useMemo(() => {
    return (
      <View style={styles.offlineAlert}>
        <Text style={styles.offlineText}>
          Você está offline. Apenas conteúdo baixado está disponível.
        </Text>
      </View>
    );
  }, [isConnected]);

  if (articles.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
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
    <View style={styles.content}>
      {!isConnected && isOffline}
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item) => item.article_id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}
