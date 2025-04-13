import React from "react";
import { View, Text, Button, SafeAreaView } from "react-native";
import { useOnboardingStore } from "../store/onboarding";
import { MultiSelect } from "./MultiSelect";
import { usePreferencesStore } from "../store/preferencesStore";
export function OnboardingScreen() {
  const setFirstTimeCompleted = useOnboardingStore(
    (state) => state.setFirstTimeCompleted
  );

  const { category, setCategory } = usePreferencesStore();

  return (
    <SafeAreaView className="flex-1  items-center p-5 bg-slate-100">
      <View className="flex-1  items-center p-5 bg-slate-100">
        <Text className="text-2xl font-bold mb-2 text-gray-800">
          Bem-vindo ao NewsApp!
        </Text>
        <Text className="text-base mb-8 text-center text-gray-600">
          Vamos configurar suas preferências
        </Text>
        <MultiSelect selected={category} setSelected={setCategory} />
        <Button
          title="Começar"
          onPress={() => {
            setFirstTimeCompleted();
          }}
          disabled={category.length === 0}
        />
      </View>
    </SafeAreaView>
  );
}
