import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    Alert,
    TextInput,
  } from "react-native";
import * as React from 'react';
import { styles } from "./GroupPageStyle.js";
import { TextField, Button, Avatar, Stack, AvatarGroup, InputLabel, MenuItem, FormControl, Select, SelectChangeEvent, Container } from "@mui/material";

const exampleGroup = {
    groupName: 'Legend Lifterz',
    members: [
{
    name : 'Youssef Kawook',
    profilePicture: 'https://images.pexels.com/photos/4016173/pexels-photo-4016173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
},
{
    name : 'Tomasz Krupa',
    profilePicture: 'https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
}
]
}
//D-D-C = sum of squat deadlift and chestpress
const exampleExercises = ['S-D-C', 'Deadlift', 'Squat', 'Chest Press' ]






export const GroupPage = () => {
    const [exercise, setExercise] = React.useState('');



    return (

        <View style={styles.view }>


            <Text style={styles.groupName}>{exampleGroup.groupName}</Text>

            <Stack  style={styles.membersContainer} direction="row" spacing={2}>
            <AvatarGroup max={6}>
                {exampleGroup.members.map((member)=>{
                    return (<Avatar
                    alt={member.name}
                    key={member.name}
                    src={member.profilePicture}
                    sx={{ width: 35, height: 35 }}
                  />)
                })}
        </AvatarGroup>
        <Button variant="contained" size="small" style={styles.addToGroupButton}>Add to Group</Button>
            </Stack>


        <View style={styles.exerciseDropdownContainer}>
        <FormControl size="small" style={styles.exerciseDropDown} sx={{ m:1, minWidth: 300}}>
        <InputLabel style={styles.exerciseDropDown}>Exercise</InputLabel>

        <Select
        style={styles.exerciseDropDown}
          value={exercise}
          onChange={(event)=>{
            setExercise(event.target.value)
}}
          autoWidth
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
            {exampleExercises.map((exercise)=>{
                return (<MenuItem  key ={exercise} value={exercise}>{exercise}</MenuItem>)
            })}

        </Select>
      </FormControl> 
        </View>
        {/* <Container maxWidth="sm">
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
      </Container> */}


        </View>
    )
}
