import React from "react";
import { View, ActivityIndicator, Text } from "react-native";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "Carregando..." }: LoadingStateProps) {
  return (
    <View className="flex-1 items-center justify-center bg-white/80">
      <ActivityIndicator size="large" color="#0000ff" />
      <Text className="mt-4 text-gray-600 font-medium">{message}</Text>
    </View>
  );
}
