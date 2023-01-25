import { Button } from '@rneui/base';
import * as React from "react";
import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    Alert,
    TextInput,
  } from "react-native";
  import { Avatar } from "@rneui/base";
  import { Switch } from '@rneui/themed';
  
  

export const ProfilePage = () => {


    return (
       <View>

    <Avatar
      activeOpacity={0.2}
      avatarStyle={{}}
      containerStyle={{ backgroundColor: "#BDBDBD" }}
      icon={{}}
      iconStyle={{}}
      imageProps={{}}
      onPress={() => alert("this should bring up a window to upload image")}
      overlayContainerStyle={{}}
      placeholderStyle={{}}
      rounded
      size="large"
      source={{ uri: "https://media.licdn.com/dms/image/C4E03AQHdBJrM8dGH8Q/profile-displayphoto-shrink_800_800/0/1631551294002?e=1680134400&v=beta&t=VBpSXJVC_YPwxE1mGEYz-aW_jKLV6M4pJRfanEFvkVY" }}
      title="P"
      titleStyle={{}}
    />
 


 
    <Switch
      color="#2089dc"
      value={"false"}
      onValueChange={() => setValue("true")}
    />
  



        <Button title="SAVE" />
      

        </View>
        )
        
     
        
    }
    
    