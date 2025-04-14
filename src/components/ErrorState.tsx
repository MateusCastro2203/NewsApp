import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <View className="flex-1 items-center justify-center p-4">
      <Ionicons name="alert-circle" size={48} color="#ef4444" />
      <Text className="mt-4 text-gray-800 text-lg text-center font-medium">
        Ops! Algo deu errado
      </Text>
      <Text className="mt-2 text-gray-600 text-center">{message}</Text>
      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          className="mt-6 bg-blue-500 px-6 py-3 rounded-full"
        >
          <Text className="text-white font-medium">Tentar Novamente</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
