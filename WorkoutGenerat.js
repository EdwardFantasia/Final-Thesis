import { React, Component, useState, useEffect, useRef} from 'react';
import './css/WorkoutGen.css'
import { Modal, Button } from 'react-bootstrap'; //change these to react native versions
import { FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Alert } from 'react-native';
import WorkoutModalComp from './WorkoutModalComp';
import ExerciseInfo from './ExerciseInfo';

//TODO: Need to create functionality to support editing preexisting workouts (can be done with checking if a newly introduced prop that holds already existing workout data is null)
//TODO: NEED TO FIX USESTATES FOR REMOVEMODE TO ALLOW FOR CHECKBOX AND TRASH BUTTON HIDE/APPEAR BASED ON REMOVEMODE AFTER PRESSING DELETE EXERCISES BUTTON

const WGC = props => {
    const navigation = props.navigation
    const route = props.route
    const [newWorkData, setNewWorkData] = useState([]) //holds all data for new workout
    const [show, setShow] = useState(false) //variable that decides whether modal is shown
    const [removeMode, setRM] = useState(true) //variable that decides whether user can remove exercises from workout
    let workoutData = route.params.workoutData //all workout data of user
    let deleteExcs = useRef([]) //useRef needs to be used or rerender would be messed up after first rerender
    let muscleGroups = [] //array that holds tags of musles that are used (MAY NOT BE USED)

    const addGroup = (mutArray, arrayAdd) => {
        /**
         * USED BY MODAL AS WELL
         * Add or remove arrayAdd item from mutArray
         * @param {Array} mutArray: array to have arrayAdd item removed from or added to
         * @param {any} arrayAdd: item to be removed from or added to mutArray
         */
        
        if(mutArray.includes(arrayAdd)){
            mutArray.splice(mutArray.indexOf(arrayAdd), 1)
        }
        else{
            mutArray.splice(mutArray.length, 0, arrayAdd)
        }

        console.log('',mutArray)
    }

    const removeExercises = () => {
        /**
         * Remove exercises from newWorkData that match exercises in deleteExercises array (removes them from potentially added exercises array and un-renders them)
         */
        setNewWorkData(prevWorkData => {
            // Filter out the exercises that need to be removed
            const tmp = prevWorkData.filter(
                (exc) => {
                    return !deleteExcs.current.includes(exc.id);
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
                if(!temp.some(data => data.id === excData.id)){ //if data is not already in workoutGenerat exc list
                    //console.log(excData)
                    temp.push(excData) //add to list
                    //console.log('temp is now '+ temp)
                }
            });

            return temp; //return temp to set NWD to temp list
        })
    }

    return(
        <div>
            <label htmlFor = 'workName'>Workout Name: </label>
                <input id = 'workName' name = 'workName'></input>
                <br />
            <label htmlFor = 'workDesc'>Workout Description: </label>
                <input id = 'workDesc' name = 'workDesc'></input>

            <br />
            <button onClick = {() => setShow(true)}>Add</button>
            <button onClick = {() => setRM(true)}>Delete Exercises</button>
            <button onClick = {() => removeExercises()}>Trash Icon Here</button>
            <button onClick = {() => navigation.navigate('Home', {workouts: [...workoutData, {workoutName: document.getElementById('workName').value, workoutDesc: document.getElementById('workDesc').value, exercises: newWorkData}]})}>Save Workout</button>

            <br />
            <SafeAreaView style = {{flex: 1, height: screen.height}}>
                <FlatList data = {newWorkData} renderItem={({item}) => <ExerciseInfo hideCheck = {!removeMode} addToSelected = {() => {console.log('setting deleteExcs to: '); addGroup(deleteExcs.current, item.id); console.log('deleteExcs now set to', deleteExcs.current);}} exerciseData = {item}/>}>
                </FlatList>
            </SafeAreaView>
            <br />

            <Modal propagateSwipe id = 'modal' style = {{width: '50%'}} show = {show} onHide = {() => setShow(false)}>
                <Modal.Body>
                    <WorkoutModalComp addToWorkData = {addToWorkData} addFunc = {addGroup} compMuscGroups = {muscleGroups}/>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default function WorkoutGenerat({navigation, route}){
    return(
        <WGC navigation = {navigation} route = {route}></WGC>
    )
}