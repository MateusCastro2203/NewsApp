import { StyleSheet } from "react-native";

interface StyleProps {
  isDarkTheme: boolean;
  isUser: boolean;
}

export const createStyles = ({ isDarkTheme, isUser }: StyleProps) =>
  StyleSheet.create({
    container: {
      marginBottom: 8,
      maxWidth: "85%",
      alignSelf: isUser ? "flex-end" : "flex-start",
    },
    messageContainer: {
      padding: 12,
      borderRadius: 16,
      backgroundColor: isUser
        ? isDarkTheme
          ? "#3b82f6"
          : "#3b82f6"
        : isDarkTheme
        ? "#4b5563"
        : "#f3f4f6",
    },
    messageText: {
      fontSize: 16,
      color: isUser ? "#ffffff" : isDarkTheme ? "#ffffff" : "#1f2937",
    },
    timestampText: {
      fontSize: 12,
      color: isDarkTheme ? "#9ca3af" : "#6b7280",
      marginTop: 4,
      textAlign: isUser ? "right" : "left",
    },
  });
