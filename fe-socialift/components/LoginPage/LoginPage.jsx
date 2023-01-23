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

  const handleChange = (event, setter) => {
    console.log(event.target.error)
    setter(event.target.value)
    if (event.target.name === "passwordConfirm" && password !== passwordConfirm) {
      console.log('checking matching passwords')
      event.target.error = true
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
            onChange={(e) => {handleChange(e, setEmail)}}
            error={(!emailRegex.test(email) && email !== '')}
            helperText={(!emailRegex.test(email) && email !== '') ? "Please enter a valid email": ""}
          />
        )}
        {(showLogin || showRegister) && (
          <TextField
            style={styles.input}
            variant="outlined"
            name="username"
            placeholder="Username"
            onChange={(e) => handleChange(e, setUsername)}
            error={(showRegister && currentUsers.includes(username))}
            helperText={(showRegister && currentUsers.includes(username)) ? `${username} is taken, please choose another username`: ""}
          />
        )}
        {(showLogin || showRegister) && (
          <TextField
            style={styles.input}
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleChange(e, setPassword)}
            error={(password.length < 8 && password !== '' && showRegister)}
            helperText={(password.length < 8 && password !== '' && showRegister) ? "Passwords must be at least 8 characters": ""}
          />
        )}
        {(showRegister) && (
          <TextField
            style={styles.input}
            type="password"
            name="passwordConfirm"
            placeholder="Confirm Password"
            onChange={(e) => handleChange(e, setPasswordConfirm)}
            error={(password !== passwordConfirm && passwordConfirm !== "")}
            helperText={password !== passwordConfirm && passwordConfirm ? "Passwords do not match": ""}
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
