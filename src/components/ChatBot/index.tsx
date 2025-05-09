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
import { createStyles } from "./styles";

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
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

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
  const { user } = useUserStore();

  const styles = createStyles({ isDarkTheme, isLoading });

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
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.articleTitle}>{articleTitle}</Text>

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          style={styles.flatListContainer}
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

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={input}
            onChangeText={setInput}
            placeholder="Digite sua pergunta..."
            placeholderTextColor={isDarkTheme ? "#9ca3af" : "#6b7280"}
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity
            onPress={handleSend}
            disabled={isLoading}
            style={styles.sendButton}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Ionicons name="send" size={20} color="#ffffff" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
