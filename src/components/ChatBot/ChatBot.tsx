import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/contexts/ThemeContext";
import { ChatActionResponse, getChatbotResponse } from "@/services/chatbot";
import { useUserStore } from "@/store/userStore";
import { useChatBotStore } from "@/store/chatBotStore";
import { TypingIndicator } from "./components/TypingIndicator";
import { ChatMessage, ChatBotProps } from "@/types/chat.types";
import { Messages } from "./components/Messages";
import { useNavigation } from "@react-navigation/native";
import { useFilterStore, useNewsFilterStore } from "@/store/filterStore";
import { NewsNavigationProp } from "@/navigation/types";
import { fetchArticlesByQuery } from "@/services/api";

interface CustomChatBotProps {
  articleTitle: string;
  articleContent: string;
  articleLink: string;
  isFirstMessage: boolean;
  setIsFirstMessage: (value: boolean) => void;
  closeModal?: () => void;
}

export const ChatBot = ({
  isFirstMessage,
  setIsFirstMessage,
  articleLink,
  articleTitle,
  closeModal,
}: CustomChatBotProps) => {
  const navigation = useNavigation<NewsNavigationProp>();

  const { setSearchQuery } = useFilterStore();
  const { setResults, setTotalResults, setNextPage, setStatus } =
    useNewsFilterStore();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isIATyping, setIATyping] = useState(false);
  const { getConversationId, conversationId, setConversationId } =
    useChatBotStore();
  const flatListRef = useRef<FlatList>(null);
  const { theme } = useTheme();
  const { user } = useUserStore();

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const link = isFirstMessage ? articleLink : null;
  getConversationId();

  const callChatbot = async () => {
    setIATyping(true);
    const response = await getChatbotResponse(
      "Olá, me fale quem voce é em poucas palavras",
      user?.id || "guest",
      conversationId
    ).finally(() => {
      setIATyping(false);
    });

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: response.response,
        isUser: false,
        timestamp: new Date(),
      },
    ]);
  };

  useEffect(() => {
    callChatbot();
  }, []);

  const handleChatbotAction = async (actionResponse: ChatActionResponse) => {
    if (
      actionResponse.needs_frontend_action &&
      actionResponse.action === "get_news" &&
      actionResponse.params?.tema
    ) {
      const searchTerm = actionResponse.params.tema;
      setSearchQuery(searchTerm);

      const botMessage: ChatMessage = {
        id: Date.now().toString(),
        text: `Buscando notícias sobre "${searchTerm}"...`,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      try {
        const results = await fetchArticlesByQuery({
          searchQuery: searchTerm,
          language: "pt",
          sortBy: "relevancy",
        });

        setResults(results.results);
        setTotalResults(results.totalResults);
        setNextPage(results.nextPage);
        setStatus(results.status);

        const successMessage: ChatMessage = {
          id: Date.now().toString() + 1,
          text: `Encontrei ${results.totalResults} resultados sobre "${searchTerm}". Abrindo resultados...`,
          isUser: false,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, successMessage]);

        setTimeout(() => {
          navigation.navigate("FilterNewsResult");
        }, 1000);
        closeModal?.();
      } catch (error) {
        const errorMessage: ChatMessage = {
          id: Date.now().toString() + 1,
          text: `Desculpe, não consegui buscar notícias sobre "${searchTerm}". Por favor, tente novamente.`,
          isUser: false,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, errorMessage]);
      }
    }
  };

  const handleSend = async () => {
    if (input.trim() === "" || isLoading) return;
    setIATyping(true);
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userInput = input;
    setInput("");
    setIsLoading(true);
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    try {
      const response = await getChatbotResponse(
        userInput,
        link,
        user?.id || "guest",
        conversationId
      ).finally(() => {
        setIATyping(false);
      });

      if (!conversationId) {
        setConversationId(response.conversation_id);
      }
      if (response.needs_frontend_action) {
        await handleChatbotAction(response);
      }

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response.response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsFirstMessage(false);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "Desculpe, ocorreu um erro ao processar sua pergunta. Tente novamente mais tarde.",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className={`flex-1 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
    >
      <View className="flex-1 p-4">
        <Text
          className={`text-lg font-bold mb-4 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          {articleTitle}
        </Text>

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          className="flex-1 mb-4"
          renderItem={({ item }) => (
            <Messages
              text={item.text}
              isUser={item.isUser}
              timestamp={item.timestamp}
              theme={theme}
            />
          )}
          ListFooterComponent={() => (isIATyping ? <TypingIndicator /> : null)}
        />

        <View className="flex-row items-center">
          <TextInput
            className={`flex-1 border rounded-l-full py-2 px-4 ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-100 border-gray-300 text-gray-800"
            }`}
            value={input}
            onChangeText={setInput}
            placeholder="Digite sua pergunta..."
            placeholderTextColor={theme === "dark" ? "#9ca3af" : "#6b7280"}
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity
            onPress={handleSend}
            disabled={isLoading}
            className={`p-3 rounded-r-full ${
              theme === "dark"
                ? isLoading
                  ? "bg-blue-800"
                  : "bg-blue-600"
                : isLoading
                ? "bg-blue-700"
                : "bg-blue-500"
            }`}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Ionicons name="send" size={20} color="white" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
