import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginPage } from "./components/LoginPage/LoginPage";
import { ProfilePage } from "./components/ProfilePage/ProfilePage";
import { GroupPage } from "./components/GroupPage/GroupPage.jsx"
const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Profile" component={ProfilePage} />
        <Stack.Screen name="Group" component={GroupPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
