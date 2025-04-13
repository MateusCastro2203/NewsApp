import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { OnboardingScreen } from "./src/components/OnboardingScreen";
import { useOnboardingStore } from "./src/store/onboarding";
import { AppNavigator } from "@/navigation/AppNavigator";
import "./global.css";
import { initializeStorage } from "@/services/useOfflineStorage";

export default function App() {
  const isFirstTime = useOnboardingStore((state) => state.isFirstTime);
  useEffect(() => {
    initializeStorage();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="dark" />
        {isFirstTime ? <OnboardingScreen /> : <AppNavigator />}
      </NavigationContainer>
    </SafeAreaView>
  );
}
