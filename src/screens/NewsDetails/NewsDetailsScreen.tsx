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
import { options } from "@/store/types/onboarding";
import { NewsImage } from "../Home/components/NewsImage";

type NewsDetailsRouteProp = RouteProp<RootStackParamList, "NewsDetails">;

export const NewsDetailsScreen = () => {
  const route = useRoute<NewsDetailsRouteProp>();
  const { article } = route.params;

  const [showWebView, setShowWebView] = useState(false);
  const [loading, setLoading] = useState(true);
  const category = options.find(
    (option) => option.value === article.category[0]
  );

  if (showWebView) {
    return (
      <View style={{ flex: 1 }}>
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
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              zIndex: 1,
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
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView className="flex-1">
        <NewsImage
          imageUrl={article.image_url}
          className="w-full h-52"
          resizeMode="cover"
        />

        <View className="p-4 bg-white shadow-md rounded-b-lg">
          <Text className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {article.title}
          </Text>

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

          <Text className="text-base text-gray-800 leading-relaxed mb-4">
            {article.description}
          </Text>

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

      <View className="p-10 bg-white shadow-sm rounded-t-lg">
        <Text className="text-lg font-semibold text-gray-900 mb-2">
          Informações adicionais
        </Text>
        <Text className="text-gray-600 text-sm mb-1">
          Fonte: {article.source_name}
        </Text>
        <Text className="text-gray-600 text-sm mb-1">
          Categoria: {category?.label}
        </Text>
        <Text className="text-gray-600 text-sm">
          País: {article.country.join(", ")}
        </Text>
      </View>
    </View>
  );
};
