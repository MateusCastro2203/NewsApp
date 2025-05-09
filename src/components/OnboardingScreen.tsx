import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useOnboardingStore } from "../store/onboarding";
import { MultiSelect } from "./MultiSelect";
import { usePreferencesStore } from "../store/preferencesStore";
import { useUserStore } from "@/store/userStore";

export function OnboardingScreen() {
  const [step, setStep] = useState(1); // Step 1: Dados pessoais, Step 2: Categorias
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const setFirstTimeCompleted = useOnboardingStore(
    (state) => state.setFirstTimeCompleted
  );

  const { registerUsers } = useUserStore();
  const { category, setCategory } = usePreferencesStore();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNextStep = async () => {
    // Validação
    const isValid = validateEmail(email);
    setIsEmailValid(isValid);

    if (!name.trim() || !isValid) {
      return;
    }

    // Registro do usuário
    setIsLoading(true);
    setError("");

    try {
      // Use apenas o método do store, não chame a API diretamente
      await registerUsers(name.trim(), email.trim());

      // Se chegou aqui, o registro foi bem-sucedido
      setStep(2);
    } catch (err) {
      console.error("Erro ao registrar usuário:", err);
      setError("Falha ao registrar usuário. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderPersonalInfoForm = () => (
    <View className="w-full px-4">
      <Text className="text-lg font-semibold mb-2 text-gray-800">
        Seus dados
      </Text>

      <Text className="text-sm mb-1 text-gray-600">Nome</Text>
      <TextInput
        className="bg-white border border-gray-300 rounded-md p-3 mb-4 w-full text-gray-800"
        placeholder="Digite seu nome"
        value={name}
        onChangeText={setName}
      />

      <Text className="text-sm mb-1 text-gray-600">Email</Text>
      <TextInput
        className="bg-white border border-gray-300 rounded-md p-3 mb-1 w-full text-gray-800"
        placeholder="Digite seu email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setIsEmailValid(true);
          setError(""); // Limpa erros anteriores
        }}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {!isEmailValid && (
        <Text className="text-red-500 mb-1">
          Por favor, digite um email válido
        </Text>
      )}

      {error ? <Text className="text-red-500 mb-4">{error}</Text> : null}

      <TouchableOpacity
        className={`mt-4 py-3 rounded-md ${
          name.trim() && email.trim() && !isLoading
            ? "bg-blue-500"
            : "bg-gray-400"
        }`}
        onPress={handleNextStep}
        disabled={!name.trim() || !email.trim() || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text className="text-white text-center font-semibold">
            Continuar
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );

  // Resto do código como está...

  const renderCategoriesForm = () => (
    <>
      <Text className="text-lg font-semibold mb-4 text-gray-800">
        Escolha suas categorias de interesse
      </Text>
      <MultiSelect selected={category} setSelected={setCategory} />
      <TouchableOpacity
        className={`mt-6 py-3 px-6 rounded-md ${
          category.length > 0 ? "bg-blue-500" : "bg-gray-400"
        }`}
        onPress={() => {
          setFirstTimeCompleted();
        }}
        disabled={category.length === 0}
      >
        <Text className="text-white text-center font-semibold">Começar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setStep(1)}
        className="mt-6 py-3 px-6 rounded-md bg-blue-500"
      >
        <Text className="text-white text-md font-semibold ">Voltar</Text>
      </TouchableOpacity>
    </>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <View className="flex-1 items-center p-5 bg-slate-100">
        <Text className="text-2xl font-bold mb-2 text-gray-800">
          Bem-vindo ao NewsApp!
        </Text>
        <Text className="text-base mb-8 text-center text-gray-600">
          {step === 1
            ? "Vamos começar com alguns dados básicos"
            : "Vamos configurar suas preferências"}
        </Text>

        {step === 1 ? renderPersonalInfoForm() : renderCategoriesForm()}
      </View>
    </SafeAreaView>
  );
}
