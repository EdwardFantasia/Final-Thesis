import { React, Component} from 'react';
import './css/Workout.css'
import ExerciseInfo from './ExerciseInfo';

const WorkoutComp = props => {
    const route = props.route
    const navigation = props.navigation
    const workout = props.workout
    const exercises = workout.exercises

    return(
        <div id = 'workout'>
            <h3>{workout.workoutName}</h3>
            <h4>{workout.workoutDesc}</h4>
            {exercises.map(excData => {
                return(
                    <ExerciseInfo exerciseData = {excData} addToSelected = {null} hidden = {'hidden'}></ExerciseInfo>
                )
            })}
        </div>
    )
}

export default function Workout({navigation, route, workout}){
    return(
        <WorkoutComp workout = {workout} navigation = {navigation} route = {route}></WorkoutComp>
    )
}