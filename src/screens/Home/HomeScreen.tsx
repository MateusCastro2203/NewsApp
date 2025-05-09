import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
  Modal,
} from "react-native";
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
import { ChatBot } from "@/components/ChatBot/ChatBot";

export const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isFirstMessage, setIsFirstMessage] = useState(true);

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

  const handleChatPress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderModal = () => {
    if (!modalVisible) return null;

    return (
      <SafeAreaView className="flex-1">
        <View
          className={`flex-1 m-3 rounded-xl overflow-hidden ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }
          
          `}
        >
          <View
            className={`flex-row justify-between items-center p-4 border-b ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <Text
              className={`text-xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              ChatBot
            </Text>
            <TouchableOpacity onPress={closeModal}>
              <Text
                className={`text-lg ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Fechar
              </Text>
            </TouchableOpacity>
          </View>
          <ChatBot
            articleTitle="Assistente de notícias"
            articleContent="Assistente para responder perguntas sobre notícias"
            articleLink=""
            isFirstMessage={isFirstMessage}
            setIsFirstMessage={setIsFirstMessage}
            closeModal={closeModal}
          />
        </View>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView
      className={`flex-1 ${
        theme === "dark" ? "bg-dark-background2" : "bg-light-background2"
      }`}
    >
      <View
        className={`w-full h-full items-center px-4 ${
          modalVisible ? "opacity-70 bg-black" : "opacity-100"
        }`}
      >
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
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          onRefresh={handleRefresh}
          refreshing={isRefreshing}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
          statusBarTranslucent={true}
        >
          {renderModal()}
        </Modal>

        <View className="flex-row justify-end items-center absolute bottom-5 right-5">
          <TouchableOpacity
            className={`p-2 rounded-full w-20 h-20 items-center justify-center ${
              theme === "dark" ? "bg-blue-700" : "bg-blue-500"
            }`}
            onPress={handleChatPress}
            activeOpacity={0.7}
          >
            <Text className="text-white text-xl font-bold">Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
