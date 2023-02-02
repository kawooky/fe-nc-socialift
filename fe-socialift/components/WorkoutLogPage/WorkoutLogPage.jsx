import { View , Text, ScrollView, SafeAreaView} from 'react-native';
import { logStyles, theme } from './WorkoutLogPageStyle.js';
import React, { useEffect, useState } from 'react';
import { Input, Button, ThemeProvider } from '@rneui/themed';
import { getFirebase } from "../../firebase.js";
import {collection, getFirestore, getDocs, addDoc} from "firebase/firestore"
import {styles} from "../someDefaultStyles"


import NavBar from '../NavBar/NavBar.jsx';
import { homeStyles } from '../HomePage/HomePageStyle.js';


export const WorkoutLogPage = ({navigation}) => {
    const { auth, firestore } = getFirebase();

    // Use States \\
    const [workouts, setWorkouts] = useState([])

    
    // Credentials \\
    const loggedInUser = auth.currentUser.uid


    // Data Collection \\
    const db = getFirestore();
    const workoutsColRef = collection(db, "users", loggedInUser, "workouts")

    


useEffect(() => {
    console.log(workouts, "------workouts state")
    getDocs(workoutsColRef)
      .then((stuff) => {
        const logs = stuff.docs.map((thing) => {
            return {...thing.data()}
        })
        setWorkouts(logs)
    })
}, [])


    return (
        <SafeAreaView style={styles.mainView}>
      <ScrollView style={{width: "100%"}}
    contentContainerStyle={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}>

{workouts.map((workout) => {
    return (
        <View style={homeStyles.post}> 
        <Text style={logStyles.textName}>{workout.date}</Text>
        <Text style={logStyles.text}>{workout.notes}</Text>
        <Button 
        color="#49BF87"
        style={homeStyles.button}
        onPress={() => {
                const workoutColRefPost = collection(firestore, "users", loggedInUser, "posts")

                addDoc(workoutColRefPost, workout)
            }}>Post</Button> 
        </View>
    )
})}

            <Button
            color="#49BF87"
            onPress={() => {
                return navigation.navigate('WorkoutLogger')
            }}
            title="Log Workout"
            />
</ScrollView>
                            


            <NavBar navigation={navigation}/>
        </SafeAreaView>
        

    )
}