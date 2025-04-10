import { RootStackParamList } from "@/navigation/AppNavigator";
import { fetchAllArticles, fetchArticlesByQuery } from "@/services/api";
import { useFilterStore, useNewsFilterStore } from "@/store/filterStore";

import { UseNewsStore } from "@/store/newsStore";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useState } from "react";

type NewsNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export const useHomeScreen = async (category: string[]) => {
  //const data = fetchNews();
  const newStore = UseNewsStore.getState();
  try {
    const response = await fetchAllArticles(category);
    newStore.setResults(response.results);
    newStore.setStatus(response.status);
    newStore.setTotalResults(response.totalResults);
    newStore.setNextPage(response.nextPage);
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  //newsdata.io/api/1/latest?apikey=pub_78082765991020c3d0b6a44052ff7ae1ecc84&category=science
};

export const useSearchNews = () => {
  const navigation = useNavigation<NewsNavigationProp>();
  const newsStore = useNewsFilterStore();
  const filters = useFilterStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useCallback(
    async (query: string) => {
      if (isLoading || !query.trim()) return;

      setIsLoading(true);
      try {
        const response = await fetchArticlesByQuery({
          ...filters,
          searchQuery: query,
        });
        console.log("response", response.results);
        if (response && response.results) {
          newsStore.setResults(response.results);
          newsStore.setStatus("success");
          newsStore.setTotalResults(response.totalResults || 0);
          // newsStore.setNextPage(response.nextPage); // Remova se a API não suportar

          navigation.navigate("FilterNewsResult");
        }
      } catch (error) {
        console.error("Erro na busca:", error);
        newsStore.setStatus("error");
      } finally {
        setIsLoading(false);
      }
    },
    [filters, newsStore, navigation, isLoading]
  );

  return { handleSearch, isLoading };
};
