import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/Home/HomeScreen";
import { NewsDetailsScreen } from "../screens/NewsDetails/NewsDetailsScreen";
import { PreferencesComponent } from "../screens/Home/components";
import { NewsResult } from "@/store/types/news.types";
import { FavoritesScreen } from "@/screens/FavoritesNews/FavoritesScreen";
import { FilterNewsResultScreen } from "@/screens/FilterNewsResult/FilterNewsResultScreen";
// Tipos para a navegação
export type RootStackParamList = {
  Home: undefined;
  NewsDetails: { article: NewsResult };
  FilterNewsResult: undefined;
};

export type RootDrawerParamList = {
  MainStack: undefined;
  Settings: undefined;
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootDrawerParamList>();

function NewsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Notícias",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NewsDetails"
        component={NewsDetailsScreen}
        options={{
          title: "",
          headerTransparent: true,
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="FilterNewsResult"
        component={FilterNewsResultScreen}
        options={{
          headerTransparent: true,
          headerTitle: "Resultados",
        }}
      />
    </Stack.Navigator>
  );
}

export const AppNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="MainStack"
      screenOptions={{
        headerShown: true,
        drawerType: "front",
        drawerStyle: {
          width: "75%",
        },
      }}
    >
      <Drawer.Screen
        name="MainStack"
        component={NewsStack}
        options={{
          title: "News App",
          drawerLabel: "Notícias",
          headerShown: true,
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
    </Drawer.Navigator>
  );
};
