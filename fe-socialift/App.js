import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginPage } from './components/LoginPage/LoginPage';
import { EditProfilePage } from './components/EditProfilePage/EditProfilePage';
import { ProfilePage } from './components/ProfilePage/ProfilePage';
import { GroupPage } from './components/GroupPage/GroupPage.jsx';
import { getFirebase } from './firebase';

import { WorkoutLogPage } from './components/WorkoutLogPage/WorkoutLogPage.jsx';
import { WorkoutLoggerPage } from './components/WokoutLoggerPage/WorkoutLoggerPage';
import { GroupMessagingPage } from './components/GroupMessagingPage/GroupMessagingPage';

import { HomePage } from './components/HomePage/HomePage';
import { CreateGroup } from "./components/CreateGroup/CreateGroup";
import { AddFriendsPage } from './components/AddFriendsPage/AddFriendsPage';

const App = () => {


  const { auth } = getFirebase()
  const loggedInUser = auth.currentUser
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      
        <Stack.Navigator
          screenOptions={{ headerShown: false }}

          initialRouteName={loggedInUser ? "Group" : "CreateGroup"}

          >
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Profile" component={ProfilePage} />
          <Stack.Screen name="EditProfile" component={EditProfilePage} />
          <Stack.Screen name="Group" component={GroupPage} />
          <Stack.Screen name="CreateGroup" component={CreateGroup}/>
          <Stack.Screen name="WorkoutLog" component={WorkoutLogPage} />
          <Stack.Screen name="WorkoutLogger" component={WorkoutLoggerPage} />
          <Stack.Screen name="GroupMessaging" component={GroupMessagingPage} />

        </Stack.Navigator>
      
    </NavigationContainer>
  );
};

export default App;
