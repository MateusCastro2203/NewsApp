import React from "react";
import { View, Text } from "react-native";
import { MessageProps } from "@/types/chat.types";

export const Messages = ({ text, isUser, timestamp, theme }: MessageProps) => {
  return (
    <View
      className={`mb-2 p-3 rounded-lg max-w-[80%] ${
        isUser
          ? `self-end ${theme === "dark" ? "bg-blue-600" : "bg-blue-500"}`
          : `self-start ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`
      }`}
    >
      <Text
        className={`${
          isUser
            ? "text-white"
            : theme === "dark"
            ? "text-white"
            : "text-gray-800"
        }`}
      >
        {text}
      </Text>
      <Text
        className={`text-xs mt-1 ${
          isUser
            ? "text-blue-200"
            : theme === "dark"
            ? "text-gray-400"
            : "text-gray-500"
        }`}
      >
        {timestamp.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
    </View>
  );
};
