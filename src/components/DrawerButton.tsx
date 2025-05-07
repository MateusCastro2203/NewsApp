import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/contexts/ThemeContext";

export function DrawerButton() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const { theme } = useTheme();

  return (
    <View className="items-center flex-row w-1/12">
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        className={` rounded-full ${
          theme === "dark" ? "active:bg-gray-700" : "active:bg-gray-200"
        }`}
      >
        <Ionicons
          name="menu"
          size={24}
          color={theme === "dark" ? "#ffffff" : "#1f2937"}
        />
      </TouchableOpacity>
    </View>
  );
}
