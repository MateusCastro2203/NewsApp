import { StyleSheet } from "react-native";

interface StyleProps {
  isDarkTheme: boolean;
  isDisabled: boolean;
}

export const createStyles = ({ isDarkTheme, isDisabled }: StyleProps) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    input: {
      height: 40,
      borderWidth: 1,
      borderColor: "#d1d5db",
      borderRadius: 8,
      paddingHorizontal: 16,
      width: "58%",
      backgroundColor: isDarkTheme ? "#1f2937" : "#ffffff",
      color: isDarkTheme ? "#ffffff" : "#1f2937",
    },
    button: {
      height: 40,
      marginLeft: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
      alignItems: "center",
      width: "33%",
      backgroundColor: isDisabled
        ? isDarkTheme
          ? "#4b5563"
          : "#9ca3af"
        : "#3b82f6",
    },
    buttonText: {
      color: "#ffffff",
      fontWeight: "500",
    },
  });
