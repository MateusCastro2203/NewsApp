import { StyleSheet } from "react-native";

interface StyleProps {
  isAvailableOffline: boolean;
}

export const createStyles = ({ isAvailableOffline }: StyleProps) =>
  StyleSheet.create({
    button: {
      padding: 8,
      borderRadius: 9999,
      backgroundColor: "rgba(243, 244, 246, 0.9)", // bg-gray-100 com transparência
      marginBottom: 8,
    },
    icon: {
      color: isAvailableOffline ? "#22c55e" : "#6b7280",
    },
  });
