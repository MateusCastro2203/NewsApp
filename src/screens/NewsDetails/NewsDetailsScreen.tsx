import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "@/navigation/AppNavigator";
import Constants from "expo-constants";
import WebView from "react-native-webview";
import { FavoriteButton } from "@/components/FavoriteButton";
import { ShareButton } from "@/components/ShareButton";
import { useTheme } from "@/contexts/ThemeContext";
import { OfflineButton } from "@/components/OfflineButton";
import { ChatBot } from "@/components/ChatBot";

type NewsDetailsRouteProp = RouteProp<RootStackParamList, "NewsDetails">;

export const NewsDetailsScreen = () => {
  const route = useRoute<NewsDetailsRouteProp>();
  const { article } = route.params;
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  const [showWebView, setShowWebView] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [isFirstMessage, setIsFirstMessage] = useState(true);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkTheme ? "#111827" : "#f3f4f6",
    },
    webViewContainer: {
      flex: 1,
    },
    loadingContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      zIndex: 10,
    },
    image: {
      width: "100%",
      height: 250,
    },
    contentContainer: {
      padding: 16,
      backgroundColor: isDarkTheme ? "#1f2937" : "#ffffff",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 16,
      lineHeight: 32,
      color: isDarkTheme ? "#ffffff" : "#111827",
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "33%",
    },
    authorRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    authorText: {
      fontSize: 14,
      color: isDarkTheme ? "#d1d5db" : "#4b5563",
    },
    dateText: {
      fontSize: 14,
      color: isDarkTheme ? "#d1d5db" : "#4b5563",
    },
    description: {
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 16,
      color: isDarkTheme ? "#e5e7eb" : "#1f2937",
    },
    chatButton: {
      marginTop: 16,
      borderRadius: 6,
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginBottom: 16,
      backgroundColor: isDarkTheme ? "#059669" : "#10b981",
    },
    readButton: {
      borderRadius: 6,
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: isDarkTheme ? "#2563eb" : "#3b82f6",
    },
    buttonText: {
      color: "#ffffff",
      textAlign: "center",
      fontWeight: "600",
    },
    footerContainer: {
      paddingBottom: 40,
      paddingHorizontal: 20,
      backgroundColor: isDarkTheme ? "#1f2937" : "#ffffff",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 1,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    footerTitle: {
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 8,
      color: isDarkTheme ? "#ffffff" : "#111827",
    },
    footerText: {
      fontSize: 14,
      marginBottom: 4,
      color: isDarkTheme ? "#d1d5db" : "#4b5563",
    },
    backButton: {
      position: "absolute",
      bottom: 80,
      right: 20,
      padding: 12,
      borderRadius: 9999,
      backgroundColor: isDarkTheme ? "#374151" : "#e5e7eb",
    },
    backButtonText: {
      color: isDarkTheme ? "#ffffff" : "#1f2937",
    },
  });

  const handleWebViewPress = () => {
    setShowWebView(true);
  };

  const toggleChat = () => {
    setShowChat(!showChat);
    setIsFirstMessage(true);
  };
  const handleSetIsFirstMessage = useCallback((value: boolean) => {
    setIsFirstMessage(value);
  }, []);

  if (showChat) {
    return (
      <View style={styles.container}>
        <ChatBot
          articleTitle={article.title}
          articleContent={article.content || article.description}
          articleLink={article.link}
          isFirstMessage={isFirstMessage}
          setIsFirstMessage={setIsFirstMessage}
        />
        <TouchableOpacity onPress={toggleChat} style={styles.backButton}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (showWebView) {
    return (
      <View style={styles.webViewContainer}>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        <WebView
          style={{ marginTop: Constants.statusBarHeight }}
          source={{ uri: article.link }}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          source={{ uri: article.image_url }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{article.title}</Text>
          <View style={styles.buttonRow}>
            <FavoriteButton article={article} />
            <ShareButton article={article} />
            <OfflineButton article={article} />
          </View>
          <View style={styles.authorRow}>
            <Text style={styles.authorText}>
              {article.creator
                ? `Por ${article.creator}`
                : "Autor desconhecido"}
            </Text>
            <Text style={styles.dateText}>
              {new Date(article.pubDate).toLocaleDateString()}
            </Text>
          </View>
          <Text style={styles.description}>{article.description}</Text>
          <TouchableOpacity onPress={toggleChat} style={styles.chatButton}>
            <Text style={styles.buttonText}>
              Perguntar ao Scooby sobre esta notícia
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleWebViewPress}
            style={styles.readButton}
          >
            <Text style={styles.buttonText}>Leia o artigo completo</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <Text style={styles.footerTitle}>Informações adicionais</Text>
        <Text style={styles.footerText}>Fonte: {article.source_name}</Text>
        <Text style={styles.footerText}>
          Categoria: {article.category.join(", ")}
        </Text>
        <Text style={styles.footerText}>
          País: {article.country.join(", ")}
        </Text>
      </View>
    </View>
  );
};
