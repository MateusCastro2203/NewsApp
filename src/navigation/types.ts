import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./AppNavigator";

export type NewsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;
