import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useOnboardingStore } from "@/store/onboarding";
import { MultiSelect } from "@/components/MultiSelect";
import { usePreferencesStore } from "@/store/preferencesStore";
import { useUserStore } from "@/store/userStore";
import { styles, createButtonStyles } from "./styles";

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

  const renderPersonalInfoForm = () => {
    const isNextDisabled = !name.trim() || !email.trim() || isLoading;
    const nextButtonStyles = createButtonStyles({ isDisabled: isNextDisabled });

    return (
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Seus dados</Text>

        <Text style={styles.inputLabel}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
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
          <Text style={styles.errorText}>
            Por favor, digite um email válido
          </Text>
        )}

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={nextButtonStyles.button}
          onPress={handleNextStep}
          disabled={isNextDisabled}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={nextButtonStyles.buttonText}>Continuar</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const renderCategoriesForm = () => {
    const isContinueDisabled = category.length === 0;
    const continueButtonStyles = createButtonStyles({
      isDisabled: isContinueDisabled,
    });
    const backButtonStyles = createButtonStyles({ isDisabled: false });

    return (
      <>
        <Text style={styles.categoriesTitle}>
          Escolha suas categorias de interesse
        </Text>
        <MultiSelect selected={category} setSelected={setCategory} />
        <TouchableOpacity
          style={continueButtonStyles.button}
          onPress={() => {
            setFirstTimeCompleted();
          }}
          disabled={isContinueDisabled}
        >
          <Text style={continueButtonStyles.buttonText}>Começar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setStep(1)}
          style={backButtonStyles.button}
        >
          <Text style={backButtonStyles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Bem-vindo ao NewsApp!</Text>
        <Text style={styles.subtitle}>
          {step === 1
            ? "Vamos começar com alguns dados básicos"
            : "Vamos configurar suas preferências"}
        </Text>

        {step === 1 ? renderPersonalInfoForm() : renderCategoriesForm()}
      </View>
    </SafeAreaView>
  );
}
