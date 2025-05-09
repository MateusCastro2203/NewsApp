import { StyleSheet } from "react-native";

interface StyleProps {
  isDarkTheme: boolean;
}

export const createStyles = ({ isDarkTheme }: StyleProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkTheme ? "#111827" : "#ffffff",
    },
    content: {
      padding: 16,
    },
    menuItemContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      marginBottom: 4,
    },
    menuIcon: {
      marginRight: 12,
      color: isDarkTheme ? "#e5e7eb" : "#4b5563",
    },
    menuText: {
      fontSize: 16,
      color: isDarkTheme ? "#e5e7eb" : "#1f2937",
    },
    themeToggleContainer: {
      marginTop: "auto",
      borderTopWidth: 1,
      borderTopColor: isDarkTheme ? "#374151" : "#e5e7eb",
    },
    themeToggle: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
