import { useToast } from "@/hooks/useToast";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { fetchAllArticles, fetchArticlesByQuery } from "@/services/api";
import { usePreferencesStore } from "@/store";
import { useFilterStore, useNewsFilterStore } from "@/store/filterStore";

import { UseNewsStore } from "@/store/newsStore";
import { NewsResult } from "@/store/types/news.types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useState } from "react";

type NewsNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export const useHomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const showToast = useToast((state) => state.showToast);

  const [isLoadingNextPage, setIsLoadingNextPage] = useState(false);
  const newsStore = UseNewsStore.getState();
  const { category } = usePreferencesStore();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  const homeScreen = async (category: string[]) => {
    //const data = fetchNews();

    try {
      setIsLoading(true);
      const response = await fetchAllArticles(category);
      newsStore.setResults(response.results);
      newsStore.setStatus(response.status);
      newsStore.setTotalResults(response.totalResults);
      newsStore.setNextPage(response.nextPage);
      showToast("Notícias atualizadas com sucesso!", "success");
    } catch (e) {
      setError("Não foi possível carregar as notícias. Verifique sua conexão.");
      showToast("Erro ao carregar notícias", "error");
    } finally {
      setIsLoading(false);
    }

    //newsdata.io/api/1/latest?apikey=pub_78082765991020c3d0b6a44052ff7ae1ecc84&category=science
  };

  const handleEndReached = async () => {
    if (newsStore.nextPage === null) return;
    if (isLoadingNextPage) return;
    try {
      setIsLoadingNextPage(true);
      await useNextpage(category);
    } catch (error) {
      setError("Não foi possível carregar as notícias. Verifique sua conexão.");
      showToast("Erro ao carregar notícias", "error");
    } finally {
      setIsLoadingNextPage(false);
    }
  };

  const useNextpage = async (category: string[]) => {
    try {
      setIsLoadingNextPage(true);
      const response = await fetchAllArticles(category, newsStore.nextPage);
      newsStore.setResults([...newsStore.results, ...response.results]);
      newsStore.setStatus(response.status);
      newsStore.setTotalResults(response.totalResults);
      newsStore.setNextPage(response.nextPage);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await homeScreen(category);
      setDataFetched(false); // Reseta o dataFetched para permitir nova carga
    } catch (error) {
      // Tratar erro se necessário
    } finally {
      setIsRefreshing(false);
    }
  };

  const useSearchNews = () => {
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
          if (response && response.results) {
            newsStore.setResults(response.results);
            newsStore.setStatus("success");
            newsStore.setTotalResults(response.totalResults || 0);
            // newsStore.setNextPage(response.nextPage);
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

  return {
    homeScreen,
    useNextpage,
    useSearchNews,
    isLoading,
    error,
    handleEndReached,
    handleRefresh,
    isRefreshing,
    dataFetched,
  };
};
