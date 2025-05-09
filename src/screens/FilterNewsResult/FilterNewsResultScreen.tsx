import { SearchNews } from "@/components/SearchNews";
import React from "react";
import { FlatList, SafeAreaView, View, StyleSheet } from "react-native";
import { NewsCard } from "@/components/NewsCard";
import { useNewsFilterStore } from "@/store/filterStore";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { useHomeScreen } from "@/screens/Home/hooks/useHomeScreen";
import { useTheme } from "@/contexts/ThemeContext";

export const FilterNewsResultScreen = () => {
  const { results } = useNewsFilterStore();
  const { handleEndReached } = useHomeScreen();
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkTheme ? "#111827" : "#f1f5f9",
    },
    content: {
      width: "100%",
      height: "100%",
      alignItems: "center",
      paddingHorizontal: 16,
    },
  });

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
