import React, { useState } from "react";
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

type NewsDetailsRouteProp = RouteProp<RootStackParamList, "NewsDetails">;

export const NewsDetailsScreen = () => {
  const route = useRoute<NewsDetailsRouteProp>();
  const { article } = route.params;

  const [showWebView, setShowWebView] = useState(false); // Estado para alternar entre detalhes e WebView
  const [loading, setLoading] = useState(true); // Estado para controlar o indicador de carregamento

  if (showWebView) {
    return (
      <View style={{ flex: 1 }}>
        {/* Exibe o indicador de carregamento enquanto a WebView carrega */}
        {loading && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.8)", // Fundo semitransparente
              zIndex: 1, // Garante que o indicador fique acima da WebView
            }}
          >
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        <WebView
          style={{
            flex: 1,
            marginTop: Constants.statusBarHeight,
          }}
          source={{ uri: article.link }}
          onLoadStart={() => setLoading(true)} // Inicia o loading
          onLoadEnd={() => setLoading(false)} // Finaliza o loading
        />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView className="flex-1">
        {/* Imagem de destaque */}
        <Image
          source={{ uri: article.image_url }}
          className="w-full h-64"
          resizeMode="cover"
        />
        <View className="p-4 bg-white shadow-md rounded-b-lg">
          {/* Título */}
          <Text className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {article.title}
          </Text>
          {/* Informações do autor e data */}
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-gray-600 text-sm">
              {article.creator
                ? `Por ${article.creator}`
                : "Autor desconhecido"}
            </Text>
            <Text className="text-gray-600 text-sm">
              {new Date(article.pubDate).toLocaleDateString()}
            </Text>
          </View>
          {/* Descrição */}
          <Text className="text-base text-gray-800 leading-relaxed mb-4">
            {article.description}
          </Text>
          {/* Botão para abrir o artigo completo */}
          <TouchableOpacity
            onPress={() => setShowWebView(true)}
            className="bg-blue-500 rounded-md py-3 px-4"
          >
            <Text className="text-white text-center font-semibold">
              Leia o artigo completo
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* Informações adicionais fixadas no final */}
      <View className="p-10 bg-white shadow-sm rounded-t-lg">
        <Text className="text-lg font-semibold text-gray-900 mb-2">
          Informações adicionais
        </Text>
        <Text className="text-gray-600 text-sm mb-1">
          Fonte: {article.source_name}
        </Text>
        <Text className="text-gray-600 text-sm mb-1">
          Categoria: {article.category.join(", ")}
        </Text>
        <Text className="text-gray-600 text-sm">
          País: {article.country.join(", ")}
        </Text>
      </View>
    </View>
  );
};
