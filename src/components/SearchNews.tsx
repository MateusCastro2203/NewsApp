import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { useHomeScreen } from "@/screens/Home/hooks/useHomeScreen";
import { useTheme } from "@/contexts/ThemeContext";

export function SearchNews() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { useSearchNews } = useHomeScreen();
  const { handleSearch } = useSearchNews();
  const { theme } = useTheme();

  const onSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      await handleSearch(searchQuery);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-row justify-center items-center">
      <TextInput
        value={searchQuery}
        placeholder="Buscar notícias..."
        className={`h-10 border border-gray-300 rounded-lg px-4 w-7/12 bg-light-background dark:bg-dark-background text-light-text-primary dark:text-dark-text-primary`}
        placeholderTextColor={theme === "dark" ? "#9ca3af" : "#6b7280"}
        onChangeText={setSearchQuery}
        onSubmitEditing={onSearch}
      />

      <TouchableOpacity
        onPress={onSearch}
        disabled={isLoading || !searchQuery.trim()}
        className={`h-10 ml-2 py-2 px-4 rounded-lg items-center w-4/12 ${
          isLoading || !searchQuery.trim()
            ? "bg-light-secondary/50 dark:bg-dark/50"
            : "bg-light-primary dark:bg-dark-primary active:bg-light-primary/80 dark:active:bg-dark-primary/80"
        }`}
      >
        {isLoading ? (
          <ActivityIndicator color={theme === "dark" ? "#ffffff" : "#ffffff"} />
        ) : (
          <Text className="text-white font-medium">Buscar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
