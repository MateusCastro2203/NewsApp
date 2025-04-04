import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useHomeScreen } from "./hooks/useHomeScreen";
import { usePreferencesStore } from "@/store";

export const HomeScreen = () => {
  const { category } = usePreferencesStore();
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!category || dataFetched) return; // Evita chamadas desnecessárias
      try {
        await useHomeScreen(category);

        setDataFetched(true); // Marca como buscado
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [category, dataFetched]);
  return (
    <View>
      <Text>OI</Text>
    </View>
  );
};
