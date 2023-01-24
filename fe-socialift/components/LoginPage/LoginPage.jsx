import {
  View,
  Text
} from "react-native";
import React, { useState } from "react";
import { styles, theme } from "./LoginPageStyle.js";
import {Input, Button, ThemeProvider} from "@rneui/themed"

import app from "../../firebase.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const LoginPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmError, setConfirmError] = useState(false);

  const auth = getAuth(app);

  const handleChange = (event, setter) => {
    console.log(event.target);
    setter(event.target.value);
    if (
      event.target.name === "passwordConfirm" &&
      password !== passwordConfirm
    ) {
      console.log("checking matching passwords");
      event.target.error = true;
    }
  };

  const validateEmail = async (email) => {
    if (email !== "" && !emailRegex.test(email)) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setEmailError(true);
    } else {
      setInterval(setEmailError(false), 50);
    }
  };

  const validateUsername = async (username) => {
    if (showRegister && username !== "" && currentUsers.includes(username)) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
  };

  const validatePassword = async (password) => {
    if (showRegister && password !== "") {
      if (password.length < 8) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
    }
  };

  const validateConfirmPassword = async (confirmPassword) => {
    if (confirmPassword !== "" && password !== confirmPassword) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setConfirmError(true);
    } else {
      setConfirmError(false);
    }
  };

  const currentUsers = ["steve", "mark", "phil", "godfrey"];

  const validateLogin = () => {
    console.log("Validating Login Details...");
  };

  const registerUser = () => {
    if (emailError || !email) {
      return;
    }
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredentials) => {
        console.log(userCredentials);
      }
    );
    console.log("Registering New User...");
  };

  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  return (
    <View style={styles.mainView}>
        <View style={styles.formView}>
        <ThemeProvider theme={theme}>
        {showRegister && <Input
            
            placeholder="Email"
            onChange={(e) => {
              handleChange(e, setEmail);
              validateEmail(e.target.value);
            }}
          />}
        
        {(showRegister || showLogin) && <Input
            
            placeholder="Username"
            onChange={(e) => {
              handleChange(e, setUsername);
              validateUsername(e.target.value);
            }}
          />}
        
        
          {(showRegister || showLogin) && <Input
            
            placeholder="Password"
            onChange={(e) => {
              handleChange(e, setPassword);
              validatePassword(e.target.value);
            }}
            secureTextEntry={true}
          />}
        
        
          {showRegister && <Input
            
            placeholder="Confirm Password"
            onChange={(e) => {
              handleChange(e, setPasswordConfirm);
              validateConfirmPassword(e.target.value);
            }}
          />}
        
        <Button
          containerViewStyle={{width: '50px'}}
          onPress={() => {
            if (showLogin) {
              validateLogin();
            } else {
              setShowLogin(true);
              setShowRegister(false);
            }
          }}
          title="Login"
        />
          
        

        <Button
          containerViewStyle={{width: '50%'}}
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
        />
        </ThemeProvider>

        </View>
        
    </View>
  );
};
