import { StyleSheet } from "react-native";

interface StyleProps {
  isDarkTheme: boolean;
}

export const createStyles = ({ isDarkTheme }: StyleProps) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      flexDirection: "row",
      width: "8.33%", // Equivalente a w-1/12
    },
    button: {
      borderRadius: 9999,
      padding: 8,
    },
    icon: {
      color: isDarkTheme ? "#ffffff" : "#1f2937",
    },
  });
