import { View } from "react-native";
import React, { createRef, useEffect, useState } from "react";
import { styles, theme } from "./LoginPageStyle.js";
import { Input, Button, ThemeProvider } from "@rneui/themed";
import { getFirebase } from "../../firebase.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDocs,
  onSnapshot,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";

export const LoginPage = ({ navigation }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState(" ");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmError, setConfirmError] = useState(false);
  const [disableButtons, setDisableButtons] = useState(false);
  const [currentUsers, setCurrentUsers] = useState([]);

  const db = getFirestore();
  const usernamesColRef = collection(db, "usernames");

  getDocs(usernamesColRef)
    .then((stuff) => {
      return stuff.docs.map((thing) => {
        return thing.id;
      });
    })
    .then((usernames) => {
      setCurrentUsers(usernames);
    });

  useEffect(() => {
    onSnapshot(usernamesColRef, (stuff) => {
      const usernames = stuff.docs.map((thing) => {
        return thing.id;
      });
      setCurrentUsers(usernames);
    });
  }, []);

  const { auth } = getFirebase()

  const emailRef = createRef();
  const usernameRef = createRef();
  const passRef = createRef();
  const confirmRef = createRef();

  const handleChange = (event, setter) => {
    setter(event);
  };

  const validateEmail = (email) => {
    if (email !== "" && !emailRegex.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email");
    } else {
      setEmailError(false);
      setEmailErrorMessage(" ");
    }
  };

  const validateUsername = (username) => {
    if (showRegister && username !== "" && currentUsers.includes(username)) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
  };

  const validatePassword = (password) => {
    if (showRegister && password !== "" && password.length < 8) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword !== "" && password !== confirmPassword) {
      setConfirmError(true);
    } else {
      setConfirmError(false);
    }
  };

  const validateLogin = () => {
    if (!email) {
      emailRef.current.shake();
      setEmailError(true);
    }
    if (!password) {
      passRef.current.shake();
    }
    if (email && password) {
      setDisableButtons(true);
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigation.navigate("Home");
        })
        .catch((err) => {
          console.log(err);
          setDisableButtons(false);
        });
    }
  };

  const registerUser = () => {
    validateUsername(username);
    validateEmail(email);
    validatePassword(password);
    validateConfirmPassword(passwordConfirm);
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
          setDoc(doc(db, "usernames", username), {});
          console.log(userCredentials, "<< userCredentials");
          setDoc(doc(db, "users", userCredentials.user.uid), {
            userDetails: {
              username: username,
              avatarImgURL: "",
              createdAt: serverTimestamp(),
              profileVisible: true,
            },
          });
        })
        .then(() => {
          navigation.navigate("EditProfile");
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            setEmailError(true);
            setEmailErrorMessage(
              "An account is already associated with this email address"
            );
          }

          console.log(error.code);
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
              placeholder="Username"
              onChangeText={(e) => {
                handleChange(e, setUsername);
                validateUsername(e);
              }}
              errorMessage={
                usernameError
                  ? `Sorry, ${username} is already taken, please choose another username`
                  : " "
              }
              autoCorrect={false}
              ref={usernameRef}
            />
          )}
          {(showRegister || showLogin) && (
            <Input
              value={email}
              placeholder="Email"
              onChangeText={(e) => {
                handleChange(e, setEmail);
                validateEmail(e);
              }}
              errorMessage={emailErrorMessage}
              autoCorrect={false}
              ref={emailRef}
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
                passwordError ? "Password must be at least 8 characters" : " "
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
              errorMessage={confirmError ? "Passwords must match" : " "}
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
