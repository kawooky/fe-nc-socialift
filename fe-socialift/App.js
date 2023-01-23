import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginPage } from "./components/LoginPage/LoginPage";
import { ProfilePage } from "./components/ProfilePage/ProfilePage";

const App = () => {
  const Stack = createNativeStackNavigator();
  const [user, setUser] = React.useState("");
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="Login" component={LoginPage} /> */}
        <Stack.Screen name="Profile" component={ProfilePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
