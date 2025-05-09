import { StyleSheet } from "react-native";

interface StyleProps {
  isDarkTheme: boolean;
}

export const createStyles = ({ isDarkTheme }: StyleProps) =>
  StyleSheet.create({
    container: {
      width: "100%",
      marginBottom: 16,
      borderRadius: 8,
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      backgroundColor: isDarkTheme ? "#1f2937" : "#ffffff",
    },
    image: {
      width: "100%",
      height: 200,
    },
    buttonsContainer: {
      position: "absolute",
      top: 8,
      right: 8,
    },
    contentContainer: {
      padding: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: isDarkTheme ? "#ffffff" : "#1f2937",
      marginBottom: 8,
    },
    description: {
      fontSize: 14,
      color: isDarkTheme ? "#d1d5db" : "#4b5563",
      marginTop: 8,
    },
  });
