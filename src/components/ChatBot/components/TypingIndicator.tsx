import React, { useEffect, useRef } from "react";
import { View, Animated, Easing } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";

export const TypingIndicator = () => {
  const { theme } = useTheme();
  const dotColor = theme === "dark" ? "#ffffff" : "#374151";

  // Valores de animação para cada ponto
  const dot1Opacity = useRef(new Animated.Value(0.3)).current;
  const dot2Opacity = useRef(new Animated.Value(0.3)).current;
  const dot3Opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animateDots = () => {
      Animated.sequence([
        // Anima o primeiro ponto
        Animated.timing(dot1Opacity, {
          toValue: 1,
          duration: 400,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        // Anima o segundo ponto
        Animated.timing(dot2Opacity, {
          toValue: 1,
          duration: 400,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        // Anima o terceiro ponto
        Animated.timing(dot3Opacity, {
          toValue: 1,
          duration: 400,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        // Reseta todos os pontos
        Animated.parallel([
          Animated.timing(dot1Opacity, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot2Opacity, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot3Opacity, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ]).start(animateDots);
    };

    animateDots();
    return () => {
      // Limpa animação
      dot1Opacity.stopAnimation();
      dot2Opacity.stopAnimation();
      dot3Opacity.stopAnimation();
    };
  }, []);

  const dotStyle = {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: dotColor,
    marginHorizontal: 3,
  };

  return (
    <View
      className={`mb-2 p-3 rounded-lg flex-row max-w-[80%] ${`self-start ${
        theme === "dark" ? "bg-gray-700" : "bg-gray-200"
      }`}`}
    >
      <Animated.View style={[dotStyle, { opacity: dot1Opacity }]} />
      <Animated.View style={[dotStyle, { opacity: dot2Opacity }]} />
      <Animated.View style={[dotStyle, { opacity: dot3Opacity }]} />
    </View>
  );
};
