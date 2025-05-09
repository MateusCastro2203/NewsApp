import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ToastType = "success" | "error" | "info";
type IconName = keyof typeof Ionicons.glyphMap;

export const getToastStyle = (type: ToastType) => {
  switch (type) {
    case "success":
      return {
        backgroundColor: "#22c55e", // bg-green-500
        iconName: "checkmark-circle" as IconName,
        textColor: "#ffffff",
      };
    case "error":
      return {
        backgroundColor: "#ef4444", // bg-red-500
        iconName: "alert-circle" as IconName,
        textColor: "#ffffff",
      };
    default:
      return {
        backgroundColor: "#3b82f6", // bg-blue-500
        iconName: "information-circle" as IconName,
        textColor: "#ffffff",
      };
  }
};

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    bottom: 40,
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  messageText: {
    marginLeft: 8,
    fontWeight: "500",
  },
});
