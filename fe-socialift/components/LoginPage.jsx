import {
    StyleSheet,
    Button,
    View,
    SafeAreaView,
    Text,
    Alert,
    TextInput
  } from 'react-native';
  import React, {useState} from 'react';
  

export const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const CheckLoginDetails = () => {

    }


    return (

    <View style={{padding: 100}}>
      <TextInput
        style={{height: 40}}
        placeholder="Username"
        onChangeText={newUsername => setText(newUsername)}
        defaultValue={username}
      />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        /> 
    <Button
    title="Login"
    onPress={CheckLoginDetails}
    />




    </View>



    )}

