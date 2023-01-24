import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginPage } from "./components/LoginPage/LoginPage";

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <LoginPage />
  );
};

export default App;
