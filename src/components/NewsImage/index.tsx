import React, { useState } from "react";
import {
  Image,
  ImageProps,
  View,
  ActivityIndicator,
  Animated,
  StyleProp,
  ImageStyle,
} from "react-native";
import { styles } from "./styles";

interface NewsImageProps extends Omit<ImageProps, "source"> {
  imageUrl?: string;
  style?: StyleProp<ImageStyle>;
}

const DEFAULT_IMAGE = require("@/assets/images/news-placeholder.png");

export function NewsImage({ imageUrl, style, ...props }: NewsImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const opacity = useState(new Animated.Value(0))[0];
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
    <View style={[styles.container, style]}>
      <Animated.Image
        source={hasError || !imageUrl ? DEFAULT_IMAGE : { uri: imageUrl }}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={handleLoadEnd}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        style={[
          styles.image,
          {
            opacity,
          },
        ]}
        {...props}
      />
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      )}
    </View>
  );
}
