import React from "react";
import { View, Text } from "react-native";
import { Switch, Button, Avatar, Divider } from "@rneui/themed";
import { styles } from "./EditProfilePageStyle.js";
import { getFirebase } from "../../firebase.js";
import { doc, updateDoc } from "firebase/firestore";
import { ref } from "firebase/storage";
import { pickImage, uploadImage } from "../../utils/pick-and-upload-images.js";
import { onAuthStateChanged, updateProfile } from "firebase/auth";

export const EditProfilePage = ({ navigation }) => {
  const { auth, firestore, storage } = getFirebase();
  const user = auth.currentUser;
  const userRef = doc(firestore, "users", user.uid);

  const [photo, setPhoto] = React.useState(user.photoURL);
  const [newPhoto, setNewPhoto] = React.useState(null);
  const [fileRef, setFileRef] = React.useState(null);
  const [isChanged, setIsChanged] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);
  const [privateMode, setPrivateMode] = React.useState(false);

  onAuthStateChanged(auth, (user) => {
    setPhoto(user.photoURL);
  });

  function changeAvatar() {
    return pickImage()
      .then((newAvatarURI) => {
        setNewPhoto(newAvatarURI);

        const newFileRef = ref(storage, `avatars/${user.uid}.jpg`);
        setFileRef(newFileRef);

        setIsChanged(true);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  function updateAvatar() {
    return uploadImage(newPhoto, fileRef).then((uploadedAvatarURL) => {
      const updateObj = {
        "userDetails.avatarImgURL": uploadedAvatarURL,
      };

      updateDoc(userRef, updateObj);
      updateProfile(user, {
        photoURL: uploadedAvatarURL,
      });
    });
  }

  function togglePrivateMode() {
    setPrivateMode(!privateMode);
    const mode = privateMode ? "public" : "private\n(Or is it?..)";
    alert(`Now your profile is ${mode}`);
  }

  function toggleDarkMode() {
    setDarkMode(!darkMode);
    const message = darkMode
      ? "Back to light mode\n(Nothing changed...)"
      : "No dark mode for you...\n(yet)";
    alert(message);
  }

  function saveChanges() {
    setIsSaving(true);
    updateAvatar()
      .then(() => {
        setIsSaving(false);
        setNewPhoto(null);
        setFileRef(null);
        setIsChanged(false);
        navigation.navigate("Profile");
      })
      .catch((error) => {
        setNewPhoto(null);
        setFileRef(null);
        setIsChanged(false);
        setIsSaving(false);
        console.log(error, "<< error");
        alert(error);
      });
  }

  function cancelChanges() {
    setNewPhoto(null);
    setFileRef(null);
    setIsChanged(false);
    navigation.navigate("Profile");
  }

  return (
    <View style={styles.mainView}>
      <View style={styles.formView}>
        <View style={styles.avatar}>
          <Avatar
            size="xlarge"
            rounded
            source={newPhoto ? { uri: newPhoto } : { uri: photo }}
            title={user.displayName}
            containerStyle={{ backgroundColor: "grey", marginBottom: 20 }}
            onPress={changeAvatar}
          >
            <Avatar.Accessory size={50} />
          </Avatar>
        </View>
        <Divider />
        <View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Username:</Text>
            <Text style={styles.infoText}>{user.displayName}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Email:</Text>
            <Text style={styles.infoText}>{user.email}</Text>
          </View>
        </View>
        <Divider />
        <View>
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleText}>Dark Mode</Text>
            <Switch value={darkMode} onValueChange={toggleDarkMode} />
          </View>
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleText}>Private Account</Text>
            <Switch value={privateMode} onValueChange={togglePrivateMode} />
          </View>
        </View>
        <Button
          title="CANCEL"
          onPress={cancelChanges}
          radius={"sm"}
          size="sm"
          color="secondary"
          containerStyle={{
            marginVertical: 10,
          }}
        />
        <Button
          title="SAVE"
          radius={"sm"}
          disabled={!isChanged}
          loading={isSaving}
          onPress={saveChanges}
        />
      </View>
    </View>
  );
};
