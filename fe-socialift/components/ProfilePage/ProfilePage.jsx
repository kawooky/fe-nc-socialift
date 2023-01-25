import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    Alert,
    TextInput,
    Image
  } from "react-native";
import React, { useState } from "react";
import { styles } from "./ProfilePageStyle.js";
import { Avatar, Button, Stack } from '@rneui/themed';


const exampleUser = {
    name : 'Youssef Kawook',
    profilePicture: 'https://images.pexels.com/photos/4016173/pexels-photo-4016173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
}


export const ProfilePage = () => {
    return (
        <View style={styles.view }>
            <Stack direction="row" spacing={2}>
            <Avatar
  alt="Youssef Kawook"
  src={exampleUser.profilePicture}
  sx={{ width: 100, height: 100 }}
/>
            <Text style={styles.text}>{exampleUser.name}</Text>
  </Stack>
  <Stack direction="row" spacing={2}>
            <Button variant="contained">Feed</Button>
            <Button variant="contained">Records</Button>
            <Button variant="contained">Statistics</Button>
  </Stack>

        </View>
    )
}
