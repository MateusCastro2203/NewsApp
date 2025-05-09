import { useChatBotStore } from "@/store/chatBotStore";
import { useOnboardingStore } from "@/store/onboarding";
import React from "react";
import { View, Button, Text } from "react-native";

export function PreferencesComponent() {
  const resetOnboarding = useOnboardingStore((state) => state.resetOnboarding);
  const resetConversationId = useChatBotStore(
    (state) => state.resetConversationId
  );

  const handleResetOnboarding = () => {
    resetOnboarding();
    resetConversationId();
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Configurações</Text>
      <View style={{ marginTop: 20 }}>
        <Button
          title="Reset Onboarding (Dev)"
          onPress={handleResetOnboarding}
          color="red"
        />
      </View>
    </View>
  );
}
