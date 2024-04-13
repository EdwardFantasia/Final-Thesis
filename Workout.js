import { React, Component} from 'react';
//import './css/Workout.css'
import ExerciseInfo from './ExerciseInfo';
import {View, Text} from 'react-native'

export default function Workout({navigation, route, workout}){
    const exercises = workout.exercises

    return(
        <View id = 'workout'>
            <Text>{workout.workoutName}</Text>
            <Text>{workout.workoutDesc}</Text>
            {exercises.map(excData => {
                return(
                    <ExerciseInfo exerciseData = {excData} addToSelected = {null} hidden = {'hidden'}></ExerciseInfo>
                )
            })}
        </View>
    )
}