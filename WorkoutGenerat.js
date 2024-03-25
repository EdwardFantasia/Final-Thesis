import { React, Component, useState, useEffect} from 'react';
import './css/WorkoutGen.css'
import { Modal, Button } from 'react-bootstrap'; //change these to react native versions
import { FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Alert } from 'react-native';
import WorkoutModalComp from './WorkoutModalComp';
import { render } from 'react-dom';
import ExerciseInfo from './ExerciseInfo';

//TODO: Need to create functionality to support editing preexisting workouts (can be done with checking if a newly introduced prop that holds already existing workout data is null)

const WGC2 = props => {
    const navigation = props.navigation
    const route = props.route
    const [newWorkData, setNewWorkData] = useState([])
    const [show, setShow] = useState(0)
    let workoutData = route.params.workoutData
    let muscleGroups = []

    const addGroup = (mutArray, arrayAdd) => {
        console.log('Obj to add: ' + arrayAdd)
        console.log('Array: ' + mutArray)
        console.log(mutArray.includes(arrayAdd))

        if(mutArray.includes(arrayAdd)){
            mutArray.splice(mutArray.indexOf(arrayAdd), 1)
        }
        else{
            mutArray.splice(mutArray.length, 0, arrayAdd)
        }

        console.log(mutArray)
    }

    const addToWorkData = (excArray) => { 
        console.log('NWD: ' , newWorkData)
        console.log(Array.isArray(newWorkData))
        let temp = [...newWorkData]
        console.log(excArray)

        excArray.forEach(excData => {
            if(!newWorkData.some(data => {data.name === excData.name})){
                console.log(excData)
                temp.push(excData)
                console.log('temp is now '+ temp)
            }
        });
        
        setNewWorkData(temp)
    }

    useEffect(() => {
        console.log(newWorkData)
    }, [newWorkData])

    return(
        <div>
            <label htmlFor = 'workName'>Workout Name: </label>
                <input id = 'workName' name = 'workName'></input>
                <br />
            <label htmlFor = 'workDesc'>Workout Description: </label>
                <input id = 'workDesc' name = 'workDesc'></input>

            <br />
            <button onClick={() => setShow(1)}>Add</button>
            <br />
            <SafeAreaView style = {{flex: 1, height: screen.height}}>
                <FlatList data = {newWorkData} renderItem={({item: exc}) => <ExerciseInfo addToSelected = {() => console.log('this will be used to add to delete list')} exerciseData = {exc}/>}>
                </FlatList>
            </SafeAreaView>
            <br />

            <Modal propagateSwipe id = 'modal' style = {{width: '50%'}} show = {show} onHide = {() => setShow(0)}>
                <Modal.Body>
                    <WorkoutModalComp addToWorkData = {addToWorkData} addFunc = {addGroup} compMuscGroups = {muscleGroups}/>
                </Modal.Body>
            </Modal>

            <button onClick = {() => navigation.navigate('Home', {workouts: [...workoutData, {name: document.getElementById('workName').value, desc: document.getElementById('workDesc').value, exercises: newWorkData}]})}>Save Workout</button>
        </div>
    )
}

export default function WorkoutGenerat({navigation, route}){
    return(
        <WGC2 navigation = {navigation} route = {route}></WGC2>
    )
}