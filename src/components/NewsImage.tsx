import React, { useState } from "react";
import {
  Image,
  ImageProps,
  View,
  ActivityIndicator,
  Animated,
} from "react-native";

interface NewsImageProps extends Omit<ImageProps, "source"> {
  imageUrl?: string;
  className?: string;
}

const DEFAULT_IMAGE = require("@/assets/images/news-placeholder.png");

export function NewsImage({ imageUrl, className, ...props }: NewsImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const opacity = useState(new Animated.Value(0))[0];
  const thumbnailUrl = imageUrl?.replace(/\.(jpg|jpeg|png)/, "_thumb.$1");
  const [isBlurred, setIsBlurred] = useState(true);

  const handleLoadEnd = () => {
    setIsLoading(false);
    setIsBlurred(false);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View className={`relative ${className}`}>
      <Animated.Image
        source={hasError || !imageUrl ? DEFAULT_IMAGE : { uri: imageUrl }}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={handleLoadEnd}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        className="w-full h-full"
        style={{
          opacity,
        }}
        blurRadius={isBlurred ? 5 : 0}
        {...props}
      />
      {isLoading && (
        <View className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      )}
    </View>
  );
}
