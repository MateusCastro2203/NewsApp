import React from "react";
import { View, Text } from "react-native";
import { createStyles } from "./styles";

interface MessagesProps {
  text: string;
  isUser: boolean;
  timestamp: Date;
  theme: "light" | "dark";
}

export const Messages = ({ text, isUser, timestamp, theme }: MessagesProps) => {
  const isDarkTheme = theme === "dark";
  const styles = createStyles({ isDarkTheme, isUser });

  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>{text}</Text>
      </View>
      <Text style={styles.timestampText}>
        {timestamp.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
    </View>
  );
};
