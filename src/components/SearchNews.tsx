import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { useSearchNews } from "@/screens/Home/hooks/useHomeScreen";

export function SearchNews() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { handleSearch } = useSearchNews();

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
    <View className="px-4 py-2 flex-row">
      <TextInput
        value={searchQuery}
        placeholder="Buscar notícias..."
        className="h-10 border border-gray-300 rounded-lg px-4 mb-4 bg-white w-8/12"
        placeholderTextColor="#9ca3af"
        onChangeText={setSearchQuery}
        onSubmitEditing={onSearch}
      />

      <TouchableOpacity
        onPress={onSearch}
        disabled={isLoading || !searchQuery.trim()}
        className={`h-10 ml-2 py-2 px-4 rounded-lg items-center w-4/12 ${
          isLoading || !searchQuery.trim()
            ? "bg-blue-300"
            : "bg-blue-500 active:bg-blue-600"
        }`}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-medium">Buscar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
