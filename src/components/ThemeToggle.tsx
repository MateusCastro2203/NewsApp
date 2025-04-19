import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      className="flex-row items-center px-4 py-3"
    >
      <Ionicons
        name={theme === "light" ? "sunny" : "moon"}
        size={24}
        className="text-gray-800 dark:text-white mr-3"
      />
      <Text className="text-gray-800 dark:text-white text-base">
        {theme === "light" ? "Modo Escuro" : "Modo Claro"}
      </Text>
    </TouchableOpacity>
  );
}
