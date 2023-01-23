import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {LoginPage} from './components/LoginPage'

const App = () => {
  const [user, setUser] = React.useState('')
  return (

    <NavigationContainer>
      {/* Rest of your app code */}
      {/* {!user && <LoginPage/>} */}
      <LoginPage/>



    </NavigationContainer>
  );
};




export default App;