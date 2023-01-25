import { View , Text} from 'react-native';
import { styles, theme } from './WorkoutLoggerPageStyle.js';
import React, { useEffect, useState } from 'react';
import { Input, Button, ThemeProvider } from '@rneui/themed';
import { getExercisesByMuscle } from '../../api'



export const WorkoutLoggerPage = ({navigation}) => {
    const [date, setDate] = useState('')
    const [notes, setNotes] = useState('')
    const [stage, setStage] = useState(1)
    const [muscle, setMuscle] = useState('biceps')
    const [exercisesByMuscle, setExercisesByMuscle] = useState([
        {
          "name": "Incline Hammer Curls",
          "type": "strength",
          "muscle": "biceps",
          "equipment": "dumbbell",
          "difficulty": "beginner",
          "instructions": "Seat yo"
        },
        {
          "name": "Wide-grip barbell curl",
          "type": "strength",
          "muscle": "biceps",
          "equipment": "barbell",
          "difficulty": "beginner",
          "instructions": "Stand up r variety purposes."
        },
        {
          "name": "EZ-bar spider curl",
          "type": "strength",
          "muscle": "biceps",
          "equipment": "barbell",
          "difficulty": "intermediate",
          "instructions": "Start contt properly."
        }])
    const [exercise, setExercise] = useState('Incline Hammer Curls')

    //muscle options from ninja api
    const muscleList = ['abdominals', 'abductors', 'adductors', 'biceps' ,'calves', 'chest', 'forearms', 'glutes', 'hamstrings', 'lats', 'lower_back', 'middle_back', 'neck', 'quadriceps', 'traps', 'triceps']

    useEffect(()=>{
        getExercisesByMuscle(muscle).then((exercises)=>{
            setExercisesByMuscle(exercises)     
            })
        console.log(exercisesByMuscle)
        }, [muscle])


    return (
        <View style={styles.mainView}>
        <ThemeProvider theme={theme}>






        { stage ===1 && ( <View>
        <Button
        onPress={() => {
            return navigation.goBack()
        }}
        title="Back"
        />
        <Text>Name</Text>
        <Input
              value={date}
              placeholder="Date"
              onChangeText={(event) => {setDate(event)}}
              errorMessage={''}
              autoCorrect={false}
            />
        <Input
              value={notes}
              placeholder="Notes"
              onChangeText={(event) => {setNotes(event)}}
              errorMessage={''}
              autoCorrect={false}
            />
        <Button
            onPress={() => {
                setStage(2)
            }}
            title="Add Exercise"
        />
        <Text>hi ur about to log a workout</Text>
        </View>)}
        




        { stage ===2 && ( <View>
            <Button
            onPress={() => {
                setStage(1)
            }}
            title="Back"
        />
        <Text>Select a Muscle Group</Text>
        
        {
        muscleList.map((muscle)=>{
            return (
                <Button
                onPress={() => {
                   setMuscle(muscle)
                   setStage(3)
                }}
                title={muscle}
            />)
        })

        }
        <Button
            onPress={() => {
                setStage(3)
            }}
            title="Forward"
        />


        </View>)}




        {stage ===3 && ( <View>
            <Button
            onPress={() => {
                setStage(2)
            }}
            title="Back"
        />
        <Text>3 Select a Exercise for Your Muscle Group</Text>

        {
        exercisesByMuscle.map((singleExercise)=>{
            console.log(singleExercise)
            return (
                <Button
                onPress={() => {
                   setExercise(singleExercise.name)
                   setStage(4)
                }}
                title={singleExercise.name}
            />)
        })
        }
        <Button
            onPress={() => {
                setStage(4)
            }}
            title="Forward"
        />
        </View>)}




        {stage ===4 && ( <View>
            <Button
            onPress={() => {
                setStage(3)
            }}
            title="Back"
        />
        <Text>{exercise}</Text>

        <Button
            onPress={() => {
                setStage(1)
            }}
            title="Add"
        />
        </View>)}





        </ThemeProvider>
    </View>
            
    )
}