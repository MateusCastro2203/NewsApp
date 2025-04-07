import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { OnboardingScreen } from "./src/components/OnboardingScreen";
import { useOnboardingStore } from "./src/store/onboarding";
import { AppNavigator } from "@/navigation/AppNavigator";
import "./global.css";

export default function App() {
  const isFirstTime = useOnboardingStore((state) => state.isFirstTime);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="dark" />
        {isFirstTime ? <OnboardingScreen /> : <AppNavigator />}
      </NavigationContainer>
    </SafeAreaView>
  );
}
