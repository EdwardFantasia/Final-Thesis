import { React, useState, useEffect, useRef} from 'react';
//import './css/WorkoutGen.css'
//import { Modal } from 'react-bootstrap'; //change these to react native versions
import { Modal, Dimensions, FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, TextInput, Text, TouchableOpacity, TouchableWithoutFeedback, View, Alert, Button } from 'react-native';
import WorkoutModalComp from './WorkoutModalComp';
import ExerciseInfo from './ExerciseInfo';

//TODO: Need to create functionality to support editing preexisting workouts (can be done with checking if a newly introduced prop that holds already existing workout data is null)
//TODO: NEED TO FIX USESTATES FOR REMOVEMODE TO ALLOW FOR CHECKBOX AND TRASH BUTTON HIDE/APPEAR BASED ON REMOVEMODE AFTER PRESSING DELETE EXERCISES BUTTON

export default function WorkoutGenerat({navigation, route}){
    let workoutName = useRef("")
    let workoutDesc = useRef("")
    const [newWorkData, setNewWorkData] = useState([]) //holds all data for new workout
    const [show, setShow] = useState(false) //variable that decides whether modal is shown
    const [removeMode, setRM] = useState(true) //variable that decides whether user can remove exercises from workout
    let workoutData = route.params.userData.workouts //all workout data of user
    let deleteExcs = useRef([]) //useRef needs to be used or rerender would be messed up after first rerender
    let muscleGroups = [] //array that holds tags of musles that are used (MAY NOT BE USED)

    useEffect(() => {
        setNewWorkData(newWorkData)
    })

    const addGroup = (mutArray, arrayAdd) => {
        /**
         * USED BY MODAL AS WELL
         * Add or remove arrayAdd item from mutArray
         * @param {Array} mutArray: array to have arrayAdd item removed from or added to
         * @param {any} arrayAdd: item to be removed from or added to mutArray
         */
        
        let tmp = mutArray

        if(tmp.includes(arrayAdd)){
            tmp.splice(tmp.indexOf(arrayAdd), 1)
        }
        else{
            tmp.splice(tmp.length, 0, arrayAdd)
        }

        return tmp
    }

    const removeExercises = () => {
        /**
         * Remove exercises from newWorkData that match exercises in deleteExercises array (removes them from potentially added exercises array and un-renders them)
         */

        setNewWorkData(prevWorkData => {
            // Filter out the exercises that need to be removed
            const tmp = prevWorkData.filter(
                (exc) => {
                    console.log(exc)
                    return !deleteExcs.current.includes(exc.exerciseItem.id);
                }
            );

            // Clear the deleteExcs array
            deleteExcs.current = [];

            return tmp;
        })
    }
    
    const addToWorkData = (excArray) => { 
        /**
         * PROP FUNCTION EXCLUSIVELY FOR MODAL
         * @param {Array} excArray: array to have added to newWorkData state array
         */
        setNewWorkData(prevWorkData => {
            //console.log("PREVWORKDATA: ", prevWorkData);
            let temp = [...prevWorkData]; //get prev data
            
            //MAPPING BETTER FOR TRANSFORMING, FOR EACH BETTER FOR MUTATING
            excArray.forEach(excData => { //for each item of exercise data
                if(!temp.some(data => data.exerciseItem.id === excData.id)){ //if data is not already in workoutGenerat exc list
                    //console.log(excData)
                    temp.push({exerciseItem: excData, sets: 0, reps: 0}) //add to list
                    //console.log('temp is now '+ temp)
                }
            });

            return temp; //return temp to set NWD to temp list
        })
    }

    const saveWorkout = async () => {
        //TODO: need to save workouts
        const sendData = {
            username: route.params.userData.username,
            workoutName: workoutName.current,
            workoutDesc: workoutDesc.current,
            exercises: newWorkData
        }

        console.log(JSON.stringify(sendData))

        let response = await fetch('http://localhost:3001/workouts/createWorkout', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type':'application/json'},
            body: JSON.stringify(sendData)
        }).then(function(resp){
            return resp.json()
        })
        console.log(response)

        workoutData = [...workoutData, {workoutName: workoutName.current, workoutDesc: workoutDesc.current, exercises: newWorkData}]

        navigation.navigate("Home", {userData: {username: route.params.userData.username, workouts: workoutData}})

    }

    return(
        <SafeAreaView>
            <View>
                <Text>Workout Name: </Text>
                <TextInput onChangeText = {text => workoutName.current = text} id = 'workName'></TextInput>
            </View>
            <View>
                <Text>Workout Description: </Text>
                <TextInput onChangeText = {text => workoutDesc.current = text} id = 'workDesc'></TextInput>
            </View>
            <Text>{"\n"}</Text>
            <Button title = "Add" onPress = {() => setShow(true)} />
            <Button title = "Delete Exercises" onPress = {() => setRM(true)} />
            <Button title = "Trash Icon Here" onPress = {() => removeExercises()} />
            <Button title = "Save Workout" onPress = {() => saveWorkout()} />

            <Text>{"\n"}</Text>
            <View style = {{
                //source: https://reactnative.dev/docs/modal
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'}}>
            <Modal transparent = {true} visible = {show}>
                <WorkoutModalComp addToWorkData = {addToWorkData} addFunc = {addGroup} setShow = {setShow}></WorkoutModalComp>
            </Modal>
            </View>
            <View style = {{flex: 1, height: "auto"}}>
                <FlatList data = {newWorkData} renderItem={({item: item, index: number}) => 
                    <View>
                        <ExerciseInfo hideCheck = {!removeMode} addToSelected = {() => {console.log('setting deleteExcs to: '); deleteExcs.current = addGroup(deleteExcs.current, item.exerciseItem.id); console.log('deleteExcs now set to', deleteExcs.current);}} exerciseData = {item.exerciseItem}/>
                        <View style = {{flexDirection: 'row'}}>
                            <Text>Sets: </Text>
                            <TextInput placeholder = {newWorkData[number].sets} onChange = {text => setNewWorkData(prevWorkData => {let tmp = [...prevWorkData]; tmp[number].sets = text; return tmp;})} keyboardType='number-pad'></TextInput>
                        </View>
                        <View style = {{flexDirection: 'row'}}>
                            <Text>Reps: </Text>
                            <TextInput placeholder = {newWorkData[number].reps} onChange = {text => setNewWorkData(prevWorkData => {let tmp = [...prevWorkData]; tmp[number].reps = text; return tmp;})} keyboardType='number-pad'></TextInput>
                        </View>
                    </View>}>
                </FlatList>
            </View>
        </SafeAreaView>
    )
}