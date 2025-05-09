import { StyleSheet } from "react-native";

interface ButtonStyleProps {
  isDisabled: boolean;
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  content: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f3f4f6",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1f2937",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: "center",
    color: "#4b5563",
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: 16,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#1f2937",
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 4,
    color: "#4b5563",
  },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
    width: "100%",
    color: "#1f2937",
  },
  errorText: {
    color: "#ef4444",
    marginBottom: 4,
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#1f2937",
  },
});

export const createButtonStyles = ({ isDisabled }: ButtonStyleProps) =>
  StyleSheet.create({
    button: {
      marginTop: 16,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 6,
      backgroundColor: isDisabled ? "#9ca3af" : "#3b82f6",
    },
    buttonText: {
      color: "#ffffff",
      textAlign: "center",
      fontWeight: "600",
    },
  });
