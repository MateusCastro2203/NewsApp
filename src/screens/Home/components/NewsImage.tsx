import React, { useState } from "react";
import { Image, ImageProps, View, ActivityIndicator } from "react-native";

interface NewsImageProps extends Omit<ImageProps, "source"> {
  imageUrl?: string;
  className?: string;
}

const DEFAULT_IMAGE = require("@/assets/images/news-placeholder.png");

export function NewsImage({ imageUrl, className, ...props }: NewsImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  console.log("HAS ERROR", imageUrl);

  return (
    <View className={`relative ${className}`}>
      <Image
        source={hasError || !imageUrl ? DEFAULT_IMAGE : { uri: imageUrl }}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        className="w-full h-full"
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
