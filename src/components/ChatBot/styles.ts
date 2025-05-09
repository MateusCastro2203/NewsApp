import { StyleSheet } from "react-native";

interface StyleProps {
  isDarkTheme: boolean;
  isLoading?: boolean;
}

export const createStyles = ({ isDarkTheme, isLoading }: StyleProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkTheme ? "#1f2937" : "#ffffff",
    },
    contentContainer: {
      flex: 1,
      padding: 16,
    },
    articleTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 16,
      color: isDarkTheme ? "#ffffff" : "#1f2937",
    },
    flatListContainer: {
      flex: 1,
      marginBottom: 16,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    textInput: {
      flex: 1,
      borderWidth: 1,
      borderRightWidth: 0,
      borderTopLeftRadius: 9999,
      borderBottomLeftRadius: 9999,
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: isDarkTheme ? "#374151" : "#f3f4f6",
      borderColor: isDarkTheme ? "#4b5563" : "#d1d5db",
      color: isDarkTheme ? "#ffffff" : "#1f2937",
    },
    sendButton: {
      padding: 12,
      borderTopRightRadius: 9999,
      borderBottomRightRadius: 9999,
      backgroundColor: isLoading
        ? isDarkTheme
          ? "#4b5563"
          : "#d1d5db"
        : isDarkTheme
        ? "#3b82f6"
        : "#3b82f6",
    },
    sendIcon: {
      color: "#ffffff",
    },
    loadingIndicator: {
      color: "#ffffff",
    },
  });
