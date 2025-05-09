import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { styles } from "./styles";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "Carregando..." }: LoadingStateProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}
