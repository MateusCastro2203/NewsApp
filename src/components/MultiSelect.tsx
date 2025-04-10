import React, { useMemo, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { options } from "@/store/types/onboarding";

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
    <View className="w-full mb-4 items-center">
      <Text className="text-base font-light mb-3 text-gray-950">
        Escolha suas categorias favoritas:
      </Text>
      <View className="flex flex-row flex-wrap justify-center">
        {options.map((option) => {
          const isSelected = selected.includes(option.value);
          return (
            <TouchableOpacity
              key={option.label}
              onPress={() => toggleOption(option.value)}
              className={`px-4 py-2 rounded-full mr-2 border mb-2 ${
                isSelected
                  ? "bg-blue-500 border-blue-500"
                  : "bg-transparent border-gray-300"
              }`}
            >
              <Text className={isSelected ? "text-white" : "text-black"}>
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {limitReached && (
        <Text className="text-red-500 mb-2">
          Você só pode selecionar até 5 categorias.
        </Text>
      )}
    </View>
  );
}
