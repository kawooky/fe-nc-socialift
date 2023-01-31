import { View , Text, ScrollView, SafeAreaView} from 'react-native';
import { styles, theme } from './WorkoutLogPageStyle.js';
import React, { useEffect, useState } from 'react';
import { Input, Button, ThemeProvider } from '@rneui/themed';
import { getFirebase } from "../../firebase.js";
import {collection, getFirestore, getDocs, addDoc} from "firebase/firestore"

import NavBar from '../NavBar/NavBar.jsx';




const { auth, firestore } = getFirebase();





export const WorkoutLogPage = ({navigation}) => {

    // Use States \\
    const [workouts, setWorkouts] = useState([])

    
    // Credentials \\
    const loggedInUser = auth.currentUser.uid


    // Data Collection \\
    const db = getFirestore();
      const workoutsColRef = collection(db, "users", loggedInUser, "workouts")

      getDocs(workoutsColRef)
      .then((stuff) => {
        const logs =  stuff.docs.map((thing) => {
        
            return {...thing.data()}
        })
            
        setWorkouts(logs)
        
    })


useEffect(() => {
    console.log(workouts, "------workouts state")
    
}, [])


    return (
        <View style={styles.mainView}>
            <ThemeProvider theme={theme}>

            <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
{workouts.map((workout) => {
    return (
        <View style={styles.formView}> 
        <Text>{workout.date}</Text>
        <Text>{workout.notes}</Text>
        <Button onPress={() => {
                const workoutColRefPost = collection(firestore, "users", loggedInUser, "posts")

                addDoc(workoutColRefPost, workout)
            }}>Share</Button> 
        </View>
    )
})}
</ScrollView>
    </SafeAreaView>


            <Button
            onPress={() => {
                return navigation.navigate('WorkoutLogger')
            }}
            title="Log Workout"
            />
                            


            </ThemeProvider>
            <NavBar navigation={navigation}/>
        </View>
        
        

    )
}