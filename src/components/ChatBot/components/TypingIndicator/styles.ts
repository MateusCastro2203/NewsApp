import { StyleSheet } from "react-native";

interface StyleProps {
  isDarkTheme: boolean;
  dotColor: string;
}

export const createStyles = ({ isDarkTheme, dotColor }: StyleProps) =>
  StyleSheet.create({
    container: {
      marginBottom: 8,
      padding: 12,
      borderRadius: 8,
      flexDirection: "row",
      maxWidth: "80%",
      alignSelf: "flex-start",
      backgroundColor: isDarkTheme ? "#4b5563" : "#e5e7eb",
    },
    dot: {
      width: 5,
      height: 5,
      borderRadius: 2.5,
      backgroundColor: dotColor,
      marginHorizontal: 3,
    },
  });
