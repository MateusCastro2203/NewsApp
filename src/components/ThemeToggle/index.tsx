import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/contexts/ThemeContext";
import { createStyles } from "./styles";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDarkTheme = theme === "dark";
  const styles = createStyles({ isDarkTheme });

  return (
    <TouchableOpacity onPress={toggleTheme} style={styles.container}>
      <Ionicons
        name={isDarkTheme ? "moon" : "sunny"}
        size={24}
        style={styles.icon}
      />
      <Text style={styles.text}>
        {isDarkTheme ? "Modo Claro" : "Modo Escuro"}
      </Text>
    </TouchableOpacity>
  );
}
