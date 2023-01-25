import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    Alert,
    TextInput,
    Image,
    Picker
  } from "react-native";
import * as React from 'react';
import { styles } from "./GroupPageStyle.js";
import { TextField, Stack, AvatarGroup, InputLabel, MenuItem, FormControl, Select, SelectChangeEvent, Container } from "@mui/material";
import { Avatar, Button } from '@rneui/themed';

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

        <View style={styles.membersContainer}>
                {exampleGroup.members.map((member)=>{
                    return (<Avatar
                    alt={member.name}
                    rounded
                    key={member.name}
                    source={member.profilePicture}
                    sx={{ width: 35, height: 35 }}
                  />)
                })}
        <Button size="sm" style={styles.addToGroupButton}>Add to Group</Button>
        </View>


        <View style={styles.exerciseDropdownContainer}>
        <FormControl size="small" style={styles.exerciseDropDown} sx={{ m:1}}>
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

        <Picker>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
            <Picker.Item label="Python" value="python" />
        </Picker>
      </FormControl> 
        </View >
        <View style={styles.graphContainer}>
            <Text style={{color:'white'}}>Some Graph </Text>
            <Image
  source={{uri: 'https://www.tibco.com/sites/tibco/files/media_entity/2022-01/LineChart-01.svg'}}
  style={{width: 200, height: 200}}
/>
        </View>
        <View style={styles.pbHistory}>
        <Text style={{color:'white'}}>History</Text>
        <Text style={{color:'white'}}>Name, Date, Exercise,Weight</Text>
        <Text style={{color:'white'}}>Name, Date, Exercise,Weight</Text>
        <Text style={{color:'white'}}>Name, Date, Exercise,Weight</Text>
        <Text style={{color:'white'}}>Name, Date, Exercise,Weight</Text>
        <Text style={{color:'white'}}>Name, Date, Exercise,Weight</Text>
        <Text style={{color:'white'}}>Name, Date, Exercise,Weight</Text>
        <Text style={{color:'white'}}>Name, Date, Exercise,Weight</Text>
        <Text style={{color:'white'}}>Name, Date, Exercise,Weight</Text>
        <Text style={{color:'white'}}>Name, Date, Exercise,Weight</Text>
        <Text style={{color:'white'}}>Name, Date, Exercise,Weight</Text>
        </View>


        </View>
    )
}
