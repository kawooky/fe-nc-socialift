import { View } from 'react-native';
import React, { createRef, useState } from 'react';
import { styles, theme } from './LoginPageStyle.js';
import { Input, Button, ThemeProvider } from '@rneui/themed';

import app from '../../firebase.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

export const LoginPage = ({navigation}) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmError, setConfirmError] = useState(false);
  const [disableButtons, setDisableButtons] = useState(false);

  const auth = getAuth(app);

  const emailRef = createRef();
  const usernameRef = createRef();
  const passRef = createRef();
  const confirmRef = createRef();

  const handleChange = (event, setter) => {
    setter(event);
  };

  const validateEmail = async (email) => {
    if (email !== '' && !emailRegex.test(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const validateUsername = async (username) => {
    if (showRegister && username !== '' && currentUsers.includes(username)) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
  };

  const validatePassword = (password) => {
    if (showRegister && password !== '' && password.length < 8) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword !== '' && password !== confirmPassword) {
      setConfirmError(true);
    } else {
      setConfirmError(false);
    }
  };

  const currentUsers = ['steve', 'mark', 'phil', 'godfrey'];

  const validateLogin = () => {
    if (!username) {
      usernameRef.current.shake();
    }
    if (!password) {
      passRef.current.shake();
    }
    if (username && password) {
      signInWithEmailAndPassword(auth, username, password);
    }
    
  };

  const registerUser = () => {
    if (emailError || !email) {
      emailRef.current.shake();
    }
    if (usernameError || !username) {
      usernameRef.current.shake();
    }
    if (passwordError || !password) {
      passRef.current.shake();
    }
    if (confirmError || !passwordConfirm) {
      confirmRef.current.shake();
    }
    if (
      !emailError &&
      email &&
      !usernameError &&
      username &&
      !passwordError &&
      password &&
      !confirmError &&
      passwordConfirm
    ) {
      setDisableButtons(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          updateProfile(auth.currentUser, {
            displayName: username,
          });
        })
        .then(() => {
          navigation.navigate('Group')
        })
        .catch((error) => {
          console.log(error);
          setDisableButtons(false);
        });
    }
  };

  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  return (
    <View style={styles.mainView}>
      <View style={styles.formView}>
        <ThemeProvider theme={theme}>
          {showRegister && (
            <Input
              value={email}
              placeholder="Email"
              onChangeText={(e) => {
                handleChange(e, setEmail);
                validateEmail(e);
              }}
              errorMessage={emailError ? 'Please enter a valid email' : ' '}
              autoCorrect={false}
              ref={emailRef}
            />
          )}

          {(showRegister || showLogin) && (
            <Input
              placeholder="Username"
              onChangeText={(e) => {
                handleChange(e, setUsername);
                validateUsername(e);
              }}
              errorMessage={
                usernameError
                  ? `Sorry, ${username} is already taken, please choose another username`
                  : ' '
              }
              autoCorrect={false}
              ref={usernameRef}
            />
          )}

          {(showRegister || showLogin) && (
            <Input
              placeholder="Password"
              onChangeText={(e) => {
                handleChange(e, setPassword);
                validatePassword(e);
              }}
              errorMessage={
                passwordError ? 'Password must be at least 8 characters' : ' '
              }
              autoCorrect={false}
              secureTextEntry={true}
              ref={passRef}
            />
          )}

          {showRegister && (
            <Input
              placeholder="Confirm Password"
              onChangeText={(e) => {
                handleChange(e, setPasswordConfirm);
                validateConfirmPassword(e);
              }}
              errorMessage={confirmError ? 'Passwords must match' : ' '}
              autoCorrect={false}
              secureTextEntry={true}
              ref={confirmRef}
            />
          )}

          <Button
            onPress={() => {
              if (showLogin) {
                validateLogin();
              } else {
                setShowLogin(true);
                setShowRegister(false);
              }
            }}
            title="Login"
            disabled={disableButtons}
          />

          <Button
            variant="contained"
            onPress={() => {
              if (showRegister) {
                registerUser();
              } else {
                setShowLogin(false);
                setShowRegister(true);
              }
            }}
            title="Register"
            disabled={disableButtons}
          />
        </ThemeProvider>
      </View>
    </View>
  );
};