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
    <DrawerContentScrollView
      {...props}
      className={theme === "dark" ? "bg-gray-900" : "bg-white"}
    >
      <View className="flex-1">
        <View className="p-4">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={item.onPress}
              className={`flex-row items-center py-3 px-4 rounded-lg mb-1 ${
                theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
              }`}
            >
              <Ionicons
                name={item.icon as any}
                size={24}
                color={theme === "dark" ? "#e5e7eb" : "#4b5563"}
                style={{ marginRight: 12 }}
              />
              <Text
                className={`text-base ${
                  theme === "dark" ? "text-gray-200" : "text-gray-800"
                }`}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
          <View
            className={`mt-auto border-t ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <TouchableOpacity
              onPress={toggleTheme}
              className={`flex-row items-center py-3 px-4 ${
                theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
              }`}
            >
              <Ionicons
                name={theme === "light" ? "moon" : "sunny"}
                size={24}
                color={theme === "dark" ? "#e5e7eb" : "#4b5563"}
                style={{ marginRight: 12 }}
              />
              <Text
                className={`text-base ${
                  theme === "dark" ? "text-gray-200" : "text-gray-800"
                }`}
              >
                {theme === "light" ? "Modo Escuro" : "Modo Claro"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
