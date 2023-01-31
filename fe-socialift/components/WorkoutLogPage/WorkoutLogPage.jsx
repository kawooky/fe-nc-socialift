import { View , Text, ScrollView, SafeAreaView} from 'react-native';
import { styles, theme } from './WorkoutLogPageStyle.js';
import React, { useState } from 'react';
import { Input, Button, ThemeProvider } from '@rneui/themed';
import { getFirebase } from "../../firebase.js";
import {collection, getFirestore, getDocs} from "firebase/firestore"

import NavBar from '../NavBar/NavBar.jsx';




const { auth } = getFirebase();

export const WorkoutLogPage = ({navigation}) => {

    const [workouts, setWorkouts] = useState([])
    
    const loggedInUser = auth.currentUser.uid

    const db = getFirestore();
      const workoutsColRef = collection(db, "users", loggedInUser, "workouts")



      getDocs(workoutsColRef)
      .then((stuff) => {
        const logs =  stuff.docs.map((thing) => {
        
            return {...thing.data()}
        })
            
        console.log(logs, "<<< LOGS")

        setWorkouts(logs)
        
    })

console.log(workouts, "------workouts state")


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
        <Button>Share</Button> 
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