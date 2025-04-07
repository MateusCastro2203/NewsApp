import { fetchAllArticles } from "@/services/api";

import { UseNewsStore } from "@/store/newsStore";

export const useHomeScreen = async (category: string[]) => {
  //const data = fetchNews();
  const newStore = UseNewsStore.getState();
  try {
    const response = await fetchAllArticles(category);
    console.log(response.results);
    newStore.setResults(response.results);
    newStore.setStatus(response.status);
    newStore.setTotalResults(response.totalResults);
    newStore.setNextPage(response.nextPage);
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  //newsdata.io/api/1/latest?apikey=pub_78082765991020c3d0b6a44052ff7ae1ecc84&category=science
};
