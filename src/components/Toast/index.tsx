import React, { useEffect } from "react";
import { Animated, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles, getToastStyle } from "./styles";

type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type: ToastType;
  onHide: () => void;
}

export function Toast({ message, type, onHide }: ToastProps) {
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => onHide());
  }, []);

  const toastStyle = getToastStyle(type);

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity, backgroundColor: toastStyle.backgroundColor },
      ]}
    >
      <Ionicons name={toastStyle.iconName} size={24} color="white" />
      <Text style={[styles.messageText, { color: toastStyle.textColor }]}>
        {message}
      </Text>
    </Animated.View>
  );
}
