import { React, useState, useEffect, useRef} from 'react';
import { Modal, Dimensions, FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, TextInput, Text, TouchableOpacity, TouchableWithoutFeedback, View, Alert, Button } from 'react-native';
import WorkoutModalComp from './WorkoutModalComp';
import ExerciseInfo from './ExerciseInfo';
import uuid from 'react-native-uuid'

//TODO: Need to create functionality to support editing preexisting workouts (can be done with checking if a newly introduced prop that holds already existing workout data is null)

export default function WorkoutGenerat({navigation, route}){
    let workoutName = useRef("")
    let workoutDesc = useRef("")
    const [newWorkData, setNewWorkData] = useState([]) //holds all data for new workout
    const [show, setShow] = useState(false) //variable that decides whether modal is shown
    const [removeMode, setRM] = useState(false)
    let workoutData = route.params.userData.workouts //all workout data of user
    let deleteExcs = useRef([]) //useRef needs to be used or rerender would be messed up after first rerender

    useEffect(() => {
        setNewWorkData(newWorkData)
        console.log("NWD: " + JSON.stringify(newWorkData))
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
                    return !deleteExcs.current.includes(exc.tmpListID);
                }
            );

            // Clear the deleteExcs array
            deleteExcs.current = [];

            return tmp;
        })
    }
    
    const addToWorkData = (excArray, rand) => { 
        /**
         * PROP FUNCTION EXCLUSIVELY FOR MODAL
         * @param {Array} excArray: array to have added to newWorkData state array
         */
        setNewWorkData(prevWorkData => {
            //console.log("PREVWORKDATA: ", prevWorkData);
            let temp = [...prevWorkData]; //get prev data
                        //TODO: need to create randomization factor

            //MAPPING BETTER FOR TRANSFORMING, FOR EACH BETTER FOR MUTATING
            if(!rand){
                excArray.forEach(excData => { //for each item of exercise data
                    if(!temp.flat().some(data => data.exerciseItem.id === excData.id)){ //if data is not already in workoutGenerat exc list
                        temp.push({exerciseItem: excData, sets: 0, reps: 0, tmpListID: uuid.v4()}) //add to list
                    }
                });
            }
            else{
                let tmpRand = []

                excArray.forEach(excData => {
                    if(!temp.flat().some(data => data.exerciseItem.id === excData.id)){ //if data is not already in workoutGenerat exc list
                        tmpRand.push(excData) //add to list
                    }
                })
                temp.push({exerciseItem: tmpRand, sets: 0, reps: 0, tmpListID: uuid.v4()})
            }

            console.log(temp)
            return temp; //return temp to set NWD to temp list
        })
    }

    const saveWorkout = async () => {
        const sendData = {
            username: route.params.userData.username,
            workoutName: workoutName.current,
            workoutDesc: workoutDesc.current,
            exercises: newWorkData
        }

        console.log(JSON.stringify(sendData))

        let response = await fetch('http://10.0.2.2:3443/workouts/createWorkout', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type':'application/json'},
            body: JSON.stringify(sendData)
        }).then(function(resp){
            return resp.json()
        }).catch(error => {})
        console.log(response)

        workoutData = [...workoutData, {workoutName: workoutName.current, workoutDesc: workoutDesc.current, exercises: newWorkData}]

        navigation.navigate("Home", {userData: {username: route.params.userData.username, picture: route.params.userData.picture, workouts: workoutData, meals: route.params.userData.meals}})

    }

    return(
        <SafeAreaView>
            <View>
                <Text>Workout Name</Text>
                <TextInput onChangeText = {text => workoutName.current = text} id = 'workName'></TextInput>
            </View>
            <View>
                <Text>Workout Description</Text>
                <TextInput onChangeText = {text => workoutDesc.current = text} id = 'workDesc'></TextInput>
            </View>
            <Text>{"\n"}</Text>
            <Button title = "Add" onPress = {() => setShow(true)} />
            <Button title = "Trash Icon Here" onPress = {() => removeExercises()} />
            <View style = {{borderColor: 'black', borderWidth: 1, borderRadius: 5, height: 'auto'}}>
                <FlatList data = {newWorkData} keyExtractor={item => item.tmpListID} renderItem={({item})=>(
                    <ExerciseInfo hideCheck = {!removeMode} addToSelected = {() => {console.log('setting deleteExcs to: '); deleteExcs.current = addGroup(deleteExcs.current, item.tmpListID); console.log('deleteExcs now set to', deleteExcs.current);}} exerciseData = {item.exerciseItem}/>)}>
                </FlatList>
            </View>
            <Button title = "Save Workout" onPress = {() => saveWorkout()} />
            <View style = {{
                //source: https://reactnative.dev/docs/modal
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'}}>
                <Modal transparent = {true} visible = {show}>
                    <WorkoutModalComp addToWorkData = {addToWorkData} addFunc = {addGroup} setShow = {setShow}></WorkoutModalComp>
                </Modal>
            </View>
        </SafeAreaView>
    )
}