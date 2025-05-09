import { StyleSheet } from "react-native";

export const createStyles = (isDarkTheme: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkTheme ? "#1e1e1e" : "#f1f5f9",
    },
    content: {
      width: "100%",
      height: "100%",
      alignItems: "center",
      paddingHorizontal: 16,
      opacity: 1,
      backgroundColor: "transparent",
    },
    contentDimmed: {
      opacity: 0.7,
      backgroundColor: "black",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 8,
    },
    modalContainer: {
      flex: 1,
    },
    modalContent: {
      flex: 1,
      margin: 12,
      borderRadius: 12,
      overflow: "hidden",
      backgroundColor: isDarkTheme ? "#1f2937" : "#ffffff",
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDarkTheme ? "#374151" : "#e5e7eb",
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: isDarkTheme ? "#ffffff" : "#1f2937",
    },
    closeButton: {
      fontSize: 18,
      color: isDarkTheme ? "#d1d5db" : "#4b5563",
    },
    chatButton: {
      padding: 8,
      borderRadius: 9999,
      width: 80,
      height: 80,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isDarkTheme ? "#1d4ed8" : "#3b82f6",
    },
    chatButtonText: {
      color: "#ffffff",
      fontSize: 20,
      fontWeight: "bold",
    },
    chatButtonContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      position: "absolute",
      bottom: 20,
      right: 20,
    },
  });
