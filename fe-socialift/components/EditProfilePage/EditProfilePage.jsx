import React, { useState } from "react";
import {
  View,
  Text,
  Platform
} from "react-native";
import { Switch, Button, Avatar, Input } from "@rneui/themed";
import { styles } from "./EditProfilePageStyle.js";
import { getFirebase } from "../../firebase.js";
import {
  doc,
  updateDoc
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { pickImage, uploadImage } from "../../utils/pick-and-upload-images.js";
import { updateProfile } from "firebase/auth";

export const EditProfilePage = ({ navigation }) => {
  const [photo, setPhoto] = React.useState(null);
  const [darkMode, setDarkMode] = React.useState();
  const [privateMode, setPrivateMode] = React.useState();
  
  const { auth, firestore, storage} = getFirebase();
  const user = auth.currentUser;
  console.log(user.uid, "<< user.uid");
  const userRef = doc(firestore, "users", user.uid);
  console.log(userRef, "<< userRef");

  function updateAvatar() {
    pickImage()
      .then((newAvatarURI) => {
        console.log(newAvatarURI, "<< newAvatarURI")
        setPhoto(newAvatarURI);

        const fileRef = ref(storage, `avatars/${user.uid}.jpg`);

        return uploadImage(newAvatarURI, fileRef);
      })
      .then((uploadedAvatarURL) => {
        const updateObj = {
          "userDetails.avatarImgURL": uploadedAvatarURL,
        };

        updateDoc(userRef, updateObj);
        updateProfile(user, {
          photoURL: uploadedAvatarURL
        })
      })
      .catch((error) => {
        setPhoto(null)
        alert(error);
      });
  }

  const togglePrivateMode = () => {
    privateMode(!privateMode);
  };
  const toggleDarkMode = () => {
    darkMode(!darkMode);
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.formView}>
        <View style={styles.avatar}>
          {/* <Avatar
            activeOpacity={0.2}
            avatarStyle={{}}
            containerStyle={{
              backgroundColor: "#BDBDBD",
              marginBottom: 10,
              alignItems: "center",
            }}
            imageProps={{}}
            // onPress={() => alert("uploadImage")}
            onPress={pickImage}
            overlayContainerStyle={{}}
            placeholderStyle={{}}
            rounded
            size="large"
            source={{uri: photo}}
            titleStyle={{}}
          />*/}
          <Avatar
            size="large"
            rounded
            source={{ uri: photo }}
            title={user.displayName}
            containerStyle={{ backgroundColor: "grey" }}
            onPress={updateAvatar}
          >
          </Avatar>
        </View>
        <Input
          containerStyle={{}}
          disabledInputStyle={{ background: "#ddd" }}
          placeholder="First Name"
        />
        <Input
          containerStyle={{}}
          disabledInputStyle={{ background: "#ddd" }}
          placeholder="Last Name"
        />

        <View>
          <View style={styles.toggles}>
            <Text>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={(value) => setDarkMode(!darkMode)}
            />
          </View>
          <View style={styles.toggles}>
            <Text>Private Account</Text>
            <Switch
              value={privateMode}
              onValueChange={(value) => setPrivateMode(!privateMode)}
            />
          </View>
        </View>
        <Button title="SAVE" onPress={() => navigation.navigate("Profile")} />
      </View>
    </View>
  );
};
