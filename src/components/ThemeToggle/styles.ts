import { StyleSheet } from "react-native";

interface StyleProps {
  isDarkTheme: boolean;
}

export const createStyles = ({ isDarkTheme }: StyleProps) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    icon: {
      marginRight: 12,
      color: isDarkTheme ? "#ffffff" : "#1f2937",
    },
    text: {
      fontSize: 16,
      color: isDarkTheme ? "#ffffff" : "#1f2937",
    },
  });
