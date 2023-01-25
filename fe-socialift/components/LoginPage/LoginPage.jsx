import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Alert,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { styles } from "./LoginPageStyle.js";
import { TextField, Button } from "@mui/material";

export const LoginPage = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const CheckLoginDetails = () => {
    // checks username and password with backend
  };

  return (
    <View style={styles.view}>
      {showLogin && <TextField style={styles.input} variant="outlined" placeholder="Username" />}
      {showLogin && <TextField style={styles.input} type="password" placeholder="Password" />}
      <Button style={styles.loginButton} variant="contained" onClick={() => {setShowLogin(true)}}>Login</Button>

    </View>
  );
};
