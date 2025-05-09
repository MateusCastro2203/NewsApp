import { StyleSheet } from "react-native";

export const createStyles = (isDarkTheme: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkTheme ? "#111827" : "#f1f5f9",
    },
    content: {
      width: "100%",
      height: "100%",
      alignItems: "center",
      paddingHorizontal: 16,
    },
  });
