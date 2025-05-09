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
import { createStyles } from "./styles";

export function SearchNews() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { useSearchNews } = useHomeScreen();
  const { handleSearch } = useSearchNews();
  const { theme } = useTheme();

  const isDarkTheme = theme === "dark";
  const isDisabled = isLoading || !searchQuery.trim();
  const styles = createStyles({ isDarkTheme, isDisabled });

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
    <View style={styles.container}>
      <TextInput
        value={searchQuery}
        placeholder="Buscar notícias..."
        style={styles.input}
        placeholderTextColor={isDarkTheme ? "#9ca3af" : "#6b7280"}
        onChangeText={setSearchQuery}
        onSubmitEditing={onSearch}
      />

      <TouchableOpacity
        onPress={onSearch}
        disabled={isDisabled}
        style={styles.button}
      >
        {isLoading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>Buscar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
