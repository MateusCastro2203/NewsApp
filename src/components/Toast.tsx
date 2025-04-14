import React, { useEffect } from "react";
import { Animated, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type: ToastType;
  onHide: () => void;
}

const getToastStyle = (type: ToastType) => {
  switch (type) {
    case "success":
      return {
        bg: "bg-green-500",
        icon: "checkmark-circle",
        color: "text-white",
      };
    case "error":
      return {
        bg: "bg-red-500",
        icon: "alert-circle",
        color: "text-white",
      };
    default:
      return {
        bg: "bg-blue-500",
        icon: "information-circle",
        color: "text-white",
      };
  }
};

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

  const style = getToastStyle(type);

  return (
    <Animated.View
      style={{ opacity }}
      className={`absolute w-full bottom-10  p-4 rounded-lg flex-row items-center ${style.bg}`}
    >
      <Ionicons name={style.icon} size={24} color="white" />
      <Text className={`ml-2 ${style.color} font-medium`}>{message}</Text>
    </Animated.View>
  );
}
