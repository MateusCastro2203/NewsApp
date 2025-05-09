import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NewsResult } from "@/store/types/news.types";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { FavoriteButton } from "@/components/FavoriteButton";
import { NewsImage } from "@/components/NewsImage";
import { OfflineButton } from "@/components/OfflineButton";
import { useTheme } from "@/contexts/ThemeContext";
import { createStyles } from "./styles";

interface NewsCardProps {
  item: NewsResult;
  showFavoriteButton?: boolean;
  handlePress?: () => void;
}

export const NewsCard = ({
  item,
  showFavoriteButton = true,
  handlePress,
}: NewsCardProps) => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";
  const styles = createStyles({ isDarkTheme });

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <NewsImage
        imageUrl={item.image_url}
        style={styles.image}
        resizeMode="cover"
      />
      {showFavoriteButton && (
        <View style={styles.buttonsContainer}>
          <FavoriteButton article={item} />
        </View>
      )}

      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.description} numberOfLines={3}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
