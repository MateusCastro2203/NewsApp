import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

export function DrawerButton() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <View className="items-center flex-row w-1/12">
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={24} color="#2563eb" />
      </TouchableOpacity>
    </View>
  );
}
