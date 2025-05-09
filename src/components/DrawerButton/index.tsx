import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/contexts/ThemeContext";
import { createStyles } from "./styles";

export function DrawerButton() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";
  const styles = createStyles({ isDarkTheme });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={styles.button}
      >
        <Ionicons name="menu" size={24} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}
