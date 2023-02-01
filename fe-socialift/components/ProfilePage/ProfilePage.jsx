import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    Alert,
    TextInput,
    Image,
    ViewBase
  } from "react-native";
import React, { useState } from "react";
import { styles } from "./ProfilePageStyle.js";
import { Avatar, Button, Icon} from '@rneui/themed';
import NavBar from "../NavBar/NavBar.jsx";
import { getFirebase } from "../../firebase.js";

const { auth } = getFirebase();


export const ProfilePage = ({navigation}) => {
    
    const [sectionOfProfile, setSectionOfProfile] = useState('feed')
    
    const loggedInUserName = auth.currentUser.displayName
        const loggedInUserPP = auth.currentUser.photoURL

    return (
        <View style={styles.mainView }>
            <View style={styles.formView}>
                <View style={styles.avatar}>
            <Avatar 
  alt="Username"
  activeOpacity={0.2}
  avatarStyle={{}}
  containerStyle={{ backgroundColor: "#BDBDBD", marginBottom: 10 , alignItems: "center"}}
  icon={{}}
  iconStyle={{}}
  imageProps={{}}
  onPress={() => navigation.navigate('EditProfile')}
  overlayContainerStyle={{}}
  placeholderStyle={{}}
  rounded
  size="large"
  source={{ uri: loggedInUserPP }}
  titleStyle={{}}
/>
<View style={styles.username}>
            <Text>{loggedInUserName}</Text>
            </View>
</View>

<View style={styles.buttonContainer}>
<View style={styles.button}>
            <Button onPress={() => {
                setSectionOfProfile("feed")
            }} variant="contained">Feed</Button>
</View>
<View style={styles.button}>
            <Button onPress={() => {
                setSectionOfProfile("records")
            }}variant="contained">Records</Button>
</View>
            <Button onPress={() => {
                setSectionOfProfile("statistics")}} variant="contained">Statistics</Button>
            </View>

            { sectionOfProfile === "feed" && (
                <View> 

                    <Text>THIS IS THE FEED</Text>
                </View>
            )}

{ sectionOfProfile === "records" && (
                <View> 

                    <Text>THIS IS THE RECORDS SECTION</Text>
                </View>
            )}

{ sectionOfProfile === "statistics" && (
                <View> 

                    <Text>THIS IS THE STATISTICS SECTION</Text>
                </View>
            )}

            </View>
            <NavBar navigation={navigation} />
        </View>
    )
}
