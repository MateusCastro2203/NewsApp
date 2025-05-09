import { StyleSheet } from "react-native";

export const createStyles = (isDarkTheme: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkTheme ? "#111827" : "#f3f4f6",
    },
    webViewContainer: {
      flex: 1,
    },
    loadingContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      zIndex: 10,
    },
    image: {
      width: "100%",
      height: 250,
    },
    contentContainer: {
      padding: 16,
      backgroundColor: isDarkTheme ? "#1f2937" : "#ffffff",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 16,
      lineHeight: 32,
      color: isDarkTheme ? "#ffffff" : "#111827",
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "33%",
    },
    authorRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    authorText: {
      fontSize: 14,
      color: isDarkTheme ? "#d1d5db" : "#4b5563",
    },
    dateText: {
      fontSize: 14,
      color: isDarkTheme ? "#d1d5db" : "#4b5563",
    },
    description: {
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 16,
      color: isDarkTheme ? "#e5e7eb" : "#1f2937",
    },
    chatButton: {
      marginTop: 16,
      borderRadius: 6,
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginBottom: 16,
      backgroundColor: isDarkTheme ? "#059669" : "#10b981",
    },
    readButton: {
      borderRadius: 6,
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: isDarkTheme ? "#2563eb" : "#3b82f6",
    },
    buttonText: {
      color: "#ffffff",
      textAlign: "center",
      fontWeight: "600",
    },
    footerContainer: {
      paddingBottom: 40,
      paddingHorizontal: 20,
      backgroundColor: isDarkTheme ? "#1f2937" : "#ffffff",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 1,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    footerTitle: {
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 8,
      color: isDarkTheme ? "#ffffff" : "#111827",
    },
    footerText: {
      fontSize: 14,
      marginBottom: 4,
      color: isDarkTheme ? "#d1d5db" : "#4b5563",
    },
    backButton: {
      position: "absolute",
      bottom: 80,
      right: 20,
      padding: 12,
      borderRadius: 9999,
      backgroundColor: isDarkTheme ? "#374151" : "#e5e7eb",
    },
    backButtonText: {
      color: isDarkTheme ? "#ffffff" : "#1f2937",
    },
  });
