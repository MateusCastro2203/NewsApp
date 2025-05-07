/**
 * Este arquivo foi criado para substituir temporariamente o NativeWind
 * e evitar erros após sua remoção.
 */

import { StyleSheet } from "react-native";

// Estilos padrão que serão usados no lugar do tailwind
export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  text: {
    color: "#000000",
  },
  darkText: {
    color: "#ffffff",
  },
  darkContainer: {
    flex: 1,
    backgroundColor: "#121212",
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
  },
  padding: {
    padding: 16,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
  },
});

// Esta função não faz nada - apenas para evitar erros ao usar className
export const ignoreClassName = (props: any) => {
  const newProps = { ...props };
  if (newProps.className) {
    delete newProps.className;
  }
  return newProps;
};
