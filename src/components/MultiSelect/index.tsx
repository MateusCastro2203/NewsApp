import React, { useMemo, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { options } from "@/store/types/onboarding";
import { styles, createOptionStyles } from "./styles";

interface MultiSelectProps {
  selected: string[];
  setSelected: (values: string[]) => void;
}

export function MultiSelect({ selected, setSelected }: MultiSelectProps) {
  const [limitReached, setLimitReached] = useState(false);

  useMemo(() => {
    if (selected.length <= 5) {
      setLimitReached(false);
    }
  }, [selected]);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      setSelected(selected.filter((item) => item !== option));
    } else {
      if (selected.length >= 5) {
        setLimitReached(true);
        return;
      }
      setSelected([...selected, option]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Escolha suas categorias favoritas:</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => {
          const isSelected = selected.includes(option.value);
          const optionStyles = createOptionStyles({ isSelected });

          return (
            <TouchableOpacity
              key={option.label}
              onPress={() => toggleOption(option.value)}
              style={optionStyles.option}
            >
              <Text style={optionStyles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {limitReached && (
        <Text style={styles.limitText}>
          Você só pode selecionar até 5 categorias.
        </Text>
      )}
    </View>
  );
}
