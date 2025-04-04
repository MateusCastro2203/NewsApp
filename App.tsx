import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { View, Text, Button } from "react-native";
import { OnboardingScreen } from "./src/components/OnboardingScreen";
import { useOnboardingStore } from "./src/store/onboarding";
import { PreferencesComponent } from "@/screens/Home/components";
import "./global.css";
import { HomeScreen } from "@/screens/Home/HomeScreen";
const Drawer = createDrawerNavigator();

// Componente para a tela principal de notícias

function MainNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="News"
      screenOptions={{
        headerShown: true,
        drawerType: "front",
        drawerStyle: {
          width: "75%",
        },
      }}
    >
      <Drawer.Screen
        name="News"
        component={HomeScreen}
        options={{
          title: "Notícias",
          drawerLabel: "Notícias",
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
}

export default function App() {
  const isFirstTime = useOnboardingStore((state) => state.isFirstTime);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="dark" />
        {isFirstTime ? (
          <Drawer.Navigator
            screenOptions={{
              headerShown: false,
              drawerType: "front",
              drawerStyle: {
                width: "100%",
              },
              drawerPosition: "left",
            }}
          >
            <Drawer.Screen
              name="Onboarding"
              component={OnboardingScreen}
              options={{
                headerShown: false,
                swipeEnabled: false,
              }}
            />
          </Drawer.Navigator>
        ) : (
          <MainNavigator />
        )}
      </NavigationContainer>
    </SafeAreaView>
  );
}
