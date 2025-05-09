import { StyleSheet } from "react-native";

export const createStyles = (isDarkTheme: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkTheme ? "#111827" : "#f1f5f9",
    },
    emptyContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
    },
    emptyText: {
      fontSize: 18,
      textAlign: "center",
      color: isDarkTheme ? "#d1d5db" : "#4b5563",
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginVertical: 16,
      color: isDarkTheme ? "#ffffff" : "#1f2937",
    },
    listContent: {
      paddingVertical: 16,
    },
  });
