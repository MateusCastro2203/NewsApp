import { SearchNews } from "@/components/SearchNews";
import React from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { NewsCard } from "@/components/NewsCard";
import { useNewsFilterStore } from "@/store/filterStore";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { useHomeScreen } from "@/screens/Home/hooks/useHomeScreen";
import { useTheme } from "@/contexts/ThemeContext";
import { createStyles } from "./styles";

export const FilterNewsResultScreen = () => {
  const { results } = useNewsFilterStore();
  const { handleEndReached } = useHomeScreen();
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";
  const styles = createStyles(isDarkTheme);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <FlatList
          data={results}
          renderItem={({ item }) => (
            <NewsCard
              item={item}
              key={item.article_id}
              handlePress={() => {
                navigation.navigate("NewsDetails", { article: item });
              }}
            />
          )}
          keyExtractor={(item) => item.article_id}
          onEndReached={() => {
            handleEndReached();
          }}
          onEndReachedThreshold={0.5}
        />
      </View>
    </SafeAreaView>
  );
};
