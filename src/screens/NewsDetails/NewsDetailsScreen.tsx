import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
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
import { createStyles } from "./styles";

type NewsDetailsRouteProp = RouteProp<RootStackParamList, "NewsDetails">;

export const NewsDetailsScreen = () => {
  const route = useRoute<NewsDetailsRouteProp>();
  const { article } = route.params;
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";
  const styles = createStyles(isDarkTheme);

  const [showWebView, setShowWebView] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [isFirstMessage, setIsFirstMessage] = useState(true);

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
