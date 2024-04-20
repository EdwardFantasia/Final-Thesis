import { React, Component} from 'react';
//import './css/Workout.css'
import ExerciseInfo from './ExerciseInfo';
import {View, Text} from 'react-native'

export default function Workout({navigation, route, workout}){
    const exercises = workout.exercises

    return(
        <Pressable style = {{borderWidth: 1, borderRadius: 10}}>
            <Text>{workout.workoutName}</Text>
            <Text>{workout.workoutDesc}</Text>
        </Pressable>
    )
}