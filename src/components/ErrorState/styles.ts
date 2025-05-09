import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  icon: {
    color: "#ef4444",
  },
  title: {
    marginTop: 16,
    color: "#1f2937",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "500",
  },
  message: {
    marginTop: 8,
    color: "#4b5563",
    textAlign: "center",
  },
  retryButton: {
    marginTop: 24,
    backgroundColor: "#3b82f6",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 9999,
  },
  retryButtonText: {
    color: "#ffffff",
    fontWeight: "500",
  },
});
