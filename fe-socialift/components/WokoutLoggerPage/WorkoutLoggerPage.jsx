import { View , Text} from 'react-native';
import { styles, theme } from './WorkoutLoggerPageStyle.js';
import React, { useEffect, useState, useRef } from 'react';
import { Input, Button, ThemeProvider } from '@rneui/themed';
import { getExercisesByMuscle } from '../../api'
import { doc, setDoc, addDoc, updateDoc, collection} from 'firebase/firestore'
import { getFirebase } from "../../firebase.js";
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { firestore } = getFirebase()
const { auth } = getFirebase();


export const WorkoutLoggerPage = ({navigation}) => {
    

    const loggedInUser = auth.currentUser.uid
    const loggedInUserPP = auth.currentUser.photoURL
    const loggedInUserName = auth.currentUser.displayName

    console.log(loggedInUserName, "<<<Logged in User name")

       

    const formatData = (workout) => {
        const arr = []
        workout.map((ex,index)=>{
            arr.push({exercise:ex[0].exercise, sets:{}})
            
            ex.map((set,nestedIndex)=>{
                arr[index].sets[`set${nestedIndex+1}`]={reps:set.reps, weight:set.weight, singleSetNotes:set.singleSetNotes}
            })
        })
        return arr
    }


const dataAverage = (workout) => {
    const workoutAverage = workout.map((exercise)=>{
        const setPropNames = Object.keys(exercise.sets)
        const numberOfSets =  Object.keys(exercise.sets).length
        let sumOfReps = 0
        for (const i of setPropNames) {
            sumOfReps+= exercise.sets[i].reps
        }
        const averageReps = sumOfReps/numberOfSets


        let sumOfWeight = 0
        for (const i of setPropNames) {
            sumOfWeight+= exercise.sets[i].weight
        }
        const averageWeight = sumOfWeight/numberOfSets


        return {

            name: exercise.exercise,
            sets: numberOfSets,
            average_reps: averageReps,
            average_weight: averageWeight,
            units: 'kg'
        }
    })

    return workoutAverage
}


    const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [notes, setNotes] = useState('')
    const [stage, setStage] = useState(1)
    const [muscle, setMuscle] = useState('')
    const [weight, setWeight] = useState('')
    const [reps, setReps ] = useState('')
    const [singleSetNotes, setSingleSetNotes ] = useState('')
    const [exerciseSetsHolder, setExerciseSetsHolder] = useState([])
    const [fullExerciseHolder, setFullExerciseHolder] = useState([])
    const [workout, setWorkout] = useState(null)

    const [exercisesByMuscle, setExercisesByMuscle] = useState([])
    const [exercise, setExercise] = useState([])

    const[post, setPost] = useState({...workout ,type:"logged-workout"})

    //muscle options from ninja api
    const muscleList = ['abdominals', 'abductors', 'adductors', 'biceps' ,'calves', 'chest', 'forearms', 'glutes', 'hamstrings', 'lats', 'lower_back', 'middle_back', 'neck', 'quadriceps', 'traps', 'triceps']

    const [weightError, setWeightError] = useState('')
    const [repsError, setRepsError] = useState('')

    const weightRef = useRef()
    const repsRef = useRef()

    const postToDb = () => {

        const workoutColRefInside = collection(firestore, "users", loggedInUser, "workouts")
        addDoc(workoutColRefInside, workout).then(() => {

            navigation.navigate("WorkoutLog")
        })
    }

    const postToPostDb = () => {

        const workoutColRefPost = collection(firestore, "users", loggedInUser, "posts")

            addDoc(workoutColRefPost, workout)
        .then(() => {

            navigation.navigate("WorkoutLog")
        })


        }

    

    const handleLog = () => {
        
        postToDb()
                
    }

const handlePost = () => {

    postToPostDb()
}

    useEffect(()=>{
        getExercisesByMuscle(muscle).then((exercises)=>{
            setExercisesByMuscle(exercises)     
            })
        console.log(exercisesByMuscle)
        }, [muscle])


    return (
        <View style={styles.mainView}>
       
        { stage ===1 && ( <View style={styles.mainView}>
        <Button
        onPress={() => {
            return navigation.goBack()
        }}
        title="Back"
        />

        <Text>Name</Text>
        <Text>Date: {date}</Text>
        <Button
        onPress={()=>{
            setShowDatePicker(true)
        }}
        title='change date'/>
        
        {showDatePicker === true && (<DateTimePicker value={new Date()} onChange={(event, date)=>{
            setShowDatePicker(false)
            if (event.type === 'set') {
                setDate(date.toISOString().slice(0, 10))
            }
            }}/>)}

        <Input
              value={notes}
              placeholder="Notes"
              onChangeText={(event) => {
                setNotes(event)
                setWorkout((workout) => {return {...workout, notes: event}})}}
              errorMessage={''}
              autoCorrect={false}
            />

        {fullExerciseHolder.map((singleExerciseSets, i)=>{
            return (<View>
            <Text>{`Exercise: ${singleExerciseSets[0].exercise}`}</Text> 
                
            
            {singleExerciseSets.map((singleSet,index)=>{
                return (<View>
                <Text key={index}>{`Set: ${index+1} Weight: ${singleSet.weight} Reps: ${singleSet.reps} Notes: ${singleSet.singleSetNotes}`}</Text>

                </View>)
            })}
            <Button 
                onPress={()=>{
                    setFullExerciseHolder((currentFullExerciseHolder)=>{
                        const copyOfCurrent = [...currentFullExerciseHolder]
                        const newArr = copyOfCurrent.splice(i,1)
                        return copyOfCurrent
                    })
                }}
                title='delete exercise'/>
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
                handleLog()
                
            }}
            title="Log"
        />
        <Button
            onPress={() => {
                handlePost()
            }}
            title="Post"
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
              onChangeText={(event) => {
                setWeight(event)
                setWeightError('')}}
              errorMessage={weightError}
              autoCorrect={false}
              ref={weightRef}
              leftIcon={<MaterialCommunityIcons name="weight-kilogram" size={24} color="black" />}
            />
        <Input
              value={reps}
              placeholder="Reps"
              onChangeText={(event) => {
                setReps(event)
                setRepsError('')}}
              errorMessage={repsError}
              autoCorrect={false}
              ref={repsRef}
              leftIcon={<MaterialCommunityIcons name="weight-kilogram" size={24} color="black" />}
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
                if((/^\d+$/.test(weight) || weight === '') && (/^\d+$/.test(reps) || reps === '')) {
                    setExerciseSetsHolder([...exerciseSetsHolder,{exercise:exercise, weight:Number(weight), reps:Number(reps), singleSetNotes:singleSetNotes}])
                } 
                if (!/^\d+$/.test(weight) && weight !== '') {
                    weightRef.current.shake()
                    setWeightError('Weight must be a number or left blank')
                } 
                if (!/^\d+$/.test(reps) && reps!=='') {
                    repsRef.current.shake()
                    setRepsError('Reps must be a number or left blank')
                }
            }}
            title="Add Set"
        />

        {exerciseSetsHolder.map((singleSet,index)=>{
            return (<View  key={index}>
            <Text>{`Set: ${index+1} Exercise: ${singleSet.exercise} Weight: ${singleSet.weight} Reps: ${singleSet.reps} Notes: ${singleSet.singleSetNotes}`}</Text>
            <Button 
            onPress={()=>{
                setExerciseSetsHolder((currentExerciseSetsHolder)=>{
                    const copyOfCurrent = [...currentExerciseSetsHolder]
                    const newArr = copyOfCurrent.splice(index,1)
                    return copyOfCurrent
                })
                                console.log(exerciseSetsHolder,'holder')
            }}
            title='delete set'/>
            </View>
            )
        })}


        <Button
            onPress={() => {
                setStage(1)
                setFullExerciseHolder([...fullExerciseHolder, exerciseSetsHolder])
                setWorkout({type:"logged-workout", user:loggedInUserName, user_img_url:loggedInUserPP, date:date, notes:notes, workout:formatData([...fullExerciseHolder, exerciseSetsHolder]), exercises: dataAverage(formatData([...fullExerciseHolder, exerciseSetsHolder])), comments: 0, likes: 0})
                setExercise('')
                setWeight('')
                setReps('')
                setSingleSetNotes('')
                setExerciseSetsHolder([])
            }}
            title="Add"
        />
        </View>)}

    </View>
            
    )
}




