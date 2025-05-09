import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { OnboardingScreen } from "@/components/OnboardingScreen";
import { useOnboardingStore } from "./src/store/onboarding";
import { AppNavigator } from "@/navigation/AppNavigator";
import { initializeStorage } from "@/services/useOfflineStorage";
import { useToast } from "@/hooks/useToast";
import { Toast } from "@/components/Toast";
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function App() {
  const isFirstTime = useOnboardingStore((state) => state.isFirstTime);
  useEffect(() => {
    initializeStorage();
  }, []);
  const { isVisible, message, type, hideToast } = useToast();
  return (
    <ThemeProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <StatusBar style="dark" />
          {isFirstTime ? <OnboardingScreen /> : <AppNavigator />}
          {isVisible && (
            <Toast message={message} type={type} onHide={hideToast} />
          )}
        </NavigationContainer>
      </SafeAreaView>
    </ThemeProvider>
  );
}
