import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
  Modal,
  StyleSheet,
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

export const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isFirstMessage, setIsFirstMessage] = useState(true);

  const { category } = usePreferencesStore();

  const { results } = UseNewsStore();

  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkTheme ? "#1e1e1e" : "#f1f5f9",
    },
    content: {
      width: "100%",
      height: "100%",
      alignItems: "center",
      paddingHorizontal: 16,
      opacity: modalVisible ? 0.7 : 1,
      backgroundColor: modalVisible ? "black" : "transparent",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 8,
    },
    modalContainer: {
      flex: 1,
    },
    modalContent: {
      flex: 1,
      margin: 12,
      borderRadius: 12,
      overflow: "hidden",
      backgroundColor: isDarkTheme ? "#1f2937" : "#ffffff",
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDarkTheme ? "#374151" : "#e5e7eb",
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: isDarkTheme ? "#ffffff" : "#1f2937",
    },
    closeButton: {
      fontSize: 18,
      color: isDarkTheme ? "#d1d5db" : "#4b5563",
    },
    chatButton: {
      padding: 8,
      borderRadius: 9999,
      width: 80,
      height: 80,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isDarkTheme ? "#1d4ed8" : "#3b82f6",
    },
    chatButtonText: {
      color: "#ffffff",
      fontSize: 20,
      fontWeight: "bold",
    },
    chatButtonContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      position: "absolute",
      bottom: 20,
      right: 20,
    },
  });

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
      <View style={styles.content}>
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
