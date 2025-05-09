import { StyleSheet } from "react-native";

interface OptionStyleProps {
  isSelected: boolean;
}

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "300",
    marginBottom: 12,
    color: "#111827",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  limitText: {
    color: "#ef4444",
    marginBottom: 8,
  },
});

export const createOptionStyles = ({ isSelected }: OptionStyleProps) =>
  StyleSheet.create({
    option: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 9999,
      marginRight: 8,
      borderWidth: 1,
      marginBottom: 8,
      backgroundColor: isSelected ? "#3b82f6" : "transparent",
      borderColor: isSelected ? "#3b82f6" : "#d1d5db",
    },
    optionText: {
      color: isSelected ? "#ffffff" : "#000000",
    },
  });
