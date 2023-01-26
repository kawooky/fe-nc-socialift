import { View , Text} from 'react-native';
import { styles, theme } from './WorkoutLoggerPageStyle.js';
import React, { useEffect, useState } from 'react';
import { Input, Button, ThemeProvider } from '@rneui/themed';
import { getExercisesByMuscle } from '../../api'



export const WorkoutLoggerPage = ({navigation}) => {


    const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
    const [notes, setNotes] = useState('')
    const [stage, setStage] = useState(1)
    const [muscle, setMuscle] = useState('')
    const [weight, setWeight] = useState('')
    const [reps, setReps ] = useState('')
    const [singleSetNotes, setSingleSetNotes ] = useState('')
    const [exerciseSetsHolder, setExerciseSetsHolder] = useState([])
    const [fullExerciseHolder, setFullExerciseHolder] = useState([])
    const [workout, setWorkout] = useState({date:date, notes:notes, workout:fullExerciseHolder})

    const [exercisesByMuscle, setExercisesByMuscle] = useState([])
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






        { stage ===1 && ( <View style={styles.stageOne}>
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

        {fullExerciseHolder.map((singleExerciseSets)=>{
            return (<View>
            <Text>{`Exercise: ${singleExerciseSets[0].exercise}`}</Text> 
                
            
            {singleExerciseSets.map((singleSet,index)=>{
                return (<Text key={index}>{`Set: ${index+1} Weight: ${singleSet.weight} Reps: ${singleSet.reps} Notes: ${singleSet.singleSetNotes}`}</Text>)
            })}
        </View>
        )
        })}

        
        <Button
            onPress={() => {
                setStage(2)
            }}
            title="Add Exercise"
        />
        <Button
            onPress={() => {
                navigation.navigate("WorkoutLog")
                setFullExerciseHolder([])
            }}
            title="Log (Needs a function to add to users workout log array)"
        />
        <Button
            onPress={() => {
            }}
            title="Post (missing function)"
        />
        <Text>hi ur about to log a workout</Text>
        </View>)}
        




        { stage ===2 && ( <View style={styles.stageTwo}>
            <Button
            onPress={() => {
                setStage(1)
            }}
            title="Back"
        />
        <Text>Select a Muscle Group</Text>
        <View style={styles.muscleButtonList}>
        {
        muscleList.map((muscle)=>{
            return (
                <Button style={styles.muscleButton}
                key={muscle}
                onPress={() => {
                   setMuscle(muscle)
                   setStage(3)
                }}
                title={muscle}
            />)
        })
        }
        </View>


        </View>)}




        {stage ===3 && ( <View style={styles.stageThree}>
            <Button
            onPress={() => {
                setStage(2)
            }}
            title="Back"
        />
        <Text>3 Select a Exercise for Your Muscle Group</Text>

        {
        exercisesByMuscle.map((singleExercise, index)=>{
            return (
                <Button
                key={singleExercise + index}
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




        {stage ===4 && ( <View style={styles.stageFour}>
            <Button
            onPress={() => {
                setStage(3)
                setExercise('')
                setWeight('')
                setReps('')
                setSingleSetNotes('')
                setExerciseSetsHolder([])
            }}
            title="Back"
        />
        <Text>{exercise}</Text>
        <Input
              value={weight}
              placeholder="Weight"
              onChangeText={(event) => {setWeight(event)}}
              errorMessage={''}
              autoCorrect={false}
            />
        <Input
              value={reps}
              placeholder="Reps"
              onChangeText={(event) => {setReps(event)}}
              errorMessage={''}
              autoCorrect={false}
            />
        <Input
              value={singleSetNotes}
              placeholder="Notes"
              onChangeText={(event) => {setSingleSetNotes(event)}}
              errorMessage={''}
              autoCorrect={false}
            />
        <Button
            onPress={() => {
                setExerciseSetsHolder([...exerciseSetsHolder,{exercise:exercise, weight:Number(weight), reps:Number(reps), singleSetNotes:singleSetNotes}])
                console.log(exerciseSetsHolder)
            }}
            title="Add Set"
        />

        {exerciseSetsHolder.map((singleSet,index)=>{
            return (<Text key={index}>{`Set: ${index+1} Exercise: ${singleSet.exercise} Weight: ${singleSet.weight} Reps: ${singleSet.reps} Notes: ${singleSet.singleSetNotes}`}</Text>)
        })}


        <Button
            onPress={() => {
                setStage(1)
                setFullExerciseHolder([...fullExerciseHolder, exerciseSetsHolder])
                setExercise('')
                setWeight('')
                setReps('')
                setSingleSetNotes('')
                setExerciseSetsHolder([])
            }}
            title="Add"
        />
        </View>)}


        </ThemeProvider>
    </View>
            
    )
}