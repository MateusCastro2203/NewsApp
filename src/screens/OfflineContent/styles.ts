import { StyleSheet } from "react-native";

export const createStyles = (isDarkTheme: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkTheme ? "#111827" : "#f1f5f9",
    },
    content: {
      paddingVertical: 16,
      paddingHorizontal: 16,
    },
    emptyContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
    },
    emptyText: {
      fontSize: 18,
      color: isDarkTheme ? "#d1d5db" : "#4b5563",
      textAlign: "center",
    },
    offlineAlert: {
      backgroundColor: "#fef3c7",
      padding: 16,
    },
    offlineText: {
      color: "#92400e",
    },
    listContent: {
      paddingVertical: 16,
    },
  });
