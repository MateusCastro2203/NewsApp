import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/contexts/ThemeContext";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { DrawerContentComponentProps } from "@react-navigation/drawer";

export function DrawerContent(props: DrawerContentComponentProps) {
  const { theme, toggleTheme } = useTheme();
  const { navigation } = props;

  const menuItems = [
    {
      label: "Notícias",
      icon: "newspaper",
      onPress: () => navigation.navigate("Home"),
    },
    {
      label: "Favoritos",
      icon: "heart",
      onPress: () => navigation.navigate("Favorites"),
    },
    {
      label: "Configurações",
      icon: "settings",
      onPress: () => navigation.navigate("Settings"),
    },
    {
      label: "Notícias Baixadas",
      icon: "cloud-offline",
      onPress: () => navigation.navigate("OfflineContent"),
    },
  ];

  return (
    <DrawerContentScrollView {...props}>
      <View className="flex-1 bg-white dark:bg-gray-800">
        <View className="p-4">
          <Text className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            News App
          </Text>

          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={item.onPress}
              className="flex-row items-center py-3 px-4"
            >
              <Ionicons
                name={item.icon as any}
                size={24}
                className="text-gray-600 dark:text-gray-300 mr-3"
              />
              <Text className="text-gray-800 dark:text-white text-base">
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="mt-auto border-t border-gray-200 dark:border-gray-700">
          <TouchableOpacity
            onPress={toggleTheme}
            className="flex-row items-center py-3 px-4"
          >
            <Ionicons
              name={theme === "light" ? "moon" : "sunny"}
              size={24}
              className="text-gray-600 dark:text-gray-300 mr-3"
            />
            <Text className="text-gray-800 dark:text-white text-base">
              {theme === "light" ? "Modo Escuro" : "Modo Claro"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
