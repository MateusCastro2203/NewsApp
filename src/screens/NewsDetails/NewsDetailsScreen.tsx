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
import { ChatBot } from "@/components/ChatBot/ChatBot";

type NewsDetailsRouteProp = RouteProp<RootStackParamList, "NewsDetails">;

export const NewsDetailsScreen = () => {
  const route = useRoute<NewsDetailsRouteProp>();
  const { article } = route.params;
  const { theme } = useTheme();

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
      <View className="flex-1">
        <ChatBot
          articleTitle={article.title}
          articleContent={article.content || article.description}
          articleLink={article.link}
          isFirstMessage={isFirstMessage}
          setIsFirstMessage={setIsFirstMessage}
        />
        <TouchableOpacity
          onPress={toggleChat}
          className={`absolute bottom-20 right-5 p-3 rounded-full ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-200"
          }`}
        >
          <Text className={theme === "dark" ? "text-white" : "text-gray-800"}>
            Voltar
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (showWebView) {
    return (
      <View className="flex-1">
        {loading && (
          <View className="absolute inset-0 justify-center items-center bg-white/80 z-10">
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        <WebView
          className="flex-1"
          style={{ marginTop: Constants.statusBarHeight }}
          source={{ uri: article.link }}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        />
      </View>
    );
  }

  return (
    <View
      className={`flex-1 ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}
    >
      <ScrollView className="flex-1">
        <Image
          source={{ uri: article.image_url }}
          className="w-full h-64"
          resizeMode="cover"
        />
        <View
          className={`p-4 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          } shadow-md rounded-b-lg`}
        >
          <Text
            className={`text-3xl font-bold mb-4 leading-tight ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {article.title}
          </Text>
          <View className="flex-row justify-between w-4/12">
            <FavoriteButton article={article} />
            <ShareButton article={article} />
            <OfflineButton article={article} />
          </View>
          <View className="flex-row items-center justify-between mb-4">
            <Text
              className={`text-sm ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {article.creator
                ? `Por ${article.creator}`
                : "Autor desconhecido"}
            </Text>
            <Text
              className={`text-sm ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {new Date(article.pubDate).toLocaleDateString()}
            </Text>
          </View>
          <Text
            className={`text-base leading-relaxed mb-4 ${
              theme === "dark" ? "text-gray-200" : "text-gray-800"
            }`}
          >
            {article.description}
          </Text>
          <TouchableOpacity
            onPress={toggleChat}
            className={`mt-4 rounded-md py-3 px-4 mb-4 ${
              theme === "dark" ? "bg-green-600" : "bg-green-500"
            }`}
          >
            <Text className="text-white text-center font-semibold">
              Perguntar ao Scooby sobre esta notícia
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleWebViewPress}
            className={`rounded-md py-3 px-4 ${
              theme === "dark" ? "bg-blue-600" : "bg-blue-500"
            }`}
          >
            <Text className="text-white text-center font-semibold">
              Leia o artigo completo
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View
        className={` pb-10 px-5 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } shadow-sm rounded-t-lg`}
      >
        <Text
          className={`text-lg font-semibold mb-2 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Informações adicionais
        </Text>
        <Text
          className={`text-sm mb-1 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Fonte: {article.source_name}
        </Text>
        <Text
          className={`text-sm mb-1 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Categoria: {article.category.join(", ")}
        </Text>
        <Text
          className={`text-sm ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          País: {article.country.join(", ")}
        </Text>
      </View>
    </View>
  );
};
