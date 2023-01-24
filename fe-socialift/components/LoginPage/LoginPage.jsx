import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Alert,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "./LoginPageStyle.js";
import { TextField, Button } from "@mui/material";

export const LoginPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [emailError, setEmailError] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmError, setConfirmError] = useState(false)

  const handleChange = (event, setter) => {
    setter(event.target.value)
    if (event.target.name === "passwordConfirm" && password !== passwordConfirm) {
      console.log('checking matching passwords')
      event.target.error = true
    }
  }

  const validateEmail = async(email) => {
    if (email !== "" && !emailRegex.test(email)) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setEmailError(true)
    } else {
      setEmailError(false)
    }
  }

  const validateUsername = async(username) => {
    if (showRegister && username !== "" && currentUsers.includes(username)) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUsernameError(true)
    } else {
      setUsernameError(false)
    }
  }

  const validatePassword = async(password) => {
    if (showRegister && password !== "" && password.length < 8) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPasswordError(true)
    } else {
      setPasswordError(false)
    }
  }

  const validateConfirmPassword = async(confirmPassword) => {
    if (confirmPassword !== "" && password !== confirmPassword) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setConfirmError(true)
    } else {
      setConfirmError(false)
    }
  }

  const currentUsers = ['steve', 'mark', 'phil', 'godfrey']

  const validateLogin = () => {
    console.log('Validating Login Details...')
  };

  const registerUser = () => {
    console.log('Registering New User...')
  }

  const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

  return (
    <View style={styles.view}>
      <form style={styles.form}>
      {(showRegister) && (
          <TextField
            style={styles.input}
            variant="outlined"
            placeholder="Email"
            name="email"
            onChange={(e) => {handleChange(e, setEmail); validateEmail(e.target.value)}}
            error={emailError}
            helperText={(emailError) ? "Please enter a valid email": ""}
          />
        )}
        {(showLogin || showRegister) && (
          <TextField
            style={styles.input}
            variant="outlined"
            name="username"
            placeholder="Username"
            onChange={(e) => {handleChange(e, setUsername); validateUsername(e.target.value)}}
            error={usernameError}
            helperText={usernameError ? `${username} is taken, please choose another username`: ""}
          />
        )}
        {(showLogin || showRegister) && (
          <TextField
            style={styles.input}
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => {handleChange(e, setPassword); validatePassword(e.target.value)}}
            error={passwordError}
            helperText={(passwordError) ? "Passwords must be at least 8 characters": ""}
          />
        )}
        {(showRegister) && (
          <TextField
            style={styles.input}
            type="password"
            name="passwordConfirm"
            placeholder="Confirm Password"
            onChange={(e) => {handleChange(e, setPasswordConfirm); validateConfirmPassword(e.target.value)}}
            error={confirmError}
            helperText={confirmError ? "Passwords do not match": ""}
          />
        )}
        <Button
          style={styles.loginButton}
          variant="contained"
          onClick={() => {
            if (showLogin) {
              validateLogin()
            } else {
              setShowLogin(true);
              setShowRegister(false)
            }
          }}
        >
          Login
        </Button>
        <Button
          style={styles.loginButton}
          variant="contained"
          onClick={() => {
            if (showRegister) {
              registerUser()
            } else {
              setShowLogin(false);
              setShowRegister(true)
            }
          }}
        >
          Register
        </Button>
      </form>
    </View>
  );
};
