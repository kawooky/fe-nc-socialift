import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    Alert,
    TextInput,
  } from "react-native";
  import { Switch, Button, Avatar, Input} from '@rneui/themed';
  import { styles } from './EditProfilePageStyle.js';


/////////////////////////////////////////////////////////////////////////
// import { getFirebase } from "../../firebase.js";


// .then((userCredentials) => {
//   updateProfile(auth.currentUser, {
//     displayName: username,
//   });
// })

  // SUBMIT FIRST NAME
  // SUBMIT LAST NAME
  // SUBMIT AVATAR PHOTO
  // ADD FORM VALIDATION FOR THE NAMES TO BE REQUIRED
  
  

  // const validateName = () => {
  //   if (showRegister && username !== "" && currentUsers.includes(username)) {
  //     setUsernameError(true);
  //   } else {
  //     setUsernameError(false);
  //   }
  // };
  
  export const EditProfilePage = ({navigation}) => {
    
    const [darkMode, setDarkMode] = React.useState();
    const [privateMode, setPrivateMode] = React.useState();
    
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
      <Avatar

              activeOpacity={0.2}
              avatarStyle={{}}
              containerStyle={{ backgroundColor: "#BDBDBD", marginBottom: 10 , alignItems: "center"}}
              icon={{name: "pencil"}}
              iconStyle={{}}
              imageProps={{}}
              onPress={() => alert("uploadImage")}
              overlayContainerStyle={{}}
              placeholderStyle={{}}
              rounded
              size="large"
              source={{ uri: "" }}
              titleStyle={{}}
            />

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
            <Button title="SAVE" onPress={() => navigation.navigate('Profile')}/>
            
    </View>
    </View>
  );
  };