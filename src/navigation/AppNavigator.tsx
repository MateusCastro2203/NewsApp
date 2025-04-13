import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/Home/HomeScreen";
import { NewsDetailsScreen } from "../screens/NewsDetails/NewsDetailsScreen";
import { PreferencesComponent } from "../screens/Home/components";
import { NewsResult } from "@/store/types/news.types";
import { FavoritesScreen } from "@/screens/FavoritesNews/FavoritesScreen";
import { FilterNewsResultScreen } from "@/screens/FilterNewsResult/FilterNewsResultScreen";
import { OfflineContentScreen } from "@/screens/OfflineContent/OfflineContentScreen";
import { Ionicons } from "@expo/vector-icons";

// Tipos para a navegação
export type RootStackParamList = {
  Voltar: undefined;
  NewsDetails: { article: NewsResult };
};

export type RootDrawerParamList = {
  Home: undefined;
  Favorites: undefined;
  Settings: undefined;
  OfflineContent: undefined;
  FilterNewsResult: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootDrawerParamList>();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        drawerType: "front",
        drawerStyle: {
          width: "75%",
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "News App",
          drawerLabel: "Notícias",
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="FilterNewsResult"
        component={FilterNewsResultScreen}
        options={{
          title: "Resultados da Pesquisa",
          drawerLabel: "Resultados da Pesquisa",
          headerTransparent: false,
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: "Favoritos",
          drawerLabel: "Favoritos",
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={PreferencesComponent}
        options={{
          title: "Configurações",
          drawerLabel: "Configurações",
        }}
      />
      <Drawer.Screen
        name="OfflineContent"
        component={OfflineContentScreen}
        options={{
          title: "Notícias Baixadas",
          drawerLabel: "Notícias Baixadas",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="cloud-offline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Voltar"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewsDetails"
        component={NewsDetailsScreen}
        options={{
          title: "Detalhes",
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};
