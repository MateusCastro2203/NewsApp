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
import { ChatBot } from "@/components/ChatBot";
import { createStyles } from "./styles";

export const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isFirstMessage, setIsFirstMessage] = useState(true);

  const { category } = usePreferencesStore();

  const { results } = UseNewsStore();

  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";
  const styles = createStyles(isDarkTheme);

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
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>ChatBot</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.closeButton}>Fechar</Text>
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
    <SafeAreaView style={styles.container}>
      <View style={[styles.content, modalVisible && styles.contentDimmed]}>
        <View style={styles.header}>
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

        <View style={styles.chatButtonContainer}>
          <TouchableOpacity
            style={styles.chatButton}
            onPress={handleChatPress}
            activeOpacity={0.7}
          >
            <Text style={styles.chatButtonText}>Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
