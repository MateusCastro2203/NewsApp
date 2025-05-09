import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/contexts/ThemeContext";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { createStyles } from "./styles";

export function DrawerContent(props: DrawerContentComponentProps) {
  const { theme, toggleTheme } = useTheme();
  const { navigation } = props;
  const isDarkTheme = theme === "dark";
  const styles = createStyles({ isDarkTheme });

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
    <DrawerContentScrollView {...props} style={styles.container}>
      <View style={styles.content}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={item.onPress}
            style={styles.menuItemContainer}
          >
            <Ionicons
              name={item.icon as any}
              size={24}
              color={isDarkTheme ? "#e5e7eb" : "#4b5563"}
              style={{ marginRight: 12 }}
            />
            <Text style={styles.menuText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
        <View style={styles.themeToggleContainer}>
          <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
            <Ionicons
              name={isDarkTheme ? "sunny" : "moon"}
              size={24}
              color={isDarkTheme ? "#e5e7eb" : "#4b5563"}
              style={{ marginRight: 12 }}
            />
            <Text style={styles.menuText}>
              {isDarkTheme ? "Modo Claro" : "Modo Escuro"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
